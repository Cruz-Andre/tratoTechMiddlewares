import Button from "components/Button/Button";
import Header from "components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import styles from './Anuncie.module.scss'
import { cadastrarItem } from "store/reducers/itensSlice";
import { useParams } from "react-router-dom";
import Input from "components/Input/Input";
import { useEffect } from "react";
import { buscarCategorias } from "store/reducers/categoriasSlice";


export default function Anuncie() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(buscarCategorias())
  }, [dispatch])
                                                //aqui o categorias é nome dado no reducer
  const categorias = useSelector(state => state.categorias.map(({nome, id}) => ({nome, id})))
  console.log(categorias)

  const { nomeCategoria = '' } = useParams()
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: nomeCategoria
    }
  })
  //console.log(register('novoInput'))

  const {errors} = formState
  //console.log('Erros:', errors)
  //console.log('Nome do Erro:', errors.nome)
  
  function cadastrar(data) {
    //console.log('Data:', data);
    dispatch(cadastrarItem(data))
  }


  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto aqui!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input 
          className={errors.titulo ? styles.inputErro : ''} 
          {...register('titulo', {required: 'O campo nome é obrigatório!'})} 
          placeholder="Nome do produto" 
          alt="nome do produto"
        />
        {errors.titulo && <span className={styles.mensagemErro}> {errors.titulo.message} </span>}

        <Input 
          className={errors.descricao ? styles.inputErro : ''} 
          {...register('descricao', {required: 'O campo descrição é obrigatório!'})}
          placeholder="Descrição do produto" 
          alt="descrição do produto" 
        />
        {errors.descricao && <span className={styles.mensagemErro}> {errors.descricao.message} </span>}

        <Input 
          className={errors.foto ? styles.inputErro : ''} 
          {...register('foto', {required: 'O campo da URL é obrigatório!'})}
          placeholder="URL da imagem do produto" 
          alt="URL da imagem do produto" 
        />
        {errors.foto && <span className={styles.mensagemErro}> {errors.foto.message} </span>}

        <select 
          className={errors.categoria ? styles.inputErro : ''} 
          {...register('categoria', {required: 'O campo categoria é obrigatório!'})}
          disabled={nomeCategoria}
        >
          <option value='' disabled>Selecione a Categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && <span className={styles.mensagemErro}> {errors.categoria.message} </span>}

        <Input 
          className={errors.preco ? styles.inputErro : ''} 
          {...register('preco', {required: 'O campo preço é obrigatório!', valueAsNumber: true})} 
          type='number' 
          placeholder='Preço do produto' 
        />
        {errors.preco && <span className={styles.mensagemErro}> {errors.preco.message} </span>}
        <Button type='submit'>
          Cadastrar produto
        </Button>
      </form>
    </div>
  )
}