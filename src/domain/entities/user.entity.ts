import { customErrors } from "../errors/custom.error";

export class UserEntity { 

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: [string],
        public img?: string,
    ){}

    static fromObject(object: { [key:string] : any }) {
        
        const {id, _id, name, email, emailValidated, password, role, img} = object;

        if(!_id && !id) {
            throw customErrors.badRequest('Falta el Id');
        }

        if(!name) throw customErrors.badRequest('Falta el nombre');
        if(!email) throw customErrors.badRequest('falta el email');
        if(emailValidated === undefined) throw customErrors.badRequest('falta validar el email');
        if(!password) throw customErrors.badRequest('falta la contrasena');
        if(!role) throw customErrors.badRequest('rol no especificado');
        
        return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
    }

}