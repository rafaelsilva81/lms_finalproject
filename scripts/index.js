const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPage = 1;
const itemsPerPage = 10;

async function listPokemon(page) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        offset: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
      },
    });

    const pokemons = response.data.results;

    console.log(`Página ${page}:`);
    pokemons.forEach(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      const { name, types, id } = pokemonData.data;
      console.log(
        `Nome: ${name}, ID: ${id}, Tipo(s): ${types
          .map((type) => type.type.name)
          .join(", ")}`
      );
    });
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os Pokémon:", error);
  }
}

function nextPage() {
  currentPage++;
  listPokemon(currentPage);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    listPokemon(currentPage);
  } else {
    console.log("Você está na primeira página.");
  }
}

// Listar a primeira página de Pokémon
listPokemon(currentPage);
