import { ArrowUpIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col w-full flex-wrap justify-center bg-zinc-950 items-center">
      <div className="flex w-full justify-between flex-col items-center py-64 max-w-screen-xl px-4">
        <div className='flex flex-col items-center bg-zinc-800 border space-y-6 border-zinc-600 p-12'>
          <h2 className='text-4xl font-bold'>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/work" className="flex items-center justify-center gap-4 group">
            <span className="border border-zinc-800 dark:border-zinc-500 dark:hover:border-zinc-200 p-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
              <ArrowUpIcon className="rotate-45 group-hover:rotate-90 transition-transform duration-300" />
            </span>
            <span className="text-center font-bold text-base">
              Return to Home
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}