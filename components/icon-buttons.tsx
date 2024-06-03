import { deleteVideo } from "@/lib/actions";
import { Pencil, Trash2 } from 'lucide-react';
import Link from "next/link";

export function DeleteVideoIconButton({ id }: { id: string }) {
  const deleteVideoWithId = deleteVideo.bind(null, id);
  return (
    <form action={deleteVideoWithId}>
    <button
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base"
    >
      <Trash2 className="h-4 w-4 transition-all group-hover:scale-110"/>
      <span className="sr-only">Delete video</span>
    </button>
    </form>
  );
}

export function EditVideoIconButton({ id }: { id: string }) {
  return (
    <Link href={`dashboard/${id}/edit-blog`} className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-muted-foreground md:h-8 md:w-8 md:text-base">
      <Pencil className="h-4 w-4 transition-all group-hover:scale-110"/>
      <span className="sr-only">Delete video</span>
    </Link>
  );
}
