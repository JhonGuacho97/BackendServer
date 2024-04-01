import { Validators } from "../../../config";

export class FiltersDto {
  private constructor(
    public readonly year: number,
    public readonly brand: string,
    public readonly stateVehicle: string, 
    public readonly minPrice: number,
    public readonly maxPrice: number
  ) {}

  static filter(object: { [key: string]: any }): [string?, FiltersDto?] {
    const { year, brand, stateVehicle, minPrice, maxPrice } = object;

    //if(!Validators.isMongoId(brand)) return ['error']

    return [
      undefined,
      new FiltersDto(year, brand, stateVehicle, minPrice, maxPrice),
    ];
  }
}
