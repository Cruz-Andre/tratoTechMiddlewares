import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categoriasService";

const estadoInicial = []

export const buscarCategorias = createAsyncThunk(
  'categorias/buscar',
  categoriasService.buscar
)

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState: estadoInicial,
  reducers: {
    // O adicionarCategorias: é a action para mostrar as categorias que está vindo do servidor (db.json) pelo extraReducers
    adicionarCategorias: (state, {payload}) => {
      state.push(...payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(
      //recebendo o que foi chamado da api pelo categoriasService.
      buscarCategorias.fulfilled,
      (state, {payload}) => {
        state.push(...payload)
      }
    )
  }
})

export const { adicionarCategorias } = categoriasSlice.actions

export default categoriasSlice.reducer