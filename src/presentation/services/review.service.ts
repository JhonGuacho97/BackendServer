import { ReviewModel, VehiculoModel } from "../../data";
import { CreateReviewDto, UserEntity, customErrors } from "../../domain";

export class ReviewServices {

    constructor(){}


    async createReview(reviewDto: CreateReviewDto, user: UserEntity, idVehicle: string){

        try { 
            
            const addReview = await VehiculoModel.findById(idVehicle);
            if(!addReview) throw customErrors.badRequest('Ocurrio un error')
            
            const review = new ReviewModel({
                ...reviewDto,
                user: user.id
            })
            
            await review.save();
            
            addReview.reviews.push(review._id);
            await addReview.save();
            
            return {
                message: 'Su comentario fue enviado con exito'
            };

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

}