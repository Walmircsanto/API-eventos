import 'reflect-metadata';
import  EventoService from '../services/EventoService'
import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import EventoRequest from "../dto/EventoRequest";
import {CONSTRAINT} from "sqlite3";


@injectable()
export default class EventoController {
    constructor(@inject(EventoService) private readonly eventoService: EventoService) {}



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
            });
        console.log(req.file?.originalname)

        await this.eventoService.findAllEventos()
        return res.status(200).json(event);

    }


    public async findById(req: Request, res: Response): Promise<Response | undefined> {

        const id = parseInt(req.params.id)

        // const eventoService = container.resolve(EventoService)
        const event = await this.eventoService.findById({id});

        return res.status(200).json(event);
    }


    public async findAll(req: Request, res: Response) {

        // const eventoService = container.resolve(EventoService);
        console.log("CHAMOU EVENTOSERVICE")
        const eventos = await this.eventoService.findAllEventos();

        return res.status(200).json(eventos);
    }
    



}
