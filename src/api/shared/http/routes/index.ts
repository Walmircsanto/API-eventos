import {Router} from 'express';
import eventosRouter from "../../../modules/eventos/routes/EventosRouter";
import userRoutes from "../../../modules/usuario/routes/UserRoutes";

const routes = Router();

routes.use('/eventos',eventosRouter)
routes.use('/user',userRoutes)

export default routes;