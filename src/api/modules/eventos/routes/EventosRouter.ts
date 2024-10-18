import {Router} from 'express';
import EventoController from "../controller/EventoController";

const eventosRouter = Router(); // Route e uma função dentro da express logo não instancio ela como uma classe
const eventoController = new EventoController();

eventosRouter.post("/", eventoController.createEvento);
eventosRouter.get('/:id', eventoController.findById)
eventosRouter.get('/', eventoController.findAll)

export default eventosRouter;
