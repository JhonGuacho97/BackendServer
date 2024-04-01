import { CitesModel, VehiculoModel } from "../../data";
import { CreateCitesDto, UserEntity, customErrors } from "../../domain";



export class CitesServices{

    constructor(){}


    async createCites(citesDto: CreateCitesDto, user:UserEntity, vehicleId:string){

        try {

            const newCiteVehicle = await VehiculoModel.findById(vehicleId)
            
            const cites = new CitesModel({
                ...citesDto,
                vehicle: newCiteVehicle?._id,
                user: user.id
            })
    
            await cites.save();

            return {
                message: 'La cita fue creada con exito'
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

    }

    async confirmCites(citeId: string){
        try {
            
            const cite = await CitesModel.findByIdAndUpdate(citeId, {isConfirmed: true}, {new: true})
            if(!cite) throw customErrors.badRequest('No se encuentra esta cita')

            return cite;

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

}