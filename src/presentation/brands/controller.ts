import { Request, Response } from "express";
import { CreateBrandDto, customErrors } from "../../domain";
import { BrandsServices } from "../services/brands.services";


export class BrandController {

    constructor(
        public readonly brandsServices: BrandsServices
    ){}

    private handleError = (error: unknown, res:Response) => {
        if(error instanceof customErrors) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createBrands = async (req: Request, res: Response) => {

        const [error, brandsDto] = CreateBrandDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.brandsServices.createBrands(brandsDto!)
        .then((brands) => res.status(201).json(brands))
        .catch(error => this.handleError(error, res));

    }

    getBrands = async (req: Request, res: Response) => {

        this.brandsServices.getBrands()
        .then((brands) => res.status(201).json(brands))
        .catch(error => this.handleError(error, res));

    }

}