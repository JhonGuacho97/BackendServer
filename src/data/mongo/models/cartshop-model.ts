import mongoose, {Schema} from "mongoose";


const cartSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Vehicle',
                required: true 
            },
            quantity: Number
        }
    ]

});

export const cartShopModel = mongoose.model('CartShop', cartSchema);