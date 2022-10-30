import Navbar from '../../components/Navbar'
import { Input, Button } from '@chakra-ui/react'

const login = () => {
  return (
    <>
      <div className="container mx-auto my-60 w-48">
        <div className="my-auto mx-auto">
          <div className="mx-auto bg-green-50 w-60 p-3 border-collapse rounded-lg">
            <form>
              <Input color="black" type="text" placeholder="Username" />
              <Input color="black" type="text" placeholder="Password" />
              <Button type="submit" className="w-full" colorScheme="green">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default login
