'use client';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"

export default function SettingsForm() {
  
  return (
   <>
     <div className="relative hidden flex-col items-start gap-8 ml-4 mt-10 md:flex">
        <fieldset className="grow rounded-lg border p-4 items-start">
           <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
           <div className="grid gap-2">
             <Label htmlFor="word-count">Word count (approx.)</Label>
             <Input
               id="word-count"
               name="word-count" 
               type="number"
               min="400"
               max="1200"
               step="100" 
               defaultValue="600" />
           </div>
           <div className="grid gap-2 mt-4">
             <Label htmlFor="keywords">Keywords</Label>
             <Input id="keywords" name="keywords" type="text" placeholder="comma, separated, list" />
           </div>
           <div className="grid gap-2 mt-4">
             <Label htmlFor="tone">Tone of voice</Label>
             <Textarea
               id="tone"
               name="tone"
               placeholder="You are a..."
               className="min-h-[7.5rem]"
             />
           </div>
         </fieldset>
     </div>
   </>
   )
  }

             


