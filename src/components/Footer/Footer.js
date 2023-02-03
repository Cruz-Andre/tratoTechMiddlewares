import styles from './Footer.module.scss'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const iconeProps = {
  color: "white",
  size: 24
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.div}>
          <FaFacebook {...iconeProps} />
          <FaTwitter {...iconeProps} />
          <FaInstagram {...iconeProps} />
        </div>
        <span>
          Desenvolvido por Alura & André Cruz 2023
        </span>
    </footer>
  )
}