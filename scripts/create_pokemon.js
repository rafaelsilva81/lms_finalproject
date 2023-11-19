const listCustomPokemon = [];

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("@lms:Pokedex")) || [];
}

function addPokemonInLocalStorage(newItem) {
  const currentList = getLocalStorage();
  currentList.push(newItem);

  localStorage.setItem("@lms:Pokedex", [JSON.stringify(currentList)]);
}

function getSelectedTypes() {
  const selectedButtons = document.querySelectorAll(".selected");
  const selectedTypes = Array.from(selectedButtons).map(
    (button) => button.textContent
  );
  return selectedTypes;
}

// Manipular o envio do formulário
document
  .getElementById("pokemon-form")
  .addEventListener("submit", function (e) {
    // Recuperar os dados do formulário
    const name = document.getElementById("name").value;
    const types = getSelectedTypes();
    const image = document.getElementById("image").value;

    const newPokemon = {
      id: -1,
      name: name,
      types: types,
      image: image,
    };

    addPokemonInLocalStorage(newPokemon);
    alert("Pokemon criado");
  });

function loadValuesInputTypePokemon() {
  const tiposPokemon = [
    "Água",
    "Fogo",
    "Planta",
    "Elétrico",
    "Gelo",
    "Lutador",
    "Voador",
    "Psíquico",
    "Inseto",
    "Veneno",
    "Terra",
    "Rocha",
    "Fantasma",
    "Aço",
    "Noturno",
    "Fada",
  ];

  // Obtém o elemento que conterá os botões
  const buttonContainer = document.getElementById("buttonContainer");

  // Função para alternar a seleção de botões
  function toggleSelection(button) {
    const quantityTypes = getSelectedTypes().length;
    if (quantityTypes > 2) {
      alert("Máximo de tipo do pokemon atingido");
      return;
    }
    button.classList.toggle("selected");
  }

  // Cria os botões
  tiposPokemon.forEach((tipo) => {
    const button = document.createElement("button");
    button.textContent = tipo;
    button.type = "button";
    button.className = "pokemon-button";
    button.addEventListener("click", () => toggleSelection(button));

    // Adiciona o botão ao container
    buttonContainer.appendChild(button);
  });
}

window.onload = async () => {
  loadValuesInputTypePokemon();
};
