import Button from 'components/Button/Button'
import Header from 'components/Header/Header'
import Item from 'components/Item/Item'
import { useDispatch, useSelector } from 'react-redux'
import { resetarCarrinho } from 'store/reducers/carrinhoSlice'
import styles from './Carrinho.module.scss'

export default function Carrinho() {
  const dispatch = useDispatch()

  const { carrinho, total } = useSelector(state => {
    let total = 0
    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(item => item.id === itemNoCarrinho.id)
      total += (item.preco * itemNoCarrinho.quantidade)
      itens.push({
        ...item,
        quantidade: itemNoCarrinho.quantidade,
      })
      return itens
    }, [])
    return {
      carrinho: carrinhoReduce,
      total: total
    }
  })

  return (
    <div>
      <Header
        titulo='Carrinho de compras'
        descricao='Confira produtos que você adicionou ao carrinho'
      />
      <div className={styles.carrinho}>
        {carrinho.map(item => <Item key={item.id} {...item} carrinho={true} />)}
        <div className={styles.total}>
          <strong>
            Resumo da compra
          </strong>
          <span>
            Subtotal: <strong> R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </span>
        </div>
        <Button onClick={() => dispatch(resetarCarrinho())}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}