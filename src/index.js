const infoName = document.querySelector('.name');
const infoWeight = document.querySelector('.weight');
const infoHeight = document.querySelector('.height');
let infoType = document.querySelector('.type-list');
const infoImg = document.querySelector('.info-image');
const morePokemonsList = document.querySelector('.pokemons-of-type');

const searchInput = document.querySelector('.search');

const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', searchPokemon);
infoImg.addEventListener('mouseover', showBack);
infoImg.addEventListener('mouseleave', showFront);
infoType.addEventListener('click', showTypeList);
morePokemonsList.addEventListener('click', handleListClick);

async function searchPokemon() {
  const pokeName = searchInput.value;
  await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
    .then((res) => {
      pokeData = res.data;
      updateData();
    })
    .catch((err) => inform(err));
}

let pokeData = {};

function updateData() {
  infoName.innerText = pokeData.name;
  infoWeight.innerText = pokeData.weight;
  infoHeight.innerText = pokeData.height;
  getTypes();
  infoImg.src = pokeData.sprites.front_default;
}

function getTypes() {
  let types = '';
  pokeData.types.forEach((item) => {
    types += `${item.type.name} `;
  });
  return types;
}
