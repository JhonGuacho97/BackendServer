import mongoose, { Schema } from "mongoose";

const vehiculoSchema = new mongoose.Schema({
 
  avaliable: {
    type: Boolean,
    default: false,
    sparse: true,
  },

  stateVehicle: {
    type: String,
    default: "aceptable",
    sparse: true,
  },

  year: {
    type: Number,
    default: 0,
    required: true,
    sparse: true,
  },

  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brands",
    required: true,
  },

  model: {
    type: String,
    required: [true, "Modelo es requerido"],
  },

  price: {
    type: Number,
    default: 0,
    required: true,
  },

  description: {
    type: String,
    sparse: true, 
  },

  glasses : {
    type: String,
    default: 'No especificado'
  },

  typeDirection: {
    type:String,
    default: 'Hidraulica'
  },

  typeMotor: {
    type: String,
    default: 'No especificado'
  },

  typeCombustible: {
    type:String,
    default: 'No especificado'
  },

  climatization:{
    type: String,
    default: 'No especificado'
  },

  motor: {
    type: String,
    default: 'No especificado'
  },

  tapized: {
    type: String,
    default: 'Tela'
  },

  placa: {
    type:String,
    default: 'No especificado'
  },

  img: [{
    type: String
}],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export const VehiculoModel = mongoose.model("Vehicle", vehiculoSchema);
