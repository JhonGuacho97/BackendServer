import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ReviewServices } from '../services/review.service';
import { ReviewController } from './controller';



export class reviewRoutes {


  static get routes(): Router {

    const router = Router();
    const reviewServices = new ReviewServices();
    const controller = new ReviewController(reviewServices);
    
    //Crear resenia para el vehiculo
     router.post('/:id', [AuthMiddleware.validateJWT], controller.createReviewVehicle)

    return router;
  }


}