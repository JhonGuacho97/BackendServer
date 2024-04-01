import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.services';




export class Authroutes {


  static get routes(): Router {

    const router = Router();
    const authService = new AuthService();

    const controller = new AuthController(authService);
    
    //Registro de usuario
    router.post('/register', controller.register);

    //Login de usuario
    router.post('/login', controller.loginUser);
    
    //Validar Email
    router.get('/validate-email/:token', controller.validateEmail)

    return router;
  }


}

