import _ from "lodash";

// DOM
const startButton = document.querySelector(".start-button");
const [topPokemonPicDiv, bottomPokemonPicDiv] = document.querySelectorAll(".pokemon");
const [topPokemonStatsDiv, bottomPokemonStatsDiv] = document.querySelectorAll(".poke-stats");

const getTwoRandomNumbers = () => _.shuffle(_.range(1, 100)).slice(0, 2);

const fetchPokemonData = async() => {
  const pokemonApiPrefix = "https://pokeapi.co/api/v2/pokemon/";
  const pokemonIndexes = getTwoRandomNumbers();
  return await pokemonIndexes.map((index) => {
    return fetch(`${pokemonApiPrefix + index}`)
      .then((response) => response.json())
      .then((data) => data);
  });
};

const getAllPokemons = async() => {
  // clearBattle();
  // localStorage.setItem("pokemonIndexes", JSON.stringify(pokemonIndexes));
  await pokemonIndexes.map((pokemonIndex) => {
    return fetch(`${pokemonApiPrefix + pokemonIndex}`)
      .then((response) => response.json())
      .then((pokemon) => {
        const pokemonData = {
          name: pokemon.name.toUpperCase(),
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          front_img: pokemon.sprites.front_default,
          back_img: pokemon.sprites.back_default,
        };
        localStorage.setItem(pokemonIndex, JSON.stringify(pokemonData));
      });
  });
  setPokemon(topPokemon);
  setPokemon(bottomPokemon);
};

const getStoredPokemonIndex = (pokemonIndex) => JSON.parse(localStorage.getItem("pokemonIndexes"))[pokemonIndex];
const getStoredPokemon = (index) => JSON.parse(localStorage.getItem(getStoredPokemonIndex(index)));
const topPokemon = {
  data: getStoredPokemon(0),
  picDiv: topPokemonPicDiv,
  statsDiv: topPokemonStatsDiv
};
const bottomPokemon = {
  data: getStoredPokemon(1),
  picDiv: bottomPokemonPicDiv,
  statsDiv: bottomPokemonStatsDiv
};
const clearBattle = () => {
  localStorage.clear();
  topPokemon.picDiv.childNodes.forEach((child) => child.remove());
  bottomPokemon.picDiv.childNodes.forEach((child) => child.remove());
  topPokemon.statsDiv.childNodes.forEach((child) => child.remove());
  bottomPokemon.statsDiv.childNodes.forEach((child) => child.remove());
};

const setPokemon = (pokemon) => {
  const pokemonImage = document.createElement("img");
  const pokemonName = document.createElement("div");
  const pokemonAttack = document.createElement("div");
  const pokemonDefense = document.createElement("div");
  const pokemonHp = document.createElement("div");
  const basicStats = [pokemonName, pokemonAttack, pokemonHp, pokemonDefense];
  pokemonName.textContent = "Name: " + pokemon.data.name;
  pokemonAttack.textContent = "Attack: " + pokemon.data.attack;
  pokemonHp.textContent = "HP: " + pokemon.data.hp;
  pokemonDefense.textContent = "Defense: " + pokemon.data.defense;
  pokemonImage.src = pokemon.data.front_img;
  pokemonImage.classList.add("pokemon-pic");
  pokemon.picDiv.appendChild(pokemonImage);
  basicStats.forEach((stat) => {
    stat.classList.add("stat");
    pokemon.statsDiv.appendChild(stat);
  });
};

// Listeners
startButton.addEventListener("click", () => getAllPokemons());
