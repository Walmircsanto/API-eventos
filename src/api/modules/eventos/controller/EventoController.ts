import 'reflect-metadata';
import EventoService from '../services/EventoService'
import {Request, Response} from 'express';
import container from "../config/container";
import {injectable} from "tsyringe";
import EventoRequest from "../dto/EventoRequest";
import {CONSTRAINT} from "sqlite3";


@injectable()
export default class EventoController {


    private eventoService = container.resolve(EventoService);

    constructor() {
    }

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

        const eventoService = container.resolve(EventoService);

        const event = await eventoService.createEvento(
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


        return res.status(200).json(event);

    }


    public async findById(req: Request, res: Response): Promise<Response | undefined> {

        const id = parseInt(req.params.id)

        const eventoService = container.resolve(EventoService)
        const event = await eventoService.findById({id});

        return res.status(200).json(event);
    }


    public async findAll(req: Request, res: Response) {

        const eventoService = container.resolve(EventoService);

        const eventos = await eventoService.findAllEventos();

        return res.status(200).json(eventos);
    }
}
