import { fetchVideoById } from '@/lib/data';
import OutlineCard from './card';


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const video = await fetchVideoById(id)

  return (
    <>
    <main className="flex flex-col items-center min-h-screen p-4 sm:pl-20">
        <OutlineCard video={video}/>
    </main>
    </>
  );
}
