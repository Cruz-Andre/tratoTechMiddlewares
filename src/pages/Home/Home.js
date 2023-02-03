import Header from 'components/Header/Header'
import styles from './Home.module.scss'
import relogio from 'assets/inicial.png'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button/Button';
import { useCallback, useEffect } from 'react';
import instance from 'common/config/api';
import { adicionarCategorias } from 'store/reducers/categoriasSlice';
import { adicionarItens } from 'store/reducers/itensSlice';

export default function Home() {
  
  const navigate = useNavigate()
  const categorias = useSelector(state => state.categorias)
  
  const dispatch = useDispatch()

  const buscarCategorias = useCallback(async () => {
    const resposta = await instance.get('/categorias')
    //console.log('RESPOSTA:', resposta)
    dispatch(adicionarCategorias(resposta.data))
  }, [dispatch])

  const buscarItens = useCallback(async () => {
    const resposta = await instance.get('/itens')
    //console.log('RESPOSTA:', resposta)
    dispatch(adicionarItens(resposta.data))
  }, [dispatch])

  useEffect(() => {
    buscarCategorias()
    buscarItens()
  }, [buscarCategorias, buscarItens])

  return (
    <div>
      <Header
        titulo='Classificados Tech'
        descricao='Compre diversos tipos de produtos no melhor site do Brasil!'
        className={styles.header}
        imagem={relogio}
      >
        <Button onClick={() => navigate('/anuncie')}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.categorias}>
        <div className={styles['categorias-title']}>
          <h1>Categorias</h1>
        </div>
        <div className={styles['categorias-container']}>
          {categorias.map((categoria, index) => (
            <div key={index} onClick={() => navigate(`categoria/${categoria.id}`)}>
              <img src={categoria.thumbnail} alt={categoria.nome} />
              <h1>{categoria.nome}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}