import Link from 'next/link'
import React from 'react'

function ComponentFooter() {
  return (
    <div>
      <div className="pt-5 pb-5  text-center border-t border-zinc-900 shadow-lg mt-5">
  <div className="text-sm text-zinc-400 mx-10">
    Built by
    <Link href={'https://twitter.com/ayushmxxn'} target='_blank'>
      <span className="ml-1 underline underline-offset-4 text-zinc-300 hover:text-white transition duration-300">
        Ayushmaan Singh
      </span>
    </Link>
    . The source code is available on
    <Link href={'/'} target='_blank'>
      <span className="ml-1 underline underline-offset-4 text-zinc-300 hover:text-white transition duration-300">
        Github
      </span>
    </Link>
  </div>
</div>
    </div>
  )
}

export default ComponentFooter;
