import 'reflect-metadata';
import EventoService from '../services/EventoService'
import { Request, Response } from 'express';
import container from "../config/container";
import {injectable} from "tsyringe";
import EventoRequest from "../dto/EventoRequest";



@injectable()
export default  class EventoController {


    private eventoService = container.resolve(EventoService);
    public async createEvento(req: Request, res: Response): Promise<Response | undefined> {
        const {
            titulo,
            img,
            status,
            descricao,
            dataInicio,
            dataFim,
            usuariosIds,
            certificadoId
        } = req.body;

        const event = await this.eventoService.createEvento(
            {
                titulo,
                img,
                status,
                descricao,
                dataInicio,
                dataFim,
                usuariosIds,
                certificadoId
            } );


        return res.status(200).json(event);

    }


    public async findById(req: Request, res: Response): Promise<Response | undefined> {

        const  id  = parseInt(req.params.id)


        const event =  await this.eventoService.findById({id});

        return res.status(200).json(event);
    }


    public async findAll (req:Request, res:Response){

    }
}
