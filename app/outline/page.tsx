'use client';

import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"  
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from "lucide-react";

export default function Page({
    searchParams,
  }: {
    searchParams?: {
      initalTranscript?: string;
      outline?: string;
    };
  }) {
    const transcript = searchParams?.initalTranscript || '';
    const outline = searchParams?.outline || '';
    const router = useRouter();
    const params = new URLSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const handleGenerateBlog = async () => {
        // Generate blog title and outline
        setLoading(true);

        try {
          const response = await fetch('/api/generate-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript, outline }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to generate blog');
          }
    
          const data = await response.json();
          const blog = data.blog;
          params.set('blog', blog);

          // If API call is successful, navigate to outline page
          router.push(`/blog?${params.toString()}`);
    
        } catch (err: any) {
          setError(err.message);
          console.log(err.message)
        } finally {
            setLoading(false);
        }
      };

  return (
    <>
    <main className="flex flex-col items-center min-h-screen p-4 sm:pl-20">
        <Card className="flex flex-col w-full grow">
            <CardHeader>
                <CardTitle> Edit Outline</CardTitle>
                <CardDescription>Edit your blog outline</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col grow'>
                <Textarea className='grow' placeholder='Outline for blog goes here...' defaultValue={outline}/>                
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='outline' className='mt-4 mr-4 w-fit'>Show transcript</Button>
                        </SheetTrigger>
                        <SheetContent side='bottom' className='flex flex-col h-4/6'>
                            <SheetHeader>
                                <SheetTitle>Transcript</SheetTitle>
                                <SheetDescription>
                                    Raw transcript from YouTube
                                </SheetDescription>
                            </SheetHeader>
                            <Textarea  disabled className='grow' placeholder='Transcript goes here...' defaultValue={transcript}/>
                        </SheetContent>
                    </Sheet>
                </div>
            </CardContent>
        </Card>
    </main>
    </>
  );
}
