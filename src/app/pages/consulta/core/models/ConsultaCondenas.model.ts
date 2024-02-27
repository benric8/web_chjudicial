export class FiltroHistorialModel {
    constructor(
        public documento: string,
	    public apellidoPaterno: string,
	    public apellidoMaterno: string,
	    public nombres: string,
	    public tipoConsulta: string
    ){}
}
export class ConsultaCondenasResModel {
	constructor(
		public codigo: string,
		public descripcion: string,
		public data: Condenas[]
	){}
}
export class Condenas{
	constructor(
		public documento: string,
		public nombresApellidos: string,
		public pena: string,
		public delito: string,
		public tiempoCondena: string,
		public fechaSentencia: string,
		public fechaInicio: string,
		public fechaFin: string,
		public rehabilitado: string
	){}
}