import { configureStore} from "@reduxjs/toolkit";
import { listener } from "./middlewares/categorias";
import buscaSlice from "./reducers/buscaSlice";
import carrinhoSlice from "./reducers/carrinhoSlice";
import categoriasSlice from "./reducers/categoriasSlice";
import itensSlice from './reducers/itensSlice'

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listener.middleware)
})

export default store