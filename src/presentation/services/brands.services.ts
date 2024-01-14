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
    async deleteBrands(id: any) {

        try {

            await BrandModels.findByIdAndDelete(id);

            return {
                status: 'exito al borrar la categoria',
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

    async updateBrands(BrandDto: CreateBrandDto, id: any){

        try {

            const newBrand = await BrandModels.findByIdAndUpdate(id, BrandDto, {new: true})

            return {
                id: newBrand?.id,
                name: newBrand?.name,
                avaliable: newBrand?.avaliable
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
     }
}