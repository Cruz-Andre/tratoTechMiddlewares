import { forwardRef } from 'react'
import styles from './Input.module.scss'

function Input({value, onChange, ...outrosProps}, ref) {
  return (
    <input
      ref={ref}
      value={value} 
      onChange={onChange} 
      className={styles.input} 
      {...outrosProps}
    />
  )
}

export default forwardRef(Input)