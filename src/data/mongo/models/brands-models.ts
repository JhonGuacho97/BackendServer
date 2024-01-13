import mongoose from "mongoose";


const BrandsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name requerido']
    },

    avaliable: {
        type: Boolean,
        default: false
    }

});

export const BrandModels = mongoose.model('Brands', BrandsSchema);