import { configureStore} from "@reduxjs/toolkit";
import { categoriasListener } from "./middlewares/categorias";
import { itensListener } from "./middlewares/itens";
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
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(categoriasListener.middleware, itensListener.middleware)
})

export default store