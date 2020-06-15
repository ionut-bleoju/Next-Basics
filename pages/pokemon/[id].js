import React from 'react'
import PokemonCard from '../../components/pokemon-card'
import { getPokemon } from '../../lib/pokemon'


class Pokemon extends React.Component {
  static async getInitialProps(context) {
    let pokemon = null;
    try {
      pokemon = await getPokemon(context.query.id)
    } catch (error) {
      console.log(error);
    }

    console.log(pokemon)

    return {
      id: pokemon.id,
      name: pokemon.name,
      stats: pokemon.stats,
      types: pokemon.types,
      sprites: pokemon.sprites
    }
  }

  render() {
    return (
      <div>
        <PokemonCard {...this.props} />
      </div>
    )
  }
}

export default Pokemon
