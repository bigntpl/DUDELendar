import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <div className="text-2xl container">
        {/* <div className="mx-auto">Hello this is homepage</div> */}
        <div className="flex justify-center items-center mx-auto">
          <a href={session ? '/calendar' : '/login'}>
            <div className="mx-auto mt-32 mb-4 items-center">
              <Image src="/dudelendar.png" alt="logo" width={400} height={400} />
            </div>
            <div className="mx-auto items-center mb-6 text-3xl text-gray-900 font-bold">DUDELendar</div>
          </a>
        </div>
      </div>
    </>
  )
}
