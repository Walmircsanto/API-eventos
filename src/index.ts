import express, {NextFunction} from 'express';
import {Request, Response} from 'express';
import bodyParser from "body-parser";
import 'express-async-errors';
import {AppDataSource} from './api/shared/typeorm/data-source'
import routes from "./api/shared/http/routes";
import AppError from "@modules/errors/AppError";


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

//inicializar o banco de dados
AppDataSource.initialize().then(r => {
    console.log("data source initialized");
}).catch((err) => {
    console.log(err);
});

app.listen(3030, () => {
    console.log("Server is running on port 3000");
})