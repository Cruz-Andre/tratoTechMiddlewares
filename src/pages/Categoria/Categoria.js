import Button from "components/Button/Button";
import Header from "components/Header/Header";
import Item from "components/Item/Item";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buscarCategorias } from "store/reducers/categoriasSlice";
import { buscarItens } from "store/reducers/itensSlice";

import styles from './Categoria.module.scss'

export default function Categoria() {

  const { nomeCategoria } = useParams()

  // Não há necessidade de usar o useSelector duas ou mais vezes.
  const { categoria, itens } = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i')
    return {
      categoria: state.categorias.find(categoria => categoria.id === nomeCategoria) || {},
      itens: state.itens.filter(item => item.categoria === nomeCategoria && item.titulo.match(regexp))
    }
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(buscarCategorias())
    dispatch(buscarItens())
  }, [dispatch])

  const navigate = useNavigate()

  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.itens}>
        {itens.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}