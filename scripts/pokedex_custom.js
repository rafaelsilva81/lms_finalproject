const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPage = 1;
const itemsPerPage = 60;

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("@lms:Pokedex")) || [];
}

function createPokemonCard(id, name, types, image) {
  const pokemonCard = document.createElement("div");
  pokemonCard.className = "pokemonCard";

  const pokemonImg = document.createElement("img");
  pokemonImg.className = "pokemonImage";
  pokemonImg.src = image;

  const pokemonName = document.createElement("h2");
  pokemonName.className = "pokemonName truncate";
  pokemonName.innerText = name;

  const pokemonId = document.createElement("small");
  pokemonId.className = "pokemonNumber";
  pokemonId.innerText = `#${id}`;
  pokemonName.appendChild(pokemonId);

  const pokemonType = document.createElement("p");
  pokemonType.className = "pokemonType";
  pokemonType.innerText = types.map((type) => type).join(", ");

  pokemonCard.append(pokemonImg, pokemonName, pokemonType);

  return pokemonCard;
}

async function listPokemon() {
  try {
    const pokemons = getLocalStorage();

    if (pokemons.length > 0) {
      pokemons.forEach((pokemon) => {
        const { id, name, types, image } = pokemon;

        const pokemonContainer = document.getElementById("pokemon-container");

        const pokemonCard = createPokemonCard(id, name, types, image);
        pokemonContainer.append(pokemonCard);
      });
    } else {
      const container = document.getElementById("pokemon-container");

      container.innerHTML = `
      <div style="height: 65.3vh; display: flex; flex-direction: column;align-items: center; justify-content: center">
        <h2>Ops!</h2>
        <span>Nenhum pokémon encontrado</span>
      </div>
      `;

      const containerPagination = document.getElementsByClassName("pagination");

      containerPagination[0].innerHTML = "";
    }
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
