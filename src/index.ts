import express from 'express';
import bodyParser from "body-parser";
import { AppDataSource } from './api/shared/typeorm/data-source'
import routes from "./api/shared/http/routes";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', routes); // estou indicando que meu servidor vai usar essas rotas

//inicializar o banco de dados
AppDataSource.initialize().then(r => {
    console.log("data source initialized");
}).catch((err) =>{
    console.log(err);
});

app.listen(3030,()=>{
    console.log("Server is running on port 3000");
})