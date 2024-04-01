import { Request, Response } from "express";
import { CreateCategoryDto, customErrors } from "../../domain";
import { CategoryService } from "../services/category.services";


export class categoryController {

    constructor( 
        public readonly categoryService: CategoryService
    ){} 


    private handleError = (error: unknown, res:Response) => {
        if(error instanceof customErrors) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createCategory = async (req: Request, res: Response) => {

        const [error, categoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error});

         
        this.categoryService.createCategory(categoryDto!, req.body.user)
        .then((category) => res.status(201).json(category))
        .catch(error => this.handleError(error, res));

    }

    getCategories = async (req: Request, res: Response) => {

        this.categoryService.getCategories()
        .then((categories) => res.json(categories))
        .catch(error => this.handleError(error, res))
    }

    deleteCategory = async (req: Request, res: Response) => {

        const id = req.params.id

        this.categoryService.deleteCategory(id)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));

    }

    updateCategory = async (req: Request, res: Response) => {

        const id = req.params.id;
        const [error, categoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error})

        this.categoryService.updateCategory(categoryDto!, id)
        .then((category) => res.json(category))
        .catch(error => this.handleError(error, res));
    }

    // getCategoryName = async (req: Request, res: Response) => {
        
    //     const name = req.params

    //     this.categoryService.getCategoryName(name)
    //     .then((data) => res.json(data))
    //     .catch(error => this.handleError(error, res))

    // }
}