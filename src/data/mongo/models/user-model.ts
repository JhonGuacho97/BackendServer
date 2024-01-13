import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Nombre requerido']
    },

    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true
    },

    emailValidated: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: [true, 'Password requerido']
    },

    img: {
        type: String
    },

    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
});

export const userModel = mongoose.model('User', userSchema);