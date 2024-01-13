import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect (options: Options){
        const { mongoUrl, dbName } = options;

        try {
            
            mongoose.connect(mongoUrl, {
                dbName: dbName
            })
            console.log('connected');
            
            return true;

        } catch (error) {
            console.log('mongoConnection Error');
            throw error;
        }
    }

}