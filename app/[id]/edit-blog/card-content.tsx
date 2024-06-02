'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'
import { CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { VideoData } from '@/lib/definitions';
import TranscriptBottomSheet from './bottomsheet';
import EditBlogTabs from './tabs';
import SettingsForm from './settings';
import { updateVideoOutline, updateVideoBlog } from '@/lib/actions';


export default function EditBlogCardContent({ video }: { video: VideoData }) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const updateVideoOutlineWithId = updateVideoOutline.bind(null, video.id);
  const updateVideoBlogWithId = updateVideoBlog.bind(null, video.id);

  const handleOutline = useDebouncedCallback(async (newOutline: string) => {
    setSaving(true);
    await updateVideoOutlineWithId(newOutline);
    console.log('New outline saved.');
    setLastSaved(new Date());
    setSaving(false);
  }, 2000);

  const handleBlog = useDebouncedCallback(async (newBlog: string) => {
    setSaving(true);
    await updateVideoBlogWithId(newBlog);
    console.log('New blog saved.');
    setLastSaved(new Date());
    setSaving(false);
  }, 2000);

  const formatTime = (date: Date) => {
    // Get time to display last saved.
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
        <CardContent className='flex flex-col grow'>
          <div className='grid grid-cols-5 grow'>
            <EditBlogTabs 
              video={video} 
              saving={saving} 
              handleOutline={handleOutline} 
              handleBlog={handleBlog}
              />  
            <SettingsForm video={video} />         
          </div>
          <div className='flex flex-row'>
              <TranscriptBottomSheet video={video}/>
              <div className=''>
                <Link href='/blog'>
                  <Button disabled={saving} className='mt-4 w-fit'>Generate blog</Button>
                </Link>
              </div>
              <div className='h-full ml-4 mt-6'>
                {saving ? 
                <p className='text-sm text-muted-foreground'>Saving...</p> : 
                <p className='text-sm text-muted-foreground'>{lastSaved ? 'Last saved at ' + formatTime(lastSaved) : 'Not saved this session.'}</p>}
              </div>
          </div>
        </CardContent>
    </>
  );
};

