const headerHTML = `<header>
<nav class="navbar">
  <a href="index.html" class="navbarLogo">
    <img src="./logo.svg" width="30" alt="Logo" />
    <h1 class="navbarTitle">PokedexLMS</h1>
  </a>

  <div class="navbarLinks">
    <a href="index.html" class="navbarLink">Pokedex</a>
    <a href="pokedex_custom.html" class="navbarLink">Pokedex - Custom</a>
    <a href="equipe.html" class="navbarLink">Equipe</a>
    <a href="create_pokemon.html" class="navbarLink"
      ><b>CRIE O SEU POKÉMON!</b></a
    >
    <a href="information.html" class="navbarLink"><b>Informações</b></a>
  </div>
</nav>
</header>
`;

const footerHTML = `
<footer class="footer">
<div class="footerInfo">
  <span> PokedexLMS </span>
  <span>
    Feito utilizando a <a href="https://pokeapi.co/">PokeAPI</a>
  </span>
</div>
</footer>
`;

{
  /* <footer class="pagination">
<div class="paginationInfo">
  <span> PokedexLMS </span>
  <span> Feito utilizando a <a href="https://pokeapi.co/">PokeAPI</a> </span>
</div>

<div class="paginationActions">
  <button id="previous">Anterior</button>
  <button id="next">Próximo</button>
</div>
</footer> */
}

// on load document add footer and header into page
document.addEventListener("DOMContentLoaded", function (event) {
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", headerHTML);

  // add footer after main
  const main = document.querySelector("main");
  main.insertAdjacentHTML("afterend", footerHTML);
});
