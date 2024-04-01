import mongoose, { Schema } from "mongoose";



const CitesSchema = new mongoose.Schema({

    reason:{ 
        type: String,
    },

    date: {
        type: Date,
        required: true
    },

    isConfirmed: {
        type: Boolean,
        default: false
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }

})

export const CitesModel = mongoose.model('Cites', CitesSchema);
