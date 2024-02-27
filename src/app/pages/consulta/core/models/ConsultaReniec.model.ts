export class ConsultaReniecReqModel{
    constructor(
        public dni: string
    ){}
}

export class ConsultaReniecResModel{
    constructor(
        public codigo: string,
        public descripcion: string,
        public data: dataReniec
    ){}
}

export class dataReniec{
    constructor(
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public nombres: string
    ){}
}