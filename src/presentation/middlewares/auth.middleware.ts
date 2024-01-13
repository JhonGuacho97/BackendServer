import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { userModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {


    static async validateJWT(req: Request, res: Response, next: NextFunction){

        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error: 'token no valido'});

        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'invalid Bearer token'})

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await jwtAdapter.validateToken<{id: string}>(token);
            if(!payload) return res.status(401).json({error: 'Token Invalido'});

            const user = await userModel.findById(payload.id);
            if(!user) return res.status(401).json({error: 'invalid token user'});

            req.body.user = UserEntity.fromObject(user);

            next();
            
        } catch (error) {
            
            console.log(error);
            res.status(500).json({error: 'Internal server error'})
            
        }

    }
}