interface BaseResponse{
    codigo: string,
    descripcion: string,
    codigoOperacion: string
}
//--------------------ENTIDADES-------------------------
export interface Entidad{
    id: string,
    nombreEntidad: string,
    numeroDocumento: string,
    activo: string
} 

export interface EntidadesResponse extends BaseResponse{
    data:Entidad[]
}
export interface CrearEntidadResponse extends BaseResponse{
    data:any
}
export interface ActualizarEntidadResponse extends BaseResponse{
    data:any
}
export interface FiltroEntidadModel{
    idEntidad: string,
    entidad: string
}
//-------------------------------------------------

//--------------------USUARIOS-------------------------
export interface Usuario{
    id: number,
    usuario: string,
    contrasenia: string,
    nombres: string,
    apellidoPaterno: string | null,
    apellidoMaterno: string | null,
    numeroDocumento: string,
    correo: string,
    entidad: string,
    perfil: string,
    activo: string
} 

export interface UsuariosResponse extends BaseResponse{
    data:Usuario[]
}
export interface CrearUsuarioResponse extends BaseResponse{
    data:any
}
export interface ActualizarUsuarioResponse extends BaseResponse{
    data:any
}
//-------------------------------------------------
//--------------------PERFILES-------------------------
export interface Perfil{
    id: string,
    perfil: string,
    descripcion: string,
    rol: string,
    activo: string
}
export interface PerfilesResponse extends BaseResponse{
    data:Perfil[]
}

//-------------------------------------------------

export class ValidarDocumentoModel{
	constructor(
	public dni: string		
	){}
}

export class ValidarRUCModel{
	constructor(
	public numeroRuc: string		
	){}
}

export class ResponseReniecModel{
	constructor(
	public dni: string		
	){}
}

/*
export interface Perfil{
    id: number,
    nombre: string
}
export interface PerfilesResponse extends BaseResponse{
    data:Perfil[]
}

export interface Ubigeo{
    id: string,
    nombre: string,
    idSuperior: string
}

export interface UbigeoResponse extends BaseResponse{
    data: Ubigeo[]
}

export interface TipoDocumento{
    id: string,
    nombre: string,
    abreviatura: string
}

export interface TipoDocumentoResponse extends BaseResponse{
    data: TipoDocumento[]
}

export interface PersonaReniec{
    dni: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    nombres: string
}

export interface ConsultaReniecResponse extends BaseResponse{
    data:PersonaReniec
}

export interface DistritoJudicial {
    codigo: string,
    nombre: string,
    latitud: string | null,
    longitud: string |null
}

export interface DistritoJudicialResponse extends BaseResponse{
    data:DistritoJudicial[]
}
*/
