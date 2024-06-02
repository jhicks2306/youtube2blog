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
import EditBlogTabs from './tabs';
import SettingsForm from './settings';

export default async function EditBlogCardContent({ video }: { video: VideoData }) {

  return (
    <>
        <CardContent className='flex flex-col grow'>
          <div className='grid grid-cols-6 grow'>
            <EditBlogTabs video={video}/>  
            <SettingsForm video={video}/>         
          </div>
          <div className='flex flex-row'>
              <div className='order-last'>
                <Link href='/blog'>
                  <Button className='mt-4 w-fit'>Generate blog</Button>
                </Link>
              </div>
              <TranscriptBottomSheet video={video}/>
          </div>
        </CardContent>
    </>
  );
};


