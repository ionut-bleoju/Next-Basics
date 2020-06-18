import { getAllPokemons } from '../lib/pokemon'
import Layout from '../components/layout'
import PokemonCard from '../components/pokemon-card'

const container = {
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'stretch',
  padding: '5px',
  justifyContent: 'space-evenly'
}

export default (props) => {
  return (
    <Layout>
      <div style={container}>
        {props.pokemons.map((pokemon, index) =>
          <PokemonCard key={index} index={index + 1} name={pokemon.name} />
        )}
      </div>
    </Layout >
  )
}

export async function getStaticProps(context) {
  const pokemons = await getAllPokemons()

  return {
    props: {
      pokemons: pokemons
    },
  }
}