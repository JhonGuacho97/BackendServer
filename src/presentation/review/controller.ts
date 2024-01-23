import { Request, Response } from "express";
import { CreateReviewDto, customErrors } from "../../domain";
import { ReviewServices } from "../services/review.service";


export class ReviewController {

    constructor(
        public readonly reviewServices: ReviewServices
    ){}

    private handleError = (error: unknown, res:Response) => {
        if(error instanceof customErrors) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createReviewVehicle = async (req: Request, res: Response) => {

        const [error, reviewDto] = CreateReviewDto.create(req.body)
        
        const idVehiculo:string = req.params.id

        if(error) return res.status(400).json(`${error}`)

        this.reviewServices.createReview(reviewDto!,req.body.user ,idVehiculo)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res))

    }

}