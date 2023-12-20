import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import localFont from 'next/font/local'

const headingFont = localFont({
  src: '../public/fonts/font.woff2'
})


export function Logo() {
  return (
    <Link href={'/'}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src={'/logo-indigo.svg'}
          alt="Logo"
          height={28}
          width={28}
        />
        <p className={cn("text-lg text-zinc-800 text-center", headingFont.className)}>
          Tasking
        </p>
      </div>
    </Link>
  )
}
