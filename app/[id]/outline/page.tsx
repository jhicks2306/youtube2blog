import { fetchVideoById } from '@/lib/data';
import OutlineCard from './card';
import { Suspense } from 'react';
import { SkeletonCard } from '@/components/skeletons';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id)
  const video = await fetchVideoById(id)
  console.log(`value of video outline from page: ${video.outline}`)

  return (
    <>
    <main className="flex flex-col items-center min-h-screen p-4 sm:pl-20">
        <Suspense fallback={<SkeletonCard/>}>
            <OutlineCard video={video}/>
        </Suspense>
    </main>
    </>
  );
}
