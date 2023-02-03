import styles from './Navbar.module.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import classNames from 'classnames'
import { RiShoppingCart2Line, RiShoppingCartFill } from 'react-icons/ri'
import Busca from 'components/Busca/Busca'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const iconeProps = {
  color: 'white',
  size: 24
}

export default function Navbar() {

  const location = useLocation()
  const navigate = useNavigate()

  const estaNoCarrinho = useSelector(state => state.carrinho)
    
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} onClick={() => navigate('/')} />
      <div className={styles.links}>
        <div>
          <Link to='/' className={classNames({
            [styles.link]: true,
            [styles.selected]: location.pathname === '/'
            })}
          >
            Página Inicial
          </Link>
        </div>
      </div>
      <div className={classNames({
        [styles.busca]: true,
        [styles.tiraBusca]: location.pathname === '/carrinho'
      })}>
        <Busca />
      </div>
      <div className={styles.icones}>
        <Link to='/carrinho'>
          {estaNoCarrinho.length >= 1
            ? <RiShoppingCartFill {...iconeProps} />
            : <RiShoppingCart2Line {...iconeProps} />
          }
        </Link>
        {estaNoCarrinho.length >= 1 
          ? <span className={styles.itemNoCarrinho}>{String(estaNoCarrinho.length)}</span>
          : <span></span>
        }
      </div>
    </nav>
  )
}