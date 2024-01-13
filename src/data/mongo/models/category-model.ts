import mongoose, { Schema } from 'mongoose'


const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name es requerido']
    },

    avaliable: {
        type: Boolean,
        default: false
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

export const categoryModel = mongoose.model('Category', categorySchema);