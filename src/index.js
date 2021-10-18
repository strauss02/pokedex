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
  infoName.innerText = `Name: ${pokeData.name}`;
  infoWeight.innerText = `Weight: ${pokeData.weight / 10} kg`;
  infoHeight.innerText = `Height: ${pokeData.height / 10} m`;
  getTypes();
  infoImg.src = pokeData.sprites.front_default;
}

function getTypes() {
  let typeListEl = document.querySelector('.type-list');
  typeListEl.innerHTML = '';
  pokeData.types.forEach((item) => {
    const liEl = document.createElement('li');
    liEl.classList.add('info');
    liEl.textContent = `${item.type.name}`;
    typeListEl.append(liEl);
  });

  return typeListEl;
}

function showBack() {
  infoImg.src = pokeData.sprites.back_default;
}
function showFront() {
  infoImg.src = pokeData.sprites.front_default;
}

function inform(err) {
  console.log(err);
  alert(err.response.data);
}

async function showTypeList(e) {
  const typeName = e.target.innerText;
  let typeURL = '';
  let pokemonsOfType = [];
  pokeData.types.forEach((item) => {
    if (item.type.name === typeName) {
      typeURL = item.type.url;
      return;
    }
  });
  await axios.get(typeURL).then((res) => (pokemonsOfType = res.data.pokemon));
  //   console.log(pokemonsOfType);
  pokemonsOfType.forEach((item) => {
    pokemonsOfType.push(item);
  });

  //

  let morePokemonsEl = document.querySelector('.pokemons-of-type');
  morePokemonsEl.innerHTML = '';
  pokemonsOfType.forEach((item) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${item.pokemon.name}`;
    morePokemonsEl.append(liEl);
    console.log(item.pokemon.name);
  });
  showModal();
}

function handleListClick(e) {
  console.log(e.target.textContent);
  const otherPokemon = e.target.textContent;
  closeModal();
  searchInput.value = otherPokemon;
  searchPokemon();
}

//  MODAL //

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = showModal;

function showModal() {
  modal.style.display = 'block';
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  closeModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = outsideClick;

function outsideClick(event) {
  if (event.target == modal) {
    closeModal();
  }
}

function closeModal() {
  modal.style.display = 'none';
}
