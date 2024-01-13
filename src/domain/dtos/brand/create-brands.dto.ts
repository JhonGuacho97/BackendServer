

export class CreateBrandDto {

    private constructor(
        public readonly name: string,
        public readonly avaliable: boolean
    ){}

    static create(object: {[key:string]: any}): [string?, CreateBrandDto?] {

        const { name, avaliable } = object;

        if(!name) return ['falta el nombre'];

        return [undefined, new CreateBrandDto(name, !!avaliable)];

    }
}