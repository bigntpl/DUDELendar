import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-3xl font-bold text-gray-900">
          <Image className="w-8 h-8 mr-2" src="/dudelendar.png" alt="logo" width={60} height={60} />
          &nbsp; DUDELendar
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/register" method="post">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                <input
                  type="text"
                  name="User_Username"
                  id="User_Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="User_Password"
                  id="User_Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input
                  type="text"
                  name="User_FirstName"
                  id="User_FirstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                <input
                  type="text"
                  name="User_LastName"
                  id="User_LastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                onClick={() => router.push(`/register`)}
                type="submit"
                className="w-full text-white bg-dudepink font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{' '}
                <a onClick={() => router.push(`/login`)} className="font-medium text-dudepink hover:underline">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
