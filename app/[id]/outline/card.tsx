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
import EditBlogCardContent from './card-content';

export default async function EditBlogCard({ video }: { video: VideoData }) {

  if (!video) {
    return null;
  }

  if (!video.outline) {
    const outline = await generateOutline(video.transcript)

    if (typeof outline === 'string') {
       await updateVideoOutline(video.id, outline);
       video.outline = outline;
    } else {
      console.error('Generated outline is not a string:', outline);
    }
  }


  return (
    <>
      <Card className="flex flex-col w-full grow min-h-full">
        <CardHeader>
          <CardTitle> Edit Blog</CardTitle>
          <CardDescription>Edit your blog outline, select settings, and generate blog</CardDescription>
        </CardHeader>
        <EditBlogCardContent video={video}/>
      </Card>
    </>
  );
};


