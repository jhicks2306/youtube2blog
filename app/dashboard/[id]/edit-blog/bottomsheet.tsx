'use client';

import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet" 
import { Button } from "@/components/ui/button";
import { VideoData } from "@/lib/definitions";

export default function TranscriptBottomSheet({ video }: { video: VideoData }) {
  
  return (
    <>
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
            <Textarea className='grow' placeholder='Video transcript not found.' defaultValue={video.transcript}/> 
        </SheetContent>
    </Sheet>
    </>
  );
}