import { VehiculoModel } from "../../data";
import { CreateVehicleDto, customErrors } from "../../domain";


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
            
            const cars = await VehiculoModel.find()
            .populate('user','-password -_id -__v')
            .populate('brand','-_id -__v')
            .populate('category','-_id -__v -user');

            return cars.map( car => ({
                id: car.id,
                state: car.stateVehicle,
                year: car.year,
                brand: car.brand,
                model: car.model,
                price: car.price,
                description: car.description,
                user: car.user,
                category: car.category
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

            return {
                id: newVehicle?.id,
                state: newVehicle?.stateVehicle,
                year: newVehicle?.year,
                brand: newVehicle?.brand,
                model: newVehicle?.model,
                price: newVehicle?.price,
                description: newVehicle?.description,
                category: newVehicle?.category
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

    async filterVehicle(year: any, brand: any, stateVehicle: any){

        try {

            const filter = await VehiculoModel.find({year: year, brand: brand, 
                                stateVehicle: stateVehicle});

            return filter;
            
        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

}