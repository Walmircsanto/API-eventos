import dotenv from "dotenv";

dotenv.config(); //carregar as informações do arquivo .env file
const host =  process.env.HOST;
console.log(host)