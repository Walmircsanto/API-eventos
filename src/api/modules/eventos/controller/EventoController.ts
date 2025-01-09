import "reflect-metadata";
import {EventoService} from "../services/EventoService";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import EventoRequest from "../dto/EventoRequest";

@injectable()
export default class EventoController {
    constructor(
        @inject(EventoService) private readonly eventoService: EventoService
    ) {
    }

    // @ts-ignore
    public async createEvento(req: Request, res: Response): Promise<Response | undefined> {
        const {
            titulo,
            img,
            status,
            descricao,
            dataInicio,
            dataFim,
            numVagas,
            usuariosIds,
            certificadoId,
        } = req.body;

        // se num vagas tiver algo então converte em um inteiro, caso contrario ele undefined
        const parsedNumVagas = numVagas ? parseInt(numVagas, 10) : null;

        if (numVagas && isNaN(<number>parsedNumVagas)) {
            return res.status(400).json({ error: 'numVagas deve ser um número válido' });
        }
        const fileName = req.file?.filename;
        const event = await this.eventoService
            .createEvent(<EventoRequest>{
                titulo,
                img: fileName || img,
                status,
                descricao,
                dataInicio,
                dataFim,
                numVagas: parsedNumVagas,
                usuariosIds,
                certificadoId,
            })

        return res.status(201).json(event);
    }

    public async findById(
        req: Request,
        res: Response
    ): Promise<Response | undefined> {
        const id = parseInt(req.params.id);

        const event = await this.eventoService.findById(id);

        return res.status(200).json(event);
    }

    public async findAll(req: Request, res: Response) {
        const eventos = await this.eventoService.findAllEventos();

        return res.status(200).json(eventos);
    }

    public async deleteEvento(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.eventoService.deleteEvento(id);

        return res.status(204).json("");
    }

    public async updateEvento(req: Request, res: Response) {
        const {
            id,
            titulo,
            img,
            status,
            descricao,
            dataInicio,
            dataFim,
            numVagas,
            usuariosIds,
            certificadoId
        } = req.body

        const event = await this.eventoService.updateEvento({
            id,
            titulo,
            img,
            status,
            descricao,
            dataInicio,
            dataFim,
            numVagas,
            usuariosIds,
            certificadoId
        });

        return res.status(200).json(event);

    }

}
