import { createListenerMiddleware } from "@reduxjs/toolkit"
import categoriasService from "services/categoriasService"
import { adicionarTodasCategorias, adicionarUmaCategoria, carregarCategorias, carregarUmaCategoria } from "store/reducers/categoriasSlice"
import criarTarefa from "./utils/criarTarefa"

export const listener = createListenerMiddleware()

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const resposta = await criarTarefa({
      fork,
      dispatch,
      action: adicionarTodasCategorias,
      busca: categoriasService.buscar,
      textoCarregando: 'Carregando categorias...',
      textoSucesso: 'Categorias carregadas com sucesso!',
      textoErro: 'Erro na busca de categorias'
    })
    if(resposta.status === 'ok') {
      unsubscribe()
    }
  }
})

listener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    //console.log('carregar apenas uma categoria', {carregarUmaCategoria})
    const {categorias} = getState()
    const nomeCategoria = action.payload
    const categoriaCarregada = categorias.some(categoria => categoria.id === nomeCategoria)
    
    if(categoriaCarregada) return
    if(categorias.length === 5) return unsubscribe()

    await criarTarefa({
      fork,
      dispatch,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCatagoria(nomeCategoria),
      textoCarregando: `Carregando categoria: ${nomeCategoria}`,
      textoSucesso: `Categoria: ${nomeCategoria} carregada com sucesso!`,
      textoErro: `Erro na busca da categoria: ${nomeCategoria}`
    })
  }
})
