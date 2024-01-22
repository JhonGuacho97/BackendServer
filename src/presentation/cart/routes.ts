import { Router } from 'express';
import { CartShopController } from './controller';
import { CartShopService } from '../services/cartshop.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class cartShopRoutes {


  static get routes(): Router {

    const router = Router();
    const cartService = new CartShopService;
    const controller = new CartShopController(cartService);
    
    router.post('/', [AuthMiddleware.validateJWT] ,controller.createCartShop);
    router.get('/mycart', [AuthMiddleware.validateJWT] ,controller.getCartShop);

    return router;
  }


}