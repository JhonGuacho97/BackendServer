export class customErrors extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    )
    {
        super(message)
    }

    static badRequest(message: string) {
        return new customErrors(400, message)
    }

    static unauthorize(message: string) {
        return new customErrors(401, message)
    }
    static forbidden(message: string) {
        return new customErrors(403, message)
    }
    static norFound(message: string) {
        return new customErrors(404, message)
    }
    static internalServer(message: string) {
        return new customErrors(500, message)
    }

}