export class CambioContraseniaRequest {
    constructor(
        public usuario: string,
        public claveActual: string,
        public claveNueva: string,
        public claveConfirm: string
    ){}
}
export class CambioContraseniaResponse{
    constructor(
        public codigo: string,
        public descripcion: string,
        public data:string|null
    ){}
}