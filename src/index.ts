import express from 'express';
import bodyParser from "body-parser";
import { AppDataSource } from './api/shared/typeorm/data-source'
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

AppDataSource.initialize().then(r => {
    console.log("data source initialized");
}).catch((err) =>{
    console.log(err);
});

app.listen(3030,()=>{
    console.log("Server is running on port 3000");
})