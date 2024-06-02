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

export default async function SettingsForm({ video }: { video: VideoData }) {

  return (
    <>
          <div className='col-span-1 col-start-6 p-4 space-y-4'>
            <label className='text-l font-semibold leading-none tracking-tight block mt-16'>Word count</label>
            <Slider className=''/>
            <label className='text-l font-semibold leading-none tracking-tight block mt-16'>Tone</label>          
            <Textarea/>
            <label className='text-l font-semibold leading-none tracking-tight block mt-[20]'>Keywords</label>
            <Input className=''/>
          </div>             
    </>
  );
};


