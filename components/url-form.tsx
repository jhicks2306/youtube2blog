"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { decodeTranscript } from '@/lib/utils';
import { Loader2 } from "lucide-react";
import { createVideo, updateVideoTranscript } from "@/lib/actions";
import { fetchVideos } from "@/lib/data";

const formSchema = z.object({
    youtubeUrl: z.string().url().regex(
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      "Invalid YouTube URL"
    ),
  });

type FormSchema = z.infer<typeof formSchema>;

export function UrlForm() {
    const router = useRouter();
    const params = new URLSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    // 1. Define form.
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            youtubeUrl: "",
        },
      })

    // 2. Define a submit handler.
    const onSubmit = async (values: FormSchema) => {
      setLoading(true);

      try {
        // Fetch the video data.
        const videoResponse = await fetch('/api/get-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({url: values.youtubeUrl}),
        });

        if (!videoResponse.ok) {
          throw new Error('Failed to fetch video data.');
        }

        const videoData = await videoResponse.json();

        // Fetch the transcript.
        const response = await fetch('/api/get-transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({url: values.youtubeUrl}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transcript');
        }
        
        const data = await response.json();
        const transcript = decodeTranscript(data.transcript);

        // Add to video and transcript to database
        createVideo(videoData.youtube_id, videoData.title, videoData.image_url, videoData.published_at, transcript)

        // params.set('initalTranscript', initalTranscript);

        // Generate blog title and outline
        // const openaiResponse = await fetch('/api/generate-outline', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ transcript: initalTranscript }),
        // });
    
        // if (!openaiResponse.ok) {
        //     throw new Error('Failed to generate blog title and outline');
        // }
                    
        // const openaiData = await openaiResponse.json();
        // const outline = openaiData.outline;
        // params.set('outline', outline);

        // // If API call is successful, navigate to outline page
        // router.push(`/outline?${params.toString()}`);
      
    } catch (err: any) {
      setError(err.message);
      console.log("Get transcript API failed.")
    } finally {
      setLoading(false);
      form.reset();
  };
}

  return (
    // 3. Build form
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }: { field: ControllerRenderProps<FormSchema, 'youtubeUrl'> }) => (
            <FormItem>
              <FormControl>
                <Input className='w-[50%]' placeholder="https://www.youtube.com/watch?v=..." {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div>
          { loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing
            </Button>
          ) : (  
            <Button type="submit">Import video</Button>
          )}
        </div>
      </form>
    </Form>
  )
}
