import mongoose, { Schema } from "mongoose";

const ReviewSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

     comment: {
        type: String,
    }


})

export const ReviewModel = mongoose.model('Review', ReviewSchema);