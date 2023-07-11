import { Context } from "koa";
import library from "../db/entity/library";
import { Op } from "sequelize";
require("dotenv").config();

class CinemaService {
  constructor() { }

  async create(ctx: Context) {
    let { cinemaName, cinemaSeats } = ctx.request.body
    const cinemaId = await library.cinemas.create({
      cinemaSeats: cinemaSeats,
      cinemaName: cinemaName,
    });
    if (cinemaSeats) {
      for (let i = 0; i <= cinemaSeats; i++) {
        await library.cinemaTickets.create({
          cinemaId: cinemaId.dataValues.id,
          seats: "A" + i,
        });
      }
    }

  }

  async getAllCinema(ctx: Context) {
    let cinemaData = await library.cinemaTickets.findAll();
    return cinemaData;
  }

  async ticketBooking(ctx: Context) {
    let { userId, cinemaTicketId, cinemaId } = ctx.request.body
    const checkTicket = await library.cinemaTickets.findAll({
      where: { id: { [Op.in]: cinemaTicketId }, cinemaId: cinemaId, status: 'active' },
    });
    console.log(checkTicket.length);
    
    if (checkTicket.length > 0) {
      ctx.status = 400;
      ctx.body = "This seat number already purchased";

    } else {
      for (let i of cinemaTicketId) {
        await library.userTicketBookings.create({
          userId: userId,
          cinemaId: cinemaId,
          cinemaTicketId: i

        })
        let updateInfo = {
          status: 'active'
        };
        await library.cinemaTickets.update(updateInfo, {
          where: {
            id: {
              [Op.in]: cinemaTicketId
            }, cinemaId: cinemaId
          },
        });

      }
      ctx.status = 200;
      ctx.body = "This seat number booked";
    }
  }

}
let cinemaService: CinemaService = new CinemaService();
export default cinemaService;
