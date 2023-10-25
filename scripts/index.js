const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPage = 1;
const itemsPerPage = 60;

function createPokemonCard(name, types, id) {
  const pokemonCard = document.createElement("div");
  pokemonCard.className = "pokemonCard";

  const pokemonImg = document.createElement("img");
  pokemonImg.className = "pokemonImage";
  pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const pokemonName = document.createElement("h2");
  pokemonName.className = "pokemonName truncate";
  pokemonName.innerText = name;

  const pokemonId = document.createElement("small");
  pokemonId.className = "pokemonNumber";
  pokemonId.innerText = `#${id}`;
  pokemonName.appendChild(pokemonId);

  const pokemonType = document.createElement("p");
  pokemonType.className = "pokemonType";
  pokemonType.innerText = types.map((type) => type.type.name).join(", ");

  pokemonCard.append(pokemonImg, pokemonName, pokemonType);

  return pokemonCard;
}

async function listPokemon(page) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        offset: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
      },
    });

    const pokemons = response.data.results;

    pokemons.forEach(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      const { name, types, id } = pokemonData.data;

      const pokemonContainer = document.getElementById("pokemon-container");

      const pokemonCard = createPokemonCard(name, types, id);
      pokemonContainer.append(pokemonCard);
    });
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os Pokémon:", error);
  }
}

window.onload = async () => {
  await listPokemon(currentPage);

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");

  previousButton.onclick = async (e) => {
    e.preventDefault();
    if (currentPage === 1) return;

    //clear pokemon container
    const pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML = "";
    currentPage--;
    await listPokemon(currentPage);
  };

  nextButton.onclick = async (e) => {
    e.preventDefault();

    //clear pokemon container
    const pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML = "";

    currentPage++;
    await listPokemon(currentPage);
  };
};
