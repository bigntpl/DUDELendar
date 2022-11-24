import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import { BsFillCalendarFill } from 'react-icons/bs'
import { BiLogIn } from 'react-icons/bi'
import { BiLogOut } from 'react-icons/bi'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  // console.log('session from ui: ', session)
  // console.log('before session from ui')
  // session !== undefined ? console.log('session from ui: ', session) : console.log('undefined from ui')
  // console.log('after session from ui')
  // session ? (session.user ? (session.user.name ? session.user.name.username : '') : '') : ''
  return (
    <nav className="font-bold bg-dudegray h-screen w-60">
      <div className="flex flex-col">
        <div className="flex justify-center p-16">
          <Image src="/dudelendar.png" alt="logo" width={75} height={75}></Image>
        </div>

        <h1 onClick={() => router.push(`/`)} className="cursor-pointer text-white text-3xl text-center">
          DUDELendar
        </h1>

        <div className="flex flex-col mt-20">
          <div
            className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer"
            onClick={() => router.push(`/`)}
          >
            {' '}
            <div className="flex flex-row items-center gap-5 ml-12">
              <AiFillHome
                style={{
                  height: '20px',
                  width: '20px',
                }}
              />
              Home
            </div>{' '}
          </div>

          <div
            className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer"
            onClick={() => {
              session ? router.push(`/calendar`) : router.push(`/login`)
            }}
          >
            {' '}
            <div className="flex flex-row items-center gap-5 ml-12">
              <BsFillCalendarFill
                style={{
                  height: '15px',
                  width: '15px',
                }}
              />
              Calendar
            </div>{' '}
          </div>
          {session ? (
            <div
              className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer"
              onClick={() => signOut()}
            >
              {' '}
              <div className="flex flex-row items-center gap-5 ml-11">
                <BiLogOut
                  style={{
                    height: '20px',
                    width: '20px',
                  }}
                />
                {/* {session.user ? (session.user.name ? session.user.name.username : '') : ''} */}
                {session ? session.username : 'unknown'}
              </div>
              {''}
            </div>
          ) : (
            <div
              className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer"
              onClick={() => router.push(`/login`)}
            >
              {' '}
              <div className="flex flex-row items-center gap-5 ml-11">
                <BiLogIn
                  style={{
                    height: '20px',
                    width: '20px',
                  }}
                />
                Login
              </div>
              {''}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
