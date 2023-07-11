import { Context } from "koa";
import library from "../db/entity/library";
import { User } from "../model/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();


class UserService {
  constructor() {}
  async signup(ctx: Context) {
    let userName: string = ctx.request.body.userName;
    let email: string = ctx.request.body.email;
    let password: string = ctx.request.body.password;
    let mobilNumber: number = ctx.request.body.mobilNumber;
    let checkUser = await library.Users.findOne({
      where: { email: email },
    });
    const hash = await bcryptjs.hash(password, 10);
    if (!checkUser) {
      await library.Users.create({
        userName: userName,
        email: email,
        password: hash,
        mobilNumber: mobilNumber,
      });
    } else {
      ctx.status = 400;
      ctx.body = "The specified e-mail address already exists";
    }
  }

  async login(ctx: Context) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = ctx.request.body;
        const checkUser = await library.Users.findOne({
          where: { email: email },
        });
        if (checkUser == null || checkUser == "") {
          resolve({
            status: false,
            statusCode: 409,
            message: "User email not found......",
          });
        } else {
          const { id, userName, email } = checkUser;
          const Match = await bcryptjs.compare(password, checkUser.password);

          if (Match == true) {
            const token = jwt.sign(
              {
                id: id,
                name: userName,
                email: email,
                role: "admin",
              },
              process.env.JWT_SECRET
            );
            const data = {
              id: id,
              name: userName,
              email: email,
            };

            resolve({
              status: true,
              statusCode: 200,
              data: data,
              token: token,
              message: "Success......",
            });
          } else {
            resolve({
              status: false,
              statusCode: 409,
              message: "Password not match......",
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  async getUser(ctx: Context): Promise<User> {
    let userId = parseInt(ctx.params.id);

    let userModel = await library.User.findByPk(userId);

    let user: User = new User();

    if (userModel) {
      user.setId(userModel.id);
      user.setUserName(userModel.userName);
      user.setEmail(userModel.email);
      user.setPassword(userModel.password);
      user.setStatus(userModel.status);
      user.setMobileNumber(userModel.mobilNumber);
    }

    return user;
  }

  async generateJWT(user) { 
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        name: user.userName,
        role: "admin",
        exp: Math.floor(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    );
  }

}
let userService: UserService = new UserService();
export default userService;
