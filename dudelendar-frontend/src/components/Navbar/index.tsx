import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai';
import { BsFillCalendarFill } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="font-bold bg-dudegray h-screen w-60">
      <div className="flex flex-col">
        <div className="flex justify-center p-16">
          <Image src="/dudelendar.png"
          alt="logo"
          width={75}
          height={75}
          ></Image>
        </div>

        <h1 onClick={() => router.push(`/`)} className="cursor-pointer text-white text-3xl text-center">
          DUDELendar
        </h1>

        <div className="flex flex-col mt-20">
          
          <div className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer" onClick={() => router.push(`/`)}>
            {' '}
            <div className="flex flex-row items-center gap-5 ml-12">
              <AiFillHome style={{
                height: '20px',
                width: '20px',
              }}/>Home
            </div>
            {' '}
          </div>

          <div className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer" onClick={() => router.push(`/calendar`)}>
            {' '}
            <div className="flex flex-row items-center gap-5 ml-12">
              <BsFillCalendarFill  style={{
                height: '15px',
                width: '15px',
              }}/>Calendar
            </div>
            {' '}
          </div>
          <div className="p-3 hover:text-black hover:bg-white text-white text-center cursor-pointer" onClick={() => router.push(`/login`)}>
          {' '}
          <div className="flex flex-row items-center gap-5 ml-11">
              <BiLogIn style={{
                height: '20px',
                width: '20px',
              }}/>Login
            </div>
          {''}
        </div>
        </div>
      </div>
    </nav>
  )
}
