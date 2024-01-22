import { Router } from 'express';
import { BrandController } from './controller';
import { BrandsServices } from '../services/brands.services';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class brandsRoutes {

  static get routes(): Router {

    const router = Router();
    const brandServices = new BrandsServices();
    const controller = new BrandController(brandServices);
    
    router.get('/', controller.getBrands);
    router.post('/',[AuthMiddleware.validateJWT], controller.createBrands);
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteBrands);
    router.put('/brand/:id', [AuthMiddleware.validateJWT], controller.updateBrands);

    return router;
  }


}