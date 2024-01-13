import mongoose from "mongoose";


export class Validators {

    static isMongoId(mongoId: string){
        return mongoose.isValidObjectId(mongoId);
    }

}