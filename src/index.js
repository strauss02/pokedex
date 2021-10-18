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

const infoName = document.querySelector('.name');
const infoWeight = document.querySelector('.weight');
const infoHeight = document.querySelector('.height');
const infoType = document.querySelector('.type');

function updateData() {
  infoName.innerText = pokeData.name;
  infoWeight.innerText = pokeData.weight;
  infoHeight.innerText = pokeData.height;
  infoType.innerText = getTypes();
  console.log(pokeData.sprites.front_default);
  console.log(pokeData.sprites.back_default);
}

function getTypes() {
  let types = '';
  pokeData.types.forEach((item) => {
    types += `${item.type.name} `;
  });
  return types;
}
