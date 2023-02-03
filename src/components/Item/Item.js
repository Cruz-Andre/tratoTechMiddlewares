import { AiOutlineHeart, AiFillHeart, AiFillMinusCircle, AiFillPlusCircle, AiOutlineCheck, AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinhoSlice'
import { deletarItem, mudarFavorito, mudarItem } from 'store/reducers/itensSlice'

import styles from './Item.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import Input from 'components/Input/Input'

const iconeProps = {
  size: 24,
  color: '#041833'
}

const quantidadeIconeProps = {
  size: 32,
  color: '#1875e8'
}

export default function Item({ titulo, foto, preco, descricao, favorito, id, carrinho, quantidade }) {

  const [modoDeEdicao, setModoDeEdicao] = useState(false)
  const [editarTitulo, setEditarTitulo] = useState(titulo)

  const dispatch = useDispatch()

  const estaNoCarrinho = useSelector(state => state.carrinho.some(itemNocarrinho => itemNocarrinho.id === id))

  function favoritar() {
    dispatch(mudarFavorito(id))
  }

  function adicionarNoCarrinho() {
    dispatch(mudarCarrinho(id))
  }

  const componenteModoDeEdicao = <>
    {modoDeEdicao
      ? <AiOutlineCheck
        {...iconeProps}
        className={styles['item-acao']}
        onClick={() => {
          setModoDeEdicao(false)
          dispatch(mudarItem({
            id,
            item: {titulo: editarTitulo}
          }))
        }}
      />
      : <AiFillEdit
        {...iconeProps}
        className={styles['item-acao']}
        onClick={() => setModoDeEdicao(true)}
      />
    }
  </>

  return (
    <div className={classNames(styles.item, {
      [styles.itemNoCarrinho]: carrinho
    })}>
      {carrinho ? '' : <AiFillCloseCircle 
        {...iconeProps} 
        className={`${styles['item-acao']} ${styles['item-deletar']}`} 
        onClick={() => dispatch(deletarItem(id))}
      />
      }
      <div className={styles.imagem1}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={styles['item-descricao']}>
        <div className={styles['item-titulo']}>
          {modoDeEdicao
            ? <Input 
                value={editarTitulo} 
                onChange={evento => setEditarTitulo(evento.target.value)} 
              />
            : <h2>{titulo}</h2>
          }
          <p>{descricao}</p>
        </div>
        <div className={styles['item-info']}>
          <div className={styles['item-preco']}>
            R$ {preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={styles['item-acoes']}>
            {favorito
              ? <AiFillHeart className={styles['item-acao']} {...iconeProps} color='#ff0000' onClick={favoritar} />
              : <AiOutlineHeart className={styles['item-acao']} {...iconeProps} onClick={favoritar} />
            }

            {carrinho
              ? <>
                <button className={styles.botaoRemover} onClick={() => {
                  dispatch(mudarCarrinho(id))
                }}
                >
                  Remover
                </button>

                <div className={styles.quantidade}>
                  Quantidade:
                  <AiFillMinusCircle
                    {...quantidadeIconeProps}
                    onClick={() => {
                      if (quantidade >= 1) {
                        dispatch(mudarQuantidade({ id, quantidade: -1 }))
                      }
                    }}
                  />

                  <span>{String(quantidade || 0).padStart(2, '0')}</span>

                  <AiFillPlusCircle
                    {...quantidadeIconeProps}
                    onClick={() => dispatch(mudarQuantidade({ id, quantidade: +1 }))}
                  />
                </div>
              </>

              : <>
                <FaCartPlus
                  className={styles['item-acao']}
                  {...iconeProps}
                  color={estaNoCarrinho ? '#1875e8' : iconeProps.color}
                  onClick={adicionarNoCarrinho}
                />
                {componenteModoDeEdicao}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}