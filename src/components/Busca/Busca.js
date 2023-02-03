import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { mudarBusca, resetarBusca } from 'store/reducers/buscaSlice'
import styles from './Busca.module.scss'


export default function Busca() {
  const busca = useSelector(state => state.busca)
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(resetarBusca())
  }, [location.pathname, dispatch])

  return (
    <div className={styles.busca}>
      <input 
        className={styles.input} 
        placeholder='O que você procura'
        value={busca}
        onChange={evento => dispatch(mudarBusca(evento.target.value))}
      />
    </div>
  )
}