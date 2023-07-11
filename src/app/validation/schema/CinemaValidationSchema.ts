import Joi from 'joi';
class CinemaValidationSchema {
  constructor() { }

  static addCinema = Joi.object({
    cinemaName: Joi.string().required(),
    cinemaSeats: Joi.number().required(),
  })
  static ticketBooking = Joi.object({
    userId: Joi.number().required(),
    cinemaTicketId: Joi.array().items(Joi.number()).required(),
    cinemaId:Joi.number().required(),
  })
  
}
export default CinemaValidationSchema;