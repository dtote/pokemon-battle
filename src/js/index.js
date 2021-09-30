const pokemons = {
  0: { name: "bulbasaur", atk: 49, hp: 45 },
  1: { name: "ivysaur", atk: 62, hp: 60 },
  2: { name: "venusaur", atk: 82, hp: 80 },
  3: { name: "charizard", atk: 84, hp: 78 },
};
const button = document.querySelector(".start-button");
const leftPokemon = {
  data: {},
  pokemonPicDiv: document.querySelectorAll(".pokemon")[0],
  pokemonStatsDiv: document.querySelectorAll(".poke-stats")[0]
};
const rightPokemon = {
  data: {},
  pokemonPicDiv: document.querySelectorAll(".pokemon")[1],
  pokemonStatsDiv: document.querySelectorAll(".poke-stats")[1]
};
const setRandomPokemons = () => {
  const leftPokemonIndex = Math.floor(Math.random() * Object.keys(pokemons).length);
  const rightPokemonIndex = Math.floor(Math.random() * Object.keys(pokemons).length);
  leftPokemon.data = pokemons[leftPokemonIndex];
  rightPokemon.data = pokemons[rightPokemonIndex];
  leftPokemon.pokemonPicDiv.textContent = leftPokemon.data.name;
  rightPokemon.pokemonPicDiv.textContent = rightPokemon.data.name;
  leftPokemon.pokemonStatsDiv.textContent = `Ataque: ${leftPokemon.data.atk} | HP: ${leftPokemon.data.hp}`;
  rightPokemon.pokemonStatsDiv.textContent = `Ataque: ${rightPokemon.data.atk} | HP: ${rightPokemon.data.hp}`;
};

button.addEventListener("click", () => setRandomPokemons());