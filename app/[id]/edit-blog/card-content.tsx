'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'
import { CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { VideoData } from '@/lib/definitions';
import TranscriptBottomSheet from './bottomsheet';
import EditBlogTabs from './tabs';
import SettingsFieldset from './settings';
import { updateVideoOutline, updateVideoBlog } from '@/lib/actions';
import { useRef } from 'react';
import { generateBlog } from '@/lib/actions';


export default function EditBlogCardContent({ video }: { video: VideoData }) {
  const clickButtonRef = useRef<() => void>();
  const [activeTab, setActiveTab] = useState('outline');
  const [saving, setSaving] = useState(false);
   const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const updateVideoOutlineWithId = updateVideoOutline.bind(null, video.id);
  const updateVideoBlogWithId = updateVideoBlog.bind(null, video.id);
  const generateBlogWithBindings = generateBlog.bind(null, video.id, video.outline, video.transcript)
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleGenerateBlog = () => {
    setActiveTab('blog');
  };

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
          <form ref={formRef} action={generateBlogWithBindings} className="flex flex-col grow">
          <div className='grid grid-cols-5 grow'>
            <EditBlogTabs
              video={video} 
              saving={saving} 
              handleOutline={handleOutline} 
              handleBlog={handleBlog}
              activeTab={activeTab}
              />  
            <SettingsFieldset/>       
          </div>
          <div className='flex flex-row'>
              <TranscriptBottomSheet video={video}/>
              <div className=''>
                <Button type='submit' onClick={handleGenerateBlog} disabled={saving} className='mt-4 w-fit'>Generate blog</Button>
              </div>
              <div className='h-full ml-4 mt-6'>
                {saving ? 
                <p className='text-sm text-muted-foreground'>Saving...</p> : 
                <p className='text-sm text-muted-foreground'>{lastSaved ? 'Last saved at ' + formatTime(lastSaved) : 'Not saved this session.'}</p>}
              </div>
          </div>
        </form>
        </CardContent>
    </>
  );
};


