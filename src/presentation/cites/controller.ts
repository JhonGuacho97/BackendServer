import { Request, Response } from "express";
import { CreateCitesDto, customErrors } from "../../domain";
import { CitesServices } from "../services/cites.service";


export class CitesController{ 

    constructor(
        public readonly citesServices: CitesServices
    ){}

    private handleError = (error: unknown, res:Response) => {
        if(error instanceof customErrors) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createCites = (req: Request, res: Response) => {

        const [error, citesDto] = CreateCitesDto.create(req.body)
        if(error) return res.status(400).json(`${error}`)

        const idVehicle:string = req.params.id;

        this.citesServices.createCites(citesDto!, req.body.user, idVehicle)
        .then((cite) => res.json(cite))
        .catch(error => this.handleError(error, res))

    }

}