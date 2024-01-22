import { Request, Response } from "express";
import { CreateVehicleDto, customErrors } from "../../domain";
import { VehicleServices } from "../services/product.service";

export class productsController {
  constructor(public readonly vehicleServices: VehicleServices) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof customErrors) {
      return res.status(error.statusCode).json({ error: error.message });
    } 

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };
 
  createProducts = async (req: Request, res: Response) => {
    const [error, vehicleDto] = CreateVehicleDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.vehicleServices
      .createProducts(vehicleDto!)
      .then((vehicle) => res.status(201).json(vehicle))
      .catch((error) => this.handleError(error, res));
  };

  getProducts = async (req: Request, res: Response) => {
    this.vehicleServices
      .getVehicles()
      .then((car) => res.json(car))
      .catch((error) => this.handleError(error, res));
  };

  filterProduct = async (req: Request, res: Response) => {
        const year = req.params.year;
        const brand = req.params.brand;
        const state = req.params.state;
        this.vehicleServices.filterVehicle(year, brand, state)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res))
  };

  searchsProducts = (req: Request, res: Response) => {
    
    const queryParams = req.params.key

    this.vehicleServices.searchVehicle(queryParams)
    .then((data) => res.json(data))
    .catch(error => this.handleError(error, res))

  }
}
