import { createSlice } from "@reduxjs/toolkit";

const estadoInicial = []

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState: estadoInicial,
  reducers: {
    adicionarCategorias: (state, {payload}) => {
      state.push(...payload)
    }
  }
})

export const { adicionarCategorias } = categoriasSlice.actions

export default categoriasSlice.reducer