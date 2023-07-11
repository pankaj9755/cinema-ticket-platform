import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'
import {ensureAuthenticated} from '../auth/authUtils'

const userRouterManager: RouterManager = new RouterManager('/user')
userRouterManager.post('/signup', userController.signup)
userRouterManager.post('/login', userController.login)
userRouterManager.get('/userInfo',ensureAuthenticated, userController.getUser);
export default userRouterManager

