export class MenuOpcion{
    constructor(
        public etiqueta: string,
        public url: string,
        public icono: string,
        public activo: string
    ){}
}
export class Usuario{
    constructor(
        public id: number,
        public entidad: string,
        public usuario: string,
        public contrasenia: string,
        public perfil: string,
        public numeroDocumento: string,
        public apellidosNombres: string,
        public correo: string,
        public activo: string,
        public codigoRol: string,
        public opcions: MenuOpcion[],
        public token: string
    ){}
}
export class LoginResponse{
  constructor(
      public codigo: string,
      public descripcion: string,
      public data: Usuario
  ){}
}