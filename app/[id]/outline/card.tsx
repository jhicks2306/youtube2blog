'use client';

import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from "lucide-react";
import { VideoData } from '@/lib/definitions';
import TranscriptBottomSheet from './bottomsheet';

export default function OutlineCard({ video }: { video: VideoData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBlog = async () => {
    // Generate blog title and outline
    setLoading(true);

    // try {
    //   const response = await fetch('/api/generate-blog', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ transcript, outline }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to generate blog');
    //   }

    //   const data = await response.json();
    //   const blog = data.blog;
    //   params.set('blog', blog);

    //   // If API call is successful, navigate to outline page
    //   router.push(`/blog?${params.toString()}`);

    // } catch (err: any) {
    //   setError(err.message);
    //   console.log(err.message)
    // } finally {
    //     setLoading(false);
    // }
  };

  return (
    <>
        <Card className="flex flex-col w-full grow">
            <CardHeader>
                <CardTitle> Edit Outline</CardTitle>
                <CardDescription>Edit your blog outline</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col grow'>
                <Textarea className='grow' placeholder='Outline for blog goes here...' defaultValue=""/>                
                <div className='flex flex-row'>
                    <div className='order-last'>
                        { loading ? (
                            <Button disabled className='mt-4 w-fit'>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generate blog
                            </Button>
                        ) : (  
                            <Button type="submit" onClick={handleGenerateBlog} className='mt-4 w-fit'>Generate blog</Button>
                        )}
                    </div>
                    <TranscriptBottomSheet video={video}/>
                </div>
            </CardContent>
        </Card>
    </>
  );
}
