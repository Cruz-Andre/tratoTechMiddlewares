import { configureStore } from "@reduxjs/toolkit";
import buscaSlice from "./reducers/buscaSlice";
import carrinhoSlice from "./reducers/carrinhoSlice";
import categoriasSlice from "./reducers/categoriasSlice";
import itensSlice from './reducers/itensSlice'


const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice
  }
})

export default store