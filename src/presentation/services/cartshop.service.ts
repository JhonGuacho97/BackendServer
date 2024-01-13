import { VehiculoModel, cartShopModel } from "../../data";
import { CreateCartShopDto, customErrors } from "../../domain";


export class CartShopService {

    constructor(){}

    async AddCartShopProduct(createShopDto: CreateCartShopDto){

        try {
           
            const cartshop = new cartShopModel(createShopDto);

            await cartshop.save();

            return cartshop
            
        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

}