


export class CreateCategoryDto {

    private constructor(
        public readonly name: string,
        public readonly avaliable: boolean
    ){}

    static create(object: { [ key:string ]: any }) : [string?, CreateCategoryDto?]{
            
        const { name, avaliable = false} = object;
        let avaliableBoolean = avaliable;

        if(!name) return ['Falta el nombre'];
        
        if( typeof avaliable !== 'boolean'){
            avaliableBoolean = (avaliable === 'true');
        }

        return [undefined, new CreateCategoryDto(name, avaliableBoolean)];

    }
}