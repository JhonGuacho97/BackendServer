import fs from 'fs';
import path from 'path';
import { Request, Response } from "express";


export class ImageController { 

    constructor(){}

    getImage = (req: Request, res: Response) =>{
        
        const { img= ''} = req.params

        const imagePath = path.resolve(__dirname, `../../../uploads/${img}`);

        if(!fs.existsSync(imagePath)){
            return res.status(404).json('image not found')
        }

        res.sendFile(imagePath);
    }

}