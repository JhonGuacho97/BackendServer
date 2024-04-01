import { Router } from 'express';
import { BrandController } from './controller';
import { BrandsServices } from '../services/brands.services';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class brandsRoutes {

  static get routes(): Router {

    const router = Router();
    const brandServices = new BrandsServices();
    const controller = new BrandController(brandServices);
    
    //Crear marcas
    router.post('/',[AuthMiddleware.validateJWT], controller.createBrands);

    //Traer todas las marcas
    router.get('/', controller.getBrands);

    //Actualizar marca por id
    router.put('/brand/:id', [AuthMiddleware.validateJWT], controller.updateBrands);

    //Eliminar marca por id
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteBrands);

    return router;
  }


}