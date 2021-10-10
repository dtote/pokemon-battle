import _ from "lodash";

// Auxiliar function
const createElement = (type) => document.createElement(type);

// DOM
const startButton = document.querySelector(".start-button");
const genSelector = document.querySelector(".gen-selector");
const [topPokemonPicDiv, bottomPokemonPicDiv] = document.querySelectorAll(".pokemon");
const [topPokemonStatsDiv, bottomPokemonStatsDiv] = document.querySelectorAll(".poke-stats");
const [image1, name1, attack1, defense1, hp1] =
[
  createElement("img"),
  createElement("div"),
  createElement("div"),
  createElement("div"),
  createElement("div")
];
const [image2, name2, attack2, defense2, hp2] =
[
  createElement("img"),
  createElement("div"),
  createElement("div"),
  createElement("div"),
  createElement("div")
];

// Cnost
const pokemonGenRanges = [[1, 151], [152, 251], [252, 386], [387, 490], [491, 649], [650, 721], [722, 802], [803, 889]];
const topBasicStats = [image1, name1, attack1, defense1, hp1];
const bottomBasicStats = [image2, name2, attack2, defense2, hp2];
const getTwoRandomNumbers = (start = 1, end = 151) => _.shuffle(_.range(start, end)).slice(0, 2);
const getPokemonGenRange = () => pokemonGenRanges[parseInt(genSelector.value) - 1];

const fetchPokemonData = (index) => {
  const pokemonApiPrefix = "https://pokeapi.co/api/v2/pokemon/";
  return fetch(`${pokemonApiPrefix + index}`)
    .then((response) => response.json())
    .then((data) => data);
};

const setPokemonData = (pokemon, data, basicStats) => {
  const basicStatsTextContent = [[], ["Name: ", data.name.toUpperCase()], ["Attack: ", data.stats[0].base_stat], ["HP: ", data.stats[1].base_stat], ["Defense: ", data.stats[2].base_stat]];
  basicStats.forEach((stat, index) => {
    if (index !== 0) {
      stat.classList.add("stat");
      stat.textContent = `${basicStatsTextContent[index][0] + basicStatsTextContent[index][1]}`;
      pokemon.statsDiv.appendChild(stat);
    } else {
      stat.src = data.sprites.front_default;
      stat.classList.add("pokemon-pic");
      pokemon.picDiv.appendChild(stat);
    }
  });
};
const getAllPokemons = async() => {
  const [ini, fin] = getPokemonGenRange();
  const pokemonIndexes = getTwoRandomNumbers(ini, fin);
  const topPokemonData = await fetchPokemonData(pokemonIndexes[0]);
  const bottomPokemonData = await fetchPokemonData(pokemonIndexes[1]);
  const topPokemon = {
    picDiv: topPokemonPicDiv,
    statsDiv: topPokemonStatsDiv
  };
  const bottomPokemon = {
    picDiv: bottomPokemonPicDiv,
    statsDiv: bottomPokemonStatsDiv
  };

  setPokemonData(topPokemon, topPokemonData, topBasicStats);
  setPokemonData(bottomPokemon, bottomPokemonData, bottomBasicStats);
};

// Listeners
startButton.addEventListener("click", getAllPokemons);
