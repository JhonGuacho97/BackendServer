import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { categoryRoutes } from './category/routes';
import { productsRoutes } from './cars/routes';
import { brandsRoutes } from './brands/routes';
import { cartShopRoutes } from './cart/routes';
import { reviewRoutes } from './review/routes';
import { citesRoutes } from './cites/routes';




export class AppRoutes {

 
  static get routes(): Router {

    const router = Router();
    
     router.use('/api/auth', Authroutes.routes);
     router.use('/api/categories', categoryRoutes.routes);
     router.use('/api/cars', productsRoutes.routes);
     router.use('/api/brands', brandsRoutes.routes);
     router.use('/api/cartshop', cartShopRoutes.routes);
     router.use('/api/reviews', reviewRoutes.routes);
     router.use('/api/cites', citesRoutes.routes);

    return router;
  }


}