import { Request, Response } from "express";
import { RegisterUserDto, customErrors, LoginUserDto } from "../../domain";
import { AuthService } from "../services/auth.services";

export class AuthController{

    constructor(
        public readonly authService: AuthService
    ){}

    private handleError = (error: unknown, res:Response) => {
        if(error instanceof customErrors) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        
        return res.status(500).json({error: 'Internal Server Error'});
    }

    register = (req:Request, res:Response) => {

        const [error, registerDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error})
 
        this.authService.registerUser(registerDto!)
        .then((user) => res.json(user))
        .catch(error => this.handleError(error, res));
    }

    loginUser = (req:Request, res:Response) => {
        
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authService.loginUser(loginUserDto!)
        .then((user) => res.json(user))
        .catch(error => this.handleError(error, res));

    }

    validateEmail = (req:Request, res:Response) => {
        res.json('validateEmail')
    }

}