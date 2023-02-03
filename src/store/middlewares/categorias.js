import { createListenerMiddleware } from "@reduxjs/toolkit"
import { buscarCategorias } from "store/reducers/categoriasSlice"


export const listener = createListenerMiddleware()

listener.startListening({
  actionCreator: buscarCategorias.pending,
  effect: async (action) => {
    console.log('buscando categorias:', action)
  }
})
