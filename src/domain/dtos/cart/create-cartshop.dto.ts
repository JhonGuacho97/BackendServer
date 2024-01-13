import { Validators } from "../../../config";


export class CreateCartShopDto{

    private constructor(
        public readonly user: string,
        public readonly products: []
    ){}

    static create(object : { [ key: string ]: any }): [string?, CreateCartShopDto?]{

        const {user, products} = object;

        if(!Validators.isMongoId(user)) return ['User ID no es valido'];

        for (const p of products) {
            if (!Validators.isMongoId(p.product)) return ['Id no valido']
        }

        return [undefined, new CreateCartShopDto(user, products)];
        
    }

}