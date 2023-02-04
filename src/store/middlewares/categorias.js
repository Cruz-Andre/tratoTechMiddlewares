import { createStandaloneToast } from "@chakra-ui/toast"
import { createListenerMiddleware } from "@reduxjs/toolkit"
import categoriasService from "services/categoriasService"
import { adicionarTodasCategorias, carregarCategorias } from "store/reducers/categoriasSlice"

export const listener = createListenerMiddleware()
const { toast } = createStandaloneToast()

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    toast({
      title: 'Carregando!',
      description: 'Carregando categorias...',
      status: 'loading',
      duration: 2000,
      isClosable: true
    })
    //console.log('escutando carregarCategorias:', action)
    const tarefa = fork(async api => {
      await api.delay(1000)
      return await categoriasService.buscar()
    })

    const resposta = await tarefa.result

    if (resposta.status === 'ok') {
      toast({
        title: 'Sucesso!',
        description: 'Categorias carregadas com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
      dispatch(adicionarTodasCategorias(resposta.value))
      unsubscribe()
    }
    if (resposta.status === 'rejected') {
      toast({
        title: 'Erro!',
        description: 'Erro na busca de categorias',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }
})
