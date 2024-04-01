import { bcryptAdapter, jwtAdapter } from "../../config";
import { userModel } from "../../data";
import { RegisterUserDto, UserEntity, customErrors, LoginUserDto } from "../../domain";

export class AuthService {

    constructor(){} 

    public async registerUser(regisUserDto: RegisterUserDto) {

        const existUser = await userModel.findOne({email: regisUserDto.email});
        if(existUser){
            throw customErrors.badRequest('Este correo ya existe');
        }

        

        try {
            
            const user = new userModel(regisUserDto);
            user.password = bcryptAdapter.hash(regisUserDto.password);

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await jwtAdapter.generateToke({id: user.id});
            if(!token) throw customErrors.internalServer('Error al generar el token')


            return {
                user: userEntity,
                token: token
            };

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDto){

            const userFound = await userModel.findOne({email: loginUserDto.email});
            if(!userFound) throw customErrors.badRequest('email no encontrado');

            const isValidPassword = bcryptAdapter.compare(loginUserDto.password, userFound.password);
            if(!isValidPassword) throw customErrors.badRequest('password incorrecto');

            const {password, ...userEntity} = UserEntity.fromObject(userFound);

            const token = await jwtAdapter.generateToke({id: userFound.id});
            if(!token) throw customErrors.internalServer('Error al generar el token');

            return {
                user: userEntity,
                token: token
            };
            

    }

}