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
  reducers: {},
  // O extraReducers: é a uma action "de fora" para mostrar as CATEGORIAS que está vindo do servidor (db.json) pelo categoriasService
  extraReducers: builder => {
    builder.addCase(
      //recebendo o que foi chamado da api pelo categoriasService.
      buscarCategorias.fulfilled,
      (state, {payload}) => {
        console.log('categorias carregadas!')
        // state.push(...payload) pega o que já está no estado e adiciona coisas novas, mas como só temos as mesmas categorias podemos usar só o return payload
        return payload // sempre retorna o que vem da api
      }
    )
    .addCase(
      buscarCategorias.pending,
      (state, {payload}) => {
        console.log('carregando categoria')
      }
    )
    .addCase(
      buscarCategorias.rejected,
      (state, {payload}) => {
        console.log('busca de categorias rejeitada!');
      }
    )
  }
})

export default categoriasSlice.reducer