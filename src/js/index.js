import _ from "lodash";

const createHtmlElement = (type) => document.createElement(type);

// DOM
const startButton = document.querySelector(".start-button");
const [topPokemonPicDiv, bottomPokemonPicDiv] = document.querySelectorAll(".pokemon");
const [topPokemonStatsDiv, bottomPokemonStatsDiv] = document.querySelectorAll(".poke-stats");
const [image1, name1, attack1, defense1, hp1] =
[
  createHtmlElement("img"),
  createHtmlElement("div"),
  createHtmlElement("div"),
  createHtmlElement("div"),
  createHtmlElement("div")
];
const [image2, name2, attack2, defense2, hp2] =
[
  createHtmlElement("img"),
  createHtmlElement("div"),
  createHtmlElement("div"),
  createHtmlElement("div"),
  createHtmlElement("div")
];
const topBasicStats = [image1, name1, attack1, defense1, hp1];
const bottomBasicStats = [image2, name2, attack2, defense2, hp2];
const getTwoRandomNumbers = () => _.shuffle(_.range(1, 100)).slice(0, 2);

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
  const pokemonIndexes = getTwoRandomNumbers();
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
