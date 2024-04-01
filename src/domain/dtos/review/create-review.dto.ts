import { Validators } from "../../../config";


export class CreateReviewDto{ 

    constructor( 
        public readonly comment:string,
        //public readonly user : string, 
        public readonly rating : number,
        public readonly vehicle : string,
    ){}

    static create(object : {[key: string]: any}): [string?, CreateReviewDto?]{

        const { comment, rating, vehicle} = object;

        return[undefined, new CreateReviewDto(comment, rating, vehicle)];
    }

}