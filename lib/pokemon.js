import axios from 'axios'

export const getPokemon = async (id) => {
  const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return pokemon.data
}

export const getAllPokemons = async (limit = 100, offset = 0) => {
  const pokemonList = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

  return pokemonList.data.results
}