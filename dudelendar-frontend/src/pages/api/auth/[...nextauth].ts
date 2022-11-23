/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  // Configure one or more authentication providers
  // providers: [
  //   GithubProvider({
  //     clientId: process.env.GITHUB_ID,
  //     clientSecret: process.env.GITHUB_SECRET,
  //   }),
  //   // ...add more providers here
  // ],
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch('http://dudelendar.th1.proen.cloud/users-info/login', {
          // const res = await fetch("https://www.melivecode.com/api/login",{
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        const data = await res.json()
        console.log('data: ', data)
        if (data.message == 'Login Sucessfully') {
          // if (data.status == "ok") {
          // Any object returned will be saved in `user` property of the JWT
          console.log('Login success')
          console.log('user data: ', data)
          // console.log("data user: ", data.user)
          // return data.user
          return data
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn() {
      return true
    },
    async redirect({ baseUrl }: any) {
      return baseUrl
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token
      console.log('session', session)

      // console.log('token', token)
      session.user.name = token.name
      // session.test.address = 'test value'
      // console.log('session.user.name', session.user)

      console.log('token.name', token.name)
      return token.name
    },
    async jwt({ token, user }: any) {
      if (user) {
        // console.log('user', user)
        token.access_token = user.token
        token.name = user
        console.log('token', token)
      }
      return token
    },
  },
}

export default NextAuth(authOptions)
