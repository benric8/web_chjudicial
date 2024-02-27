import { Usuario } from "src/app/pages/autenticacion/core/models/LoginResponse.model"

export interface mostrartituloNavBar {
    titulo: string
}
export interface seleccionarOpcionMenu {
    url: string
}
export interface seleccionarOpcionMenuIndice {
    indice: number
}
export interface mostrarCargando {
    estado: boolean
}
export interface recuperarUsuario{
    usuario: Usuario|null
}