import Navbar from '../../components/Navbar'
import { Input, Button } from '@chakra-ui/react'
import Image from 'next/image'
const login = () => {
  return (
    <>
      <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-3xl text-gray-900 font-bold">
          <Image className="w-8 h-8 mr-2" src="/dudelendar.png" alt="logo" width={60}
          height={60}/>
          &nbsp;
          DUDELendar  
      </a>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="flex justify-center text-xl font-bold text-gray-900 md:text-2xl">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"placeholder="" required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="text-gray-500">Remember me</label>
                          </div>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-dudepink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default login
