import { userService } from './user.service'

const checkResponse = (error) => {
  //   console.log(error.toString(), "error");
  if (error && error.toString().includes('401')) {
    userService.logout()
  }
}

export { checkResponse }
