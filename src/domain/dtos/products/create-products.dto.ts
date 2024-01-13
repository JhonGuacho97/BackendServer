import { Validators } from "../../../config";

export class CreateVehicleDto {
  constructor(
    public readonly avaliable: boolean,
    public readonly stateVehicle: string,
    public readonly year: number,
    public readonly brand: string, //ID
    public readonly model: string,
    public readonly price: number,
    public readonly description: string,
    public readonly img: string,
    public readonly user: string, //ID
    public readonly category: string //ID
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateVehicleDto?] {
    
    const {
      avaliable,
      stateVehicle,
      year,
      brand,
      model,
      price,
      description,
      img,
      user,
      category,
    } = props;

    if(!Validators.isMongoId(user)) return ['User ID no es valido'];
    if(!Validators.isMongoId(category)) return ['Category Id no es valido'];
    if(!Validators.isMongoId(brand)) return ['Brand Id no es valido'];

    if(!year) return ['falta ingresar el año'];
    if(!brand) return ['falta la marca'];
    if(!model) return ['falta el modelo'];
    if(!price) return ['falta el precio'];
    if(!description) return ['falta la descripcion'];
    if(!user) return ['falta el usuario'];
    if(!category) return ['falta la categoria'];


    return [undefined, new CreateVehicleDto(!!avaliable, stateVehicle, year, brand, model, price, 
        description, img,user, category)];
  }
}
