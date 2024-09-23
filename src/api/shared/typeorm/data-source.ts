import {DataSource} from "typeorm";
import dotenv from "dotenv";
import reflect from "reflect-metadata";
dotenv.config(); //carregar as informações do arquivo .env file
export const AppDataSource = new DataSource({
    type:"postgres",
    host: process.env.HOST,
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true
});