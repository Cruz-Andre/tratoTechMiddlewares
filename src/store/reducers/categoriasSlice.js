import { createStandaloneToast } from "@chakra-ui/toast";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categoriasService";
import { resetarCarrinho } from "./carrinhoSlice";

const {toast} = createStandaloneToast()

export const carregarCategorias = createAction('categorias/carregarCategorias')
export const carregarUmaCategoria = createAction('categorias/carregarUmaCategoria')

export const buscarCategorias = createAsyncThunk(
  'categorias/buscar',
  categoriasService.buscar
)

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState: [],
  reducers: {
    adicionarTodasCategorias: (state, {payload}) => {
      return payload
    },
    adicionarUmaCategoria: (state, {payload}) => {
      state.push(payload)
    }
  },
  // O extraReducers: é a uma action "de fora" para mostrar as CATEGORIAS que está vindo do servidor (db.json) pelo categoriasService
  extraReducers: builder => {
    builder
    .addCase(
      resetarCarrinho.type,
      () => {
        toast({
          title: 'Sucesso!',
          description: 'Compra completada com sucesso',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }
    )
  }
})

export const {adicionarTodasCategorias, adicionarUmaCategoria} = categoriasSlice.actions

export default categoriasSlice.reducer