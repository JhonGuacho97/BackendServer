import { Validators } from "../../../config";


export class CreateCartShopDto{

    private constructor(
        public readonly user: string,
        public readonly product: string
    ){}

    static create(object : { [ key: string ]: any }): [string?, CreateCartShopDto?]{

        const {user, product} = object;

        if(!Validators.isMongoId(user)) return ['User ID no es valido'];
        if(!Validators.isMongoId(product)) return ['ProductId no es valido']



        return [undefined, new CreateCartShopDto(user, product)];
        
    }

}