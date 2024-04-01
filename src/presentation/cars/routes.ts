import { Router } from 'express';
import { productsController } from './controller';
import { VehicleServices } from '../services/product.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';



export class productsRoutes {

  static get routes(): Router {

    const router = Router();
    const vehicleServices = new VehicleServices();
    const controller = new productsController(vehicleServices);
    
    //Crear Producto(Vehiculo)
    router.post('/',[AuthMiddleware.validateJWT], controller.createProducts);

    //Actualizar vehiculo
    router.put('/vehicle/:id', [AuthMiddleware.validateJWT], controller.updateVehicle);

    //Eliminar vehiculo
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteVehicle);

    //Mostrar todos los vehiculos
    router.get('/', controller.getProducts);
    
    router.get('/:id', controller.getProductById);

    //Buscar Vehiculos
    router.get('/search/:key', controller.searchsProducts);

    //Mostrar vehiculos por marca
    router.get('/brand/:id', controller.getProductsByBrand);

    //Filtro de vehiculos por year, brand, stateVehicle, minPrice maxPrice
    router.get('/filters', controller.filtersQueryProducts);


    return router;
  }


}