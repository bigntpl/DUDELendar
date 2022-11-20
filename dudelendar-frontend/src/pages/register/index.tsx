import { useRouter } from 'next/router'
import Image from 'next/image'

export default function register() {
    const router = useRouter()
    return (
        <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-3xl font-bold text-gray-900">
          <Image className="w-8 h-8 mr-2" src="/dudelendar.png" alt="logo" width={60} height={60}/>
          &nbsp; DUDELendar   
      </a>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                      <input type="password" name="confirm-password" id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
                  </div>
                  <button onClick={() => router.push(`/login`)} type="submit" className="w-full text-white bg-dudepink font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create account</button>
                  <p className="text-sm font-light text-gray-500">
                      Already have an account? <a onClick={() => router.push(`/login`)} className="font-medium text-dudepink hover:underline">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}