import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { VideoData } from '@/lib/definitions';
import TranscriptBottomSheet from './bottomsheet';
import Link from 'next/link';
import { generateOutline, updateVideoOutline } from '@/lib/actions';
import { revalidatePath } from 'next/cache';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

export default async function EditBlogTabs({ video }: { video: VideoData }) {

  if (!video) {
    return null;
  }

  if (!video.outline) {
    const outline = await generateOutline(video.transcript)

    if (typeof outline === 'string') {
       await updateVideoOutline(video.id, outline);
       video.outline = outline;
       revalidatePath('/[id]/outline', 'page')
    } else {
      console.error('Generated outline is not a string:', outline);
    }
  }

  return (
    <>
          <Tabs defaultValue="outline" className="flex flex-col col-span-5">
            <TabsList className='grid grid-cols-2'>
              <TabsTrigger value="outline">Outline</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>
            <TabsContent value="outline" className='data-[state="active"]:flex data-[state="active"]:grow'>
              <Textarea className='' placeholder='Outline for blog goes here...' defaultValue={video.outline}/>                
            </TabsContent>
            <TabsContent value="blog" className='data-[state="active"]:flex data-[state="active"]:grow'>
              <Textarea className='' placeholder='Blog goes here...'/>
            </TabsContent>
          </Tabs>         
    </>
  );
};


