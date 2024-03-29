import { Router } from 'express';
import { productsController } from './controller';
import { VehicleServices } from '../services/product.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class productsRoutes {

  static get routes(): Router {

    const router = Router();
    const vehicleServices = new VehicleServices();
    const controller = new productsController(vehicleServices);
    
    router.get('/', controller.getProducts);
    router.get('/search/:key', controller.searchsProducts);
    //router.get('/:year/:brand/:state', controller.filterProduct);
    router.get('/:id', controller.getProductsByCategory);
    router.post('/',[AuthMiddleware.validateJWT], controller.createProducts);
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteVehicle);
    router.put('/vehicle/:id', [AuthMiddleware.validateJWT], controller.updateVehicle);
    router.get('/filters', controller.filtersQueryProducts);

    return router;
  }


}