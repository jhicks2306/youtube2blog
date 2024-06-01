import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { VideoData } from '@/lib/definitions';
import TranscriptBottomSheet from './bottomsheet';
import Link from 'next/link';
import { generateOutline, updateVideoOutline } from '@/lib/actions';
import { revalidatePath } from 'next/cache';

export default async function OutlineCard({ video }: { video: VideoData }) {

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
      <Card className="flex flex-col w-full grow">
        <CardHeader>
          <CardTitle> Edit Outline</CardTitle>
          <CardDescription>Edit your blog outline</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col grow'>
            <Textarea className='grow' placeholder='Outline for blog goes here...' defaultValue={video.outline}/>                
            <div className='flex flex-row'>
                <div className='order-last'>
                  <Link href='/blog'>
                    <Button className='mt-4 w-fit'>Generate blog</Button>
                  </Link>
                </div>
                <TranscriptBottomSheet video={video}/>
            </div>
        </CardContent>
      </Card>
    </>
  );
};


