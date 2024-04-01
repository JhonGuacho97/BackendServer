import { Router } from 'express';
import { CartShopController } from './controller';
import { CartShopService } from '../services/cartshop.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class cartShopRoutes {

  static get routes(): Router {

    const router = Router();
    const cartService = new CartShopService;
    const controller = new CartShopController(cartService);
    
    //Agregar producto al carrito
    router.post('/', [AuthMiddleware.validateJWT] ,controller.createCartShop);
    
    //Traer items agregados al carrito
    router.get('/mycart', [AuthMiddleware.validateJWT] ,controller.getCartShop);

    //Eliminar producto del carrito
    router.delete('/:cartItem', [AuthMiddleware.validateJWT] ,controller.deleteItemCart);

    return router;
  }

} 