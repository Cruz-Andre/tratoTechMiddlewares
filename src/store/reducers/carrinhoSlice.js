import { createSlice } from "@reduxjs/toolkit";

//pode ser direto initialState ou inves de estadoInicial
const initialState = []

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    mudarCarrinho: (state, params) => {
      const temItem = state.some(item => item.id === params.payload)

      if (!temItem) return [
        ...state,
        {
          id: params.payload,
          quantidade: 1
        }
      ]
      
      return state.filter(item => item.id !== params.payload)
    },
    
    // usando a destruturação colocando direto o payload
    mudarQuantidade: (state, {payload}) => {
      state = state.map(itemNoCarrinho => {
        if(itemNoCarrinho.id === payload.id) itemNoCarrinho.quantidade += payload.quantidade
        return itemNoCarrinho
      })
    },
    
    resetarCarrinho: () => initialState

  }
})

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho } = carrinhoSlice.actions

export default carrinhoSlice.reducer