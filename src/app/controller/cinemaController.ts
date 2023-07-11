import { Context } from "koa";
import logger from "../../logger";
import httpConstants from "../constant/httpConstants";
import cinemaService from "../service/cinemaService";
import cinemaValidator from "../validation/custom/CinemaValidator";
import apiErrorHandler from "../utils/ApiErrorHandler";
class CinemaController {
  constructor() {}

  async create(ctx: Context) {
    try {
      let validation = await cinemaValidator.create(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : create, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      await cinemaService.create(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : create, Error : ${JSON.stringify(error)}`);
    }
  }
  async list(ctx: Context) {
    try {
        let users = await cinemaService.getAllCinema(ctx)

        ctx.status = httpConstants.HTTP_SUCCESS_OK
        ctx.body = users
        logger.info(`Controller : getAllCinema, Response-Body : ${JSON.stringify(ctx.body)}`)
    } catch (error) {
        apiErrorHandler.errorHandler(error, ctx);

        logger.error(`Controller : getAllCinema, Error : ${JSON.stringify(error)}`)
    }
}

async ticketBooking(ctx: Context) {
  try {
    // console.log("ctxctxctxctxctxctxctx",ctx);
    // let validation = await cinemaValidator.ticketBooking(ctx);
    // if (!validation.isValid) {
    //   ctx.status = validation.status;
    //   ctx.body = validation.data;
    //   return;
    // }

    // logger.info(
    //   `Controller : cinemaTickets, Request-Body : ${JSON.stringify(
    //     ctx.request.body
    //   )}`
    // );

    await cinemaService.ticketBooking(ctx);

    ctx.status = httpConstants.HTTP_CREATED;
  } catch (error) {
    apiErrorHandler.errorHandler(error, ctx);

    logger.error(`Controller : cinemaTickets, Error : ${JSON.stringify(error)}`);
  }
}
}

const cinemaController: CinemaController = new CinemaController();
export default cinemaController;
