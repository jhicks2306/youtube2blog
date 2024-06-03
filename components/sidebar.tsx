import Link from 'next/link';
import {
    Home,
    Settings,
  } from "lucide-react"

  export default function Sidebar() {
    return (
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/dashboard" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
              <Home className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Home</span>
          </Link>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="#" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
              <Settings className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Settings</span>
          </Link>
        </nav>
      </aside>
    );
  }
  
