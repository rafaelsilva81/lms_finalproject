const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPage = 1;
const itemsPerPage = 10;

/**
 * Retrieves a list of Pokemon from the API based on the given page number and items per page.
 * @async
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<Array<{name: string, id: number, types: Array<string>}>>} - A promise that resolves to an array of objects containing the name, id, and types of each Pokemon.
 */
async function listPokemon(page) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        offset: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
      },
    });

    const pokemons = response.data.results;

    const data = [];
    pokemons.forEach(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      const { name, types, id } = pokemonData.data;

      data.push({
        name,
        id,
        types: types.map((type) => type.type.name),
      });
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
