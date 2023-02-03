import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categoriasService";

const {toast} = createStandaloneToast()

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
        toast({
          title: 'Sucesso!',
          description: 'Categorias carregadas com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
        // state.push(...payload) pega o que já está no estado e adiciona coisas novas, mas como só temos as mesmas categorias podemos usar só o return payload
        return payload // sempre retorna o que vem da api
      }
    )
    .addCase(
      buscarCategorias.pending,
      (state, {payload}) => {
        toast({
          title: 'Carregando!',
          description: 'Carregando categorias...',
          status: 'loading',
          duration: 2000,
          isClosable: true
        })
      }
    )
    .addCase(
      buscarCategorias.rejected,
      (state, {payload}) => {
        toast({
          title: 'Erro!',
          description: 'Erro na busca de categorias',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
    )
  }
})

export default categoriasSlice.reducer