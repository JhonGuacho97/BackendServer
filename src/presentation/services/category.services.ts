import { categoryModel } from "../../data";
import { CreateCategoryDto, UserEntity, customErrors } from "../../domain";

 

 export class CategoryService{
    
    constructor(){}
 
     async createCategory(createCategoryDto: CreateCategoryDto, user:UserEntity){

        const categoryExist = await categoryModel.findOne({name: createCategoryDto.name});
        if(categoryExist) throw customErrors.badRequest('Ya existe esta categoria');

        if(user.role.find(e => e === 'USER_ROLE')) throw customErrors.badRequest('no tienes el rol de admin!');
        

        try {
            
            const category = new categoryModel({
                ...createCategoryDto,
                user: user.id
            });

            await category.save();

            return {
                id: category.id,
                name: category.name,
                avaliable: category.avaliable
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
     }

     async getCategories (){

        try {
         
            const categories = await categoryModel.find().populate('user');
           
           
            return categories.map(category => ({
                id: category.id,
                name: category.name,
                avaliable: category.avaliable,
                user: category.user
            }))

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
     }


     async deleteCategory(id: any){

        try {
            
            await categoryModel.findByIdAndDelete(id);

            return{
                status: 'exito al borrar la categoria',
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }

     }

     async updateCategory(categoryDto: CreateCategoryDto, id: any){

        try {

            const newCategory = await categoryModel.findByIdAndUpdate(id, categoryDto, {new: true})

            return {
                id: newCategory?.id,
                name: newCategory?.name,
                avaliable: newCategory?.avaliable
            }

        } catch (error) {
            throw customErrors.internalServer(`${error}`)
        }
     }

    //  async getCategoryName(categories: any){

    //     try {
            
    //         const category = await categoryModel.find({name: categories.name})
    //         return category.map(data => ({
    //             id: data.id,
    //             name: data.name,
    //             avaliable: data.avaliable
    //         }))

    //     } catch (error) {
    //         throw customErrors.internalServer(`${error}`)
    //     }
    //  }

 }