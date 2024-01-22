
export class CreateCitesDto {

    private constructor(
        public readonly reason: string,
        public readonly date: Date
        // public readonly vehicle:string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateCitesDto?] {

        const { reason, date } = object;

        if (!reason) return ['Indique el motivo de la cita'];
        if (!date) return ['No se especifica la fecha de la cita'];

        const transformedDate = new Date(date);

        if (isNaN(transformedDate.getTime())) {
            return ['La fecha especificada no es válida'];
        }

        return [undefined, new CreateCitesDto(reason, transformedDate)];

    }
}
