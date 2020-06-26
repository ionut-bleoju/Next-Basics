import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Pagination } from 'antd';
import { getAllPokemons } from '../lib/pokemon'
import Layout from '../components/layout'
import PokemonCard from '../components/pokemon-card'
import styles from '../styles/pokedex.module.scss'


export default function Pokedex(props) {
  const router = useRouter()
  const [pokemons, setPokemons] = useState(props.pokemons)

  useEffect(() => {
    setPokemons(props.pokemons)
  }, [props.pokemons])

  const onPageChange = (page) => {

    router.push({
      pathname: '/pokedex',
      query: { page },
    });

  };

  return (
    <Layout>
      <div className={styles.container}>
        {pokemons.map((pokemon, index) =>
          <PokemonCard key={pokemon.name} index={props.initialIndex + index} name={pokemon.name} />
        )}
      </div>
      <div
          className={styles.pagination}
      >
        <Pagination
          simple
          current={props.currentPage}
          onChange={onPageChange}
          pageSize={100}
          total={800}
        />
      </div>
    </Layout >
  )
}

Pokedex.getInitialProps = async ({ query: { page } }) => {
  const currentPage = Math.min(Math.max(1, page), 8) || 1;
  const offset = (currentPage - 1) * 100;
  const pokemons = await getAllPokemons(offset)

  console.log(currentPage, offset)

  return {
    currentPage,
    initialIndex: offset + 1,
    pokemons: pokemons
  }
}