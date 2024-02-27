export class ConsultaPrisionPreventivaResModel{
    constructor(
        public codigo: string,
        public descripcion: string,
        public data: PrisionPreventiva[]
    ){}
}
export class PrisionPreventiva{
    constructor(
        public tipoParte: string,
        public dni: string,
        public nombres: string,
        public delito: string,
        public medida: string,
        public fechaInicio: string,
        public fechaFin: string,
        public estado: string,
        public nUnico: number,
        public incidente: number,
        public expediente: string,
        public resDictaPrisionPreventiva:string,
        public fechaDictaPrisionPreventina:string,
        public medidaCoercitiva:string
    ){}
}