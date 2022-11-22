import { useState } from 'react'
import { signIn, getCsrfToken } from 'next-auth/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React from 'react'

export default function SignIn({ csrfToken }: any) {
  const router = useRouter()
  const [error, setError] = useState(null)

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-3xl text-gray-900 font-bold">
          <Image className="w-8 h-8 mr-2" src="/dudelendar.png" alt="logo" width={60} height={60} />
          &nbsp; DUDELendar
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-center text-xl font-bold text-gray-900 md:text-2xl">Sign in to your account</h1>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={Yup.object({
                username: Yup.string().max(30, 'Must be 30 characters or less').required('Please enter your username'),
                password: Yup.string().required('Please enter your password'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await signIn('credentials', {
                  redirect: false,
                  username: values.username,
                  password: values.password,
                  callbackUrl: `${window.location.origin}`,
                })
                if (res !== undefined) {
                  if (res.url) router.push(res.url)
                }
                setSubmitting(false)
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                      Username
                      <Field
                        name="username"
                        aria-label="enter your username"
                        aria-required="true"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="username" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                      <Field
                        name="password"
                        aria-label="enter your password"
                        aria-required="true"
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500">Remember me</label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-dudepink font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don't have an account?{' '}
                    <a onClick={() => router.push(`/register`)} className="font-medium text-dudepink hover:underline">
                      Register here
                    </a>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
