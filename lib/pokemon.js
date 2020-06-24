import axios from 'axios'

export const getPokemon = async (id) => {
  const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return pokemon.data
}

export const getAllPokemons = async (offset = 0, limit = 100) => {
  const pokemonList = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

  return pokemonList.data.results
}