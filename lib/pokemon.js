import axios from 'axios'

export const getPokemon = async (id) => {
  const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return pokemon.data
}