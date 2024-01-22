import { Validators } from "../../../config";


export class CreateReviewDto{

    constructor( 
        public readonly comment:string,
        //public readonly user : string, 
        public readonly rating : number,
    ){}

    static create(object : {[key: string]: any}): [string?, CreateReviewDto?]{

        const { comment, rating } = object;

        return[undefined, new CreateReviewDto(comment, rating)];
    }

}