import {ActionReducerMap} from "@ngrx/store";
//----------- general - shared --------
import * as reducersGeneral from '../shared/store/reducers';
import * as generalEstados from '../shared/store/states/general.states';

export interface AppHjState {
    // shared
    mostrartituloNavBar: generalEstados.mostrartituloNavBar,
    seleccionarOpcionMenu: generalEstados.seleccionarOpcionMenu,
    seleccionarOpcionMenuIndice: generalEstados.seleccionarOpcionMenuIndice,
    mostrarCargando: generalEstados.mostrarCargando,
    recuperarUsuario: generalEstados.recuperarUsuario,
}

export const appHjReducers: ActionReducerMap<AppHjState> = {
    // shared
    mostrartituloNavBar: reducersGeneral.mostrarTituloNavBar,
    seleccionarOpcionMenu:reducersGeneral.seleccionarOpcionMenu,
    seleccionarOpcionMenuIndice:reducersGeneral.seleccionarOpcionMenuIndice,
    mostrarCargando: reducersGeneral.mostrarCargando,
    recuperarUsuario: reducersGeneral.recuperarUsuario
}