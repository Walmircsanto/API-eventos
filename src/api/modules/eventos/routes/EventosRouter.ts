import {Router} from 'express';
import EventoController from "../controller/EventoController";
import container from "../../../config/container";
import multer from "multer";
import {uploadImgEvento} from "../../../middleware/imageEvento";

const eventosRouter = Router(); // Route e uma função dentro da express logo não instancio ela como uma classe
const eventoController = container.resolve(EventoController); //obter a instancia do eventoController

eventosRouter.post("/", multer(uploadImgEvento.getConfig).single("file"), eventoController.createEvento.bind(eventoController));
eventosRouter.get('/:id', eventoController.findById.bind(eventoController))
eventosRouter.get('/', eventoController.findAll.bind(eventoController));
eventosRouter.delete('/:id', eventoController.deleteEvento.bind(eventoController))


export default eventosRouter;

