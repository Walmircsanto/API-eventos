import {DataSource} from "typeorm";
import dotenv from "dotenv";
import reflect from "reflect-metadata";
import Evento from "../../modules/eventos/typeorm/entities/Evento";
import Usuario from "../../modules/usuario/typeorm/entities/Usuario";
import Certificado from "../../modules/certificado/typeorm/entities/Certificado";
dotenv.config(); //carregar as informações do arquivo .env file
export const AppDataSource = new DataSource({
    type:"postgres",
    host: process.env.HOST,
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    entities: [Evento,Usuario, Certificado], // indicando pro meu banco de dados quais entidades eu tenho
    logging: true
});
