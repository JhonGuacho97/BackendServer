import { VehiculoModel } from "../../data";
import { CreateVehicleDto, FiltersDto, customErrors } from "../../domain";


export class VehicleServices {
 
    constructor(){}

    async createProducts(createVehicleDto: CreateVehicleDto) {

        const productExist = await VehiculoModel.findOne({model: createVehicleDto.model});
        if(productExist) throw customErrors.badRequest('Ya existe este modelo');

        try {
            
            const vehicle = new VehiculoModel(createVehicleDto);

            await vehicle.save();
 
            return vehicle;

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

    async getVehicles (){

        try {
            
            const cars = await VehiculoModel.find().populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name -_id'
                },
                select:'-_id -__v'
            })
            // .populate('category','-_id -__v -user');

            return cars.map( car => ({
                id: car.id,
                state: car.stateVehicle,
                year: car.year,
                brand: car.brand,
                model: car.model,
                price: car.price,
                description: car.description,
                category: car.category,
                reviews: car.reviews
            }))

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

    async deleteVehicle(id: any){
        
        try {
            
            await VehiculoModel.findByIdAndDelete(id);

            return {
                status: 'elemento borrado de la base de datos'
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

    async updateVehicle(vehicleDto: CreateVehicleDto, id: any){

        try {
            
            const newVehicle = await VehiculoModel.findByIdAndUpdate(id, vehicleDto, {new: true});
            if(!newVehicle) throw customErrors.badRequest('no se encontro este vehiculo')

            return {
                id: newVehicle.id,
                state: newVehicle.stateVehicle,
                year: newVehicle.year,
                brand: newVehicle.brand,
                model: newVehicle.model,
                price: newVehicle.price,
                description: newVehicle.description,
                category: newVehicle.category
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

    // async filterVehicle(year: any, brand: any, stateVehicle: any){

    //     try {

    //         const filter = await VehiculoModel.find({year: year, brand: brand, 
    //                             stateVehicle: stateVehicle});
    //         console.log(filter);
            
    //         return filter;
            
    //     } catch (error) {
    //         throw customErrors.internalServer(`${error}`)
    //     }
    // }

    async filtersQueryVehicle(filters: FiltersDto){

        try {
            
            const { year, brand, stateVehicle, minPrice, maxPrice } = filters

            const filterOptions: any = {}
 
            if(year) filterOptions.year = year
            if(brand) filterOptions.brand = brand
            if(stateVehicle) filterOptions.stateVehicle = stateVehicle
            if(minPrice || maxPrice ){
                filterOptions.price = {}
                if(minPrice) filterOptions.price.$gte = Number(minPrice)
                if(maxPrice) filterOptions.price.$lte = Number(maxPrice)
            }

            const vehicle = await VehiculoModel.find(filterOptions).populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name -_id'
                },
                select:'-_id -__v'
            })

            return vehicle;

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

    async searchVehicle(queryParams: any){

        try {
            const results = await VehiculoModel.aggregate(
                [
                    {
                      $search: {
                        index: "vehicles",
                        text: {
                          query: `${queryParams}`,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                ])
                  
            console.log(queryParams);
        

            return results;

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

    async getProductsByBrand(idBrand:string){ 

        try {
            
            const vehicleByCategories = await VehiculoModel.find({brand: idBrand})

            if(!vehicleByCategories) throw customErrors.badRequest('No hay resultados')

            return vehicleByCategories;

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

}