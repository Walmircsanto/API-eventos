import {Router} from 'express';
import EventoController from "../controller/EventoController";
import container from "../config/container";
import eventoService from "../services/EventoService";
// import EventoService from "../services/EventoService";

const eventosRouter = Router(); // Route e uma função dentro da express logo não instancio ela como uma classe
const eventoController = container.resolve(EventoController);

 eventosRouter.post("/", eventoController.createEvento.bind(eventoController));
 eventosRouter.get('/:id', eventoController.findById.bind(eventoController))
eventosRouter.get('/', eventoController.findAll.bind(eventoController));


export default eventosRouter;
