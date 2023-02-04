import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itensService";

import { v4 as uuid } from 'uuid'

export const buscarItens = createAsyncThunk(
  'itens/buscar',
  itensService.buscar
)

const itensSlice = createSlice({
  name: 'itens',
  initialState: [],

  //criando actions abaixo:
  reducers: {
    mudarFavorito: (state, params) => {
      //console.log('state: ', state)
      state.map(item => {
        if (item.id === params.payload) item.favorito = !item.favorito
        return item
      })
      //console.log('params: ', params)
    },

    // nova action para cadastrar um novo item
    cadastrarItem: (state, { payload }) => {
      //console.log('payload:', payload)
      state.push({ ...payload, id: uuid(), favorito: false })
    },

    mudarItem: (state, { payload }) => {
      //console.log(payload)
      state.map(item => {
        if (item.id === payload.id) Object.assign(item, payload.item) //Ou no lugar do Object.assing ---> item = {...item, ...payload.item} aqui nesse caso deve haver um return antes do .map()
        return item
      })
      // Ou
      // const index = state.findIndex(item => item.id === payload.id)
      // Object.assign(state[index], payload.item)
    },

    deletarItem: (state, { payload }) => {
      //console.log(payload)
      //forma que o immer pede para deletar
      const index = state.findIndex(item => item.id === payload)
      state.splice(index, 1)

      //return state.filter(item => item.id !== payload)
    },

    adicionarItens: (state, {payload}) => {
      state.push(...payload)
    }
  },

  // O extraReducers: é a uma action "de fora" para mostrar os ITENS que está vindo do servidor (db.json) pelo itensService
  extraReducers: builder => {
    builder.addCase(
      //recebendo o que foi chamado da api pelo itensService
      buscarItens.fulfilled,
      (state, { payload }) => {
        console.log('itens carregados!')
        // state.push(...payload) pega o que já está no estado e adiciona coisas novas, mas como só temos os mesmos itens podemos usar só o return payload
        return payload // sempre retorna o que vem da api
      }
    )
    .addCase(
      buscarItens.pending,
      (state, { payload }) => {
        console.log('carregando itens')
      }
    )
    .addCase(
      buscarItens.rejected,
      (state, { payload }) => {
        console.log('busca de itens rejeitada!');
      }
    )
  }
})

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem, adicionarItens } = itensSlice.actions

export default itensSlice.reducer