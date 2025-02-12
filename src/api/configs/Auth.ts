import dotenv from "dotenv";
import * as process from "node:process";
dotenv.config();
export const auth = {
    secret:  String(process.env.SECRECT),
    expiresIn: String(process.env.EXPIRE_IN),
}