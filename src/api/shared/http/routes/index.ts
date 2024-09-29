import {Router} from 'express';
import eventosRouter from "../../../modules/eventos/routes/EventosRouter";

const routes = Router();

routes.use('/eventos',eventosRouter)

export default routes;