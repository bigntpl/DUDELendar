import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="m-0 p-5 font-bold  bg-green-900 flex flex-row justify-between shadow-lg border-b-2 border-slate-300">
      <div className="flex flex-row gap-x-16">
        <h1 onClick={() => router.push(`/`)} className="hover:text-green-300 text-white text-3xl ml-6">
          📅 DUDELendar
        </h1>

        <div className="flex flex-row gap-x-10 ">
          <h2 className="pt-2 hover:text-green-300 text-white  " onClick={() => router.push(`/`)}>
            {' '}
            Home{' '}
          </h2>
          <h2 className="pt-2 hover:text-green-300 text-white  " onClick={() => router.push(`/calendar`)}>
            {' '}
            Calendar{' '}
          </h2>
        </div>
      </div>
      <div className="flex flex-row gap-6 mr-10">
        <h2 className="pt-2 hover:text-green-300 text-white" onClick={() => router.push(`/login`)}>
          {' '}
          Log in
        </h2>
      </div>
    </nav>
  )
}
