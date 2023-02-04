import { createListenerMiddleware } from "@reduxjs/toolkit"
import itensService from "services/itensService"
import { carregarUmaCategoria } from "store/reducers/categoriasSlice"
import { adicionarItens } from "store/reducers/itensSlice"
import criarTarefa from "./utils/criarTarefa"

export const itensListener = createListenerMiddleware()

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    //console.log('carregando itens', {carregarUmaCategoria})
    const { itens } = getState()

    if(itens.length === 25) return unsubscribe()

    const nomeCategoria = action.payload

    const itensCarregados = itens.some(item => item.categoria === nomeCategoria)
    if(itensCarregados) return

    await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      busca: () => itensService.buscarItensDeUmaCategoria(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso!`,
      textoErro: `Erro na busca dos itens da categoria ${nomeCategoria}`
    })
  }
})