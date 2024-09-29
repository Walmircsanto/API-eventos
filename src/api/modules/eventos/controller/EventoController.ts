import EventoService from '../services/EventoService'
import { Request, Response } from 'express';
export default  class EventoController {

    // constructor(evento: EventoService) {
    //     this.eventoService = evento;
    // }

    public async createEvento(req: Request, res: Response): Promise<Response | undefined> {
        const {titulo, img, status, descricao, dataFim, dataInicio} = req.body;

        const eventoService  = new EventoService()
        const event = await eventoService.createEvento(
            {titulo, img, status, descricao, dataFim, dataInicio} );


        return res.status(200).json(event);

    }


    public async findById(req: Request, res: Response): Promise<Response | undefined> {

        const  id  = parseInt(req.params.id)

        const eventoService  = new EventoService()
        const event =  await eventoService.findById({id});

        return res.status(200).json(event);
    }


    public async findAll (req:Request, res:Response){

    }
}
