import { BrandModels } from "../../data";
import { CreateBrandDto, customErrors } from "../../domain";


export class BrandsServices {

    constructor(){}

    async createBrands( createBrandsDto: CreateBrandDto ){

        const existBrand = await BrandModels.findOne({name: createBrandsDto.name});
        if(existBrand) throw customErrors.badRequest('Ya existe esta marca registrada');

        try {

            const brands = new BrandModels(createBrandsDto);

            await brands.save();

            return {
                name: brands.name,
                avaliable: brands.avaliable
            };

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

    async getBrands() {
        try {
            
            const brands = await BrandModels.find();

            return brands;

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }
}