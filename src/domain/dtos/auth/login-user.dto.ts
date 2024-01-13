export class LoginUserDto {
    
    constructor(
        public email: string,
        public password: string
    ){}

    static create(object : { [key:string] : any }) : [string?, LoginUserDto?]{
        
        const {email, password} = object;

        if(!email) return ['email requerido'];
        if(!password) return ['password requerida'];

        return [undefined, new LoginUserDto(email, password)]
    }
}