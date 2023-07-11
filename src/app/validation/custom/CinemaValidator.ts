import { Context } from "koa";
import httpConstants from "../../constant/httpConstants";
import CinemaValidationSchema from "../schema/CinemaValidationSchema";
import joiValidator from "../joi/validator";
export class CinemaValidator {
  constructor() {}
  async create(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      CinemaValidationSchema.addCinema
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }

  async ticketBooking(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      CinemaValidationSchema.ticketBooking
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };
  
    return response;
  }
}

const cinemaValidator: CinemaValidator = new CinemaValidator();

export default cinemaValidator;
