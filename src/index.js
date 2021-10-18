const searchInput = document.querySelector('.search');

const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', searchPokemon);

async function searchPokemon() {
  const pokeName = searchInput.value;
  await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
    .then((res) => (pokeData = res.data));

  updateData();
}

let pokeData = {};

