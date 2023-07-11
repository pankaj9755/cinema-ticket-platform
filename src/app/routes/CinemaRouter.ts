import { RouterManager } from '../core/RouterManager'
import cinemaController from '../controller/cinemaController'

const cinemaRouterManager: RouterManager = new RouterManager('/cinema')

cinemaRouterManager.post('/create', cinemaController.create)
cinemaRouterManager.get('/list',cinemaController.list )
cinemaRouterManager.post('/ticketBooking',cinemaController.ticketBooking )


export default cinemaRouterManager

