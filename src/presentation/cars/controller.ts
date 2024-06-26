import { Request, Response } from "express";
import { CreateVehicleDto, FiltersDto, customErrors } from "../../domain";
import { VehicleServices } from "../services/product.service";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../services/file-upload.service";

export class productsController {
  constructor(public readonly vehicleServices: VehicleServices) { }

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
      user: req.body.user.id
    });
    if (error) return res.status(400).json({ error });

    const file = Array.isArray(req.files?.img)
    ? req.files?.img
    : [req.files?.img]

    this.vehicleServices
      .createProducts(vehicleDto!, file)
      .then((vehicle) => res.status(201).json(vehicle))
      .catch((error) => this.handleError(error, res));
  };

  getProducts = async (req: Request, res: Response) => {
    this.vehicleServices
      .getVehicles()
      .then((car) => res.json(car))
      .catch((error) => this.handleError(error, res));
  };

  getProductsByBrand = (req: Request, res: Response) => {

    const idVehicle:string = req.params.id

    this.vehicleServices.getProductsByBrand(idVehicle)
    .then((cars) => res.json(cars))
    .catch(error => this.handleError(error, res))

  }

  deleteVehicle = async (req: Request, res: Response) => {

    const productId:string = req.params.id

    this.vehicleServices.deleteVehicle(productId)
      .then((data) => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  updateVehicle = async (req: Request, res: Response) => {

    const id = req.params.id;
    const [error, vehicleDto] = CreateVehicleDto.create({
      ...req.body,
      user: req.body.user.id
    });
    if (error) return res.status(400).json({ error });

    this.vehicleServices.updateVehicle(vehicleDto!, id)
      .then((vehicle) => res.json(vehicle))
      .catch(error => this.handleError(error, res));
  }


  filtersQueryProducts = (req: Request, res: Response) => {

    const [error, filterDto] = FiltersDto.filter(req.query)
    if(error) return res.status(400).json(`${error}`)

    this.vehicleServices.filtersQueryVehicle(filterDto!)
    .then((data) => res.json(data))
    .catch(error => this.handleError(error, res))

  }
 
  searchsProducts = (req: Request, res: Response) => {
    
    const queryParams = req.params.key

    this.vehicleServices.searchVehicle(queryParams)
    .then((data) => res.json(data))
    .catch(error => this.handleError(error, res))

  }

  getProductById = (req: Request, res: Response) => {

    const { id } = req.params

    this.vehicleServices.vehicleById(id)
    .then((vehicle) => res.json(vehicle))
    .catch(error => this.handleError(error, res))

  }
  
}
