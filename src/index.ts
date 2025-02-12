import express, {NextFunction} from 'express';
import {Request, Response} from 'express';
import bodyParser from "body-parser";
import 'express-async-errors';
import {AppDataSource} from './api/shared/typeorm/data-source'
import routes from "./api/shared/http/routes";
import AppError from "@modules/errors/AppError";
import * as redis from 'redis';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/api', routes); // estou indicando que meu servidor vai usar essas rotas

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.code).json({
            code: error.code,
            status: 'error',
            message: error.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: error.message,
    });
})


export const BlackListedRedisClient = redis.createClient({
    url:'redis://localhost:6379',
    password:'',
});

BlackListedRedisClient.on('connect',()=>{
    console.log(`Redis running on: localhost 6379`)
})

BlackListedRedisClient.on("error", (err:Error)=>{
    console.log(err);
})




//inicializar o banco de dados
AppDataSource.initialize().then(r => {
    console.log("data source initialized");
}).catch((err) => {
    console.log(err);
});

const init = async()=>{
    await BlackListedRedisClient.connect()
    app.listen(3030, () => {
        console.log(`server listening on port: ${3030}`)
    })
}

init()