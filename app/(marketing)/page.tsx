import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import localFont from 'next/font/local'

const headingFont = localFont({
  src: '../../public/fonts/font.woff2'
})

const textFont = Poppins({
  subsets: ['latin'],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ]
});

export default function MarketingPage() {
  return  (
    <div className="flex items-center justify-center flex-col">
      <div className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
          )}>
         {/* <div className="flex mb-4 items-center border shadow-sm p-3 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal  className="h-6 w-6 mr-2"/>
            No 1 Task management
         </div> */}
         <h1 className="text-3xl md:text-5xl 2xl:text-6xl text-center text-zinc-900 mb-4">
          <span className="underline underline-offset-4">Tasking</span> ajuda a manter a
         </h1>
         <div className="text-3xl md:text-5xl 2xl:text-6xl text-white px-4 p-2 rounded-md bg-gradient-to-r from-indigo-500 from-40%
    to-blue-400 to-70%"
         >
          produtividade.
         </div>
      </div>
      <div className={cn(
        "text-sm md:text-base 2xl:text-lg text-zinc-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
        textFont.className
        )}>
         Plataforma baseada em Kanban que simplifica o fluxo de tarefas. Crie workspaces colaborativos e convide sua equipe
        para uma gestão de projetos mais ágil e organizada.
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href={'/sign-up'}>
          Criar conta gratuitamente
        </Link>
      </Button>
    </div>
  )
}
