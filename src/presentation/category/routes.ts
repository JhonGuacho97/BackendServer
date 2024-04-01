import { Router } from 'express';
import { categoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.services';



export class categoryRoutes {


  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new categoryController(categoryService);
    
     //Crear categoria    
     router.post('/', [AuthMiddleware.validateJWT], controller.createCategory)

     //Traer todas las categorias creadas
     router.get('/', controller.getCategories);

     //Actualizar Categoria
     router.put('/category/:id', [AuthMiddleware.validateJWT], controller.updateCategory);

     //Eliminar categoria por id
     router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteCategory);

    return router;
  }


}