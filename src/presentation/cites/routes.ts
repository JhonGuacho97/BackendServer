import { Router } from 'express';
import { CitesServices } from '../services/cites.service';
import { CitesController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class citesRoutes {


  static get routes(): Router {
 
    const router = Router();
    const citesServices = new CitesServices();
    const controller = new CitesController(citesServices);
    
     //Crear reservacion
     router.post('/:id', [AuthMiddleware.validateJWT], controller.createCites)

     //Aceptar Citas
     router.put('/:id', [AuthMiddleware.validateJWT], controller.confirmedCites)

    return router;
  }


}