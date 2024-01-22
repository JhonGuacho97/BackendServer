import { Request, Response } from "express";
import { CreateCartShopDto, customErrors } from "../../domain";
import { CartShopService } from "../services/cartshop.service";


export class CartShopController {

    constructor(
        public readonly cartshopServide: CartShopService
    ){}

    private handleError = (error: unknown, res:Response) => {
        if(error instanceof customErrors) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createCartShop = async (req: Request, res: Response) => {

        const [error, cartDto] = CreateCartShopDto.create({
            ...req.body,
            user: req.body.user.id
        });
        if(error) return res.status(400).json({error});

        this.cartshopServide.AddCartShopProduct(cartDto!)
        .then((cart) => res.status(201).json(cart))
        .catch(error => this.handleError(error, res));

    }

    getCartShop = (req: Request, res: Response) => {

        const idUser: string = req.body.user.id

        this.cartshopServide.getCartShop(idUser)
        .then((cart) => res.json(cart))
        .catch(error => this.handleError(error, res))
        
    }

}