import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Pagination } from 'antd';
import { getAllPokemons } from '../lib/pokemon'
import Layout from '../components/layout'
import PokemonCard from '../components/pokemon-card'

const container = {
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px,1fr))',
}

export default function Pokedex(props) {
  const router = useRouter()
  const [pokemons, setPokemons] = useState(props.pokemons)

  useEffect(() => {
    setPokemons(props.pokemons)
  }, [props.pokemons])

  const onPageChange = (page) => {
    console.log('Here', page)

    router.push({
      pathname: '/pokedex',
      query: { page: page },
    });

  };

  return (
    <Layout>
      <div style={container}>
        {pokemons.map((pokemon, index) =>
          <PokemonCard key={pokemon.name} index={(props.currentPage - 1) * 100 + index + 1} name={pokemon.name} />
        )}
      </div>
      <Pagination
        style={{ padding: '5px', position: 'fixed', bottom: '15px', right: '15px', backgroundColor: 'rgba(80,80,120,0.4)' }}
        simple
        current={props.currentPage}
        onChange={onPageChange}
        pageSize={100}
        total={800}
      />
    </Layout >
  )
}

Pokedex.getInitialProps = async (context) => {
  let offset = 0;

  if (context.query) {
    offset = (context.query.page - 1) * 100
  }

  const pokemons = await getAllPokemons(offset)

  return {
    currentPage: context.query.page || 0,
    pokemons: pokemons
  }
}