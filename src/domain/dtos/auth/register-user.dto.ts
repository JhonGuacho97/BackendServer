import { regularExps } from "../../../config";

export class RegisterUserDto{

    constructor(
        public name: string,
        public email: string,
        public password: string
    ){} 

    static create(object : { [key:string] : any }) : [string?, RegisterUserDto?] {

        const { name, email, password } = object;

        if(!name) return ['name requerido'];
        if(!email) return ['email requerido'];
        if(!regularExps.email.test(email)) return ['email invalido'];
        if(!password) return ['password requerida'];
        if( password.length < 6 ) return ['la passsword debe contener mas de 6 caracteres'];

        return [undefined, new RegisterUserDto(name, email, password)];

    }

}