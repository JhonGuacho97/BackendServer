import { Router } from 'express';
import { categoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.services';



export class categoryRoutes {


  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new categoryController(categoryService);
    
     router.post('/', [AuthMiddleware.validateJWT], controller.createCategory)
     router.get('/', controller.getCategories);
     router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteCategory);
     router.put('/category/:id', [AuthMiddleware.validateJWT], controller.updateCategory);
     //  router.get('/:name', controller.getCategoryName);

    return router;
  }


}