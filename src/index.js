const infoName = document.querySelector('.name')
const infoWeight = document.querySelector('.weight')
const infoHeight = document.querySelector('.height')
let infoType = document.querySelector('.type-list')
const infoImg = document.querySelector('.info-image')
const morePokemonsList = document.querySelector('.pokemons-of-type')
const usernameInput = document.querySelector('.username-input')
const catchButton = document.querySelector('.catch-button')
const releaseButton = document.querySelector('.release-button')
const caughtButton = document.querySelector('.caught-button')

const searchInput = document.querySelector('.search')

const searchBtn = document.querySelector('.search-btn')

let username = ''
usernameInput.addEventListener('keyup', () => {
  username = usernameInput.value
  console.log(username)
})

searchBtn.addEventListener('click', searchPokemon)
infoImg.addEventListener('mouseover', showBack)
infoImg.addEventListener('mouseleave', showFront)
infoType.addEventListener('click', showTypeList)
morePokemonsList.addEventListener('click', handleListClick)
catchButton.addEventListener('click', catchPokemon)
releaseButton.addEventListener('click', releasePokemon)
caughtButton.addEventListener('click', showCaught)

async function showCaught() {
  const res = await axios.get(`http://localhost:8080/pokemon/list`, {
    headers: { username: username },
  })
  let caughtPokemonsEl = document.querySelector('.pokemons-caught')
  caughtPokemonsEl.innerHTML = ''
  console.log('37:', res.data)
  res.data.forEach((item) => {
    const liEl = document.createElement('li')
    liEl.textContent = `${item}`
    caughtPokemonsEl.append(liEl)
  })
  showCaughtModal()
}

async function catchPokemon() {
  let pokemonId = pokeData.name
  axios
    .put(`http://localhost:8080/pokemon/catch/${pokemonId}`, '', {
      headers: { username: username },
    })
    .catch((err) => inform(`you can't catch a pokemon you already caught!`))
}

async function releasePokemon() {
  let pokemonId = pokeData.name
  axios
    .delete(`http://localhost:8080/pokemon/release/${pokemonId}`, {
      headers: { username: username },
    })
    .catch((err) => inform(`you can't release a pokemon you didn't catch`))
}
async function searchPokemon() {
  const pokeName = searchInput.value
  if (isNaN(pokeName)) {
    console.log('query zone')
    console.log(pokeName)
    //search by query
    await axios
      .get(`http://localhost:8080/pokemon/query?name=${pokeName}`, {
        headers: { username: username },
      })
      .then(async function (res) {
        await assignNewData(res.data)
        console.log(res)
        updateData()
      })
      .catch((err) => inform(err))
  } else {
    console.log('id zone')

    //search by id
    await axios
      .get(`http://localhost:8080/pokemon/get/${pokeName}`, {
        headers: { username: username },
      })
      .then(async (res) => {
        pokeData = res.data
        await updateData()
      })
      .catch((err) => inform(err))
  }
}

function assignNewData(data) {
  pokeData = data
}

let pokeData = {}

async function updateData() {
  console.log('in update data', pokeData)
  infoName.innerText = `Name: ${pokeData.name}`
  infoWeight.innerText = `Weight: ${pokeData.weight / 10} kg`
  infoHeight.innerText = `Height: ${pokeData.height / 10} m`
  await getTypes()
  infoImg.src = pokeData.front_pic
}

function getTypes() {
  let typeListEl = document.querySelector('.type-list')
  typeListEl.innerHTML = ''
  pokeData.types.forEach((item) => {
    const liEl = document.createElement('li')
    liEl.classList.add('info')
    liEl.textContent = `${item}`
    typeListEl.append(liEl)
  })

  return typeListEl
}

function showBack() {
  infoImg.src = pokeData['back_pic']
}
function showFront() {
  infoImg.src = pokeData.front_pic
}

function inform(msg) {
  const errorElement = document.createElement('div')
  errorElement.classList.add('alert', 'alert-danger')
  document.body.prepend(errorElement)
  //if it's an error, display it's message
  if (msg.message) {
    errorElement.innerText = msg.message
  } else {
    errorElement.innerText = msg
  }
  setTimeout(() => {
    errorElement.remove()
  }, 3000)

  console.log(err)
}

async function showTypeList(e) {
  const pokeName = pokeData.name
  let types = ''
  await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
    .then((res) => {
      types = res.data.types
    })

  const typeName = e.target.innerText
  let typeURL = ''
  let pokemonsOfType = []
  console.log(types)
  types.forEach((item) => {
    if (item.type.name === typeName) {
      typeURL = item.type.url
      return
    }
  })
  await axios.get(typeURL).then((res) => (pokemonsOfType = res.data.pokemon))
  //   console.log(pokemonsOfType);
  pokemonsOfType.forEach((item) => {
    pokemonsOfType.push(item)
  })

  //

  let morePokemonsEl = document.querySelector('.pokemons-of-type')
  morePokemonsEl.innerHTML = ''
  pokemonsOfType.forEach((item) => {
    const liEl = document.createElement('li')
    liEl.textContent = `${item.pokemon.name}`
    morePokemonsEl.append(liEl)
    console.log(item.pokemon.name)
  })
  showModal()
}

async function handleListClick(e) {
  console.log(e.target.textContent)
  const otherPokemon = e.target.textContent
  closeModal()
  console.log('line 173')
  searchInput.value = otherPokemon
  console.log('line 175')
  await searchPokemon()
}

//  MODAL //

const modal = document.getElementById('myModal')
const caughtModal = document.querySelector('.modal-caught')

// Get the button that opens the modal
const btn = document.getElementById('myBtn')

// Get the <span> element that closes the modal
const spans = document.querySelectorAll('.close')
spans.forEach((element) => element.addEventListener('click', closeModal))

// When the user clicks on the button, open the modal

function showModal() {
  modal.style.display = 'block'
}
function showCaughtModal() {
  caughtModal.style.display = 'block'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = outsideClick

function outsideClick(event) {
  if (event.target == modal) {
    closeModal()
  }
}

function closeModal() {
  modal.style.display = 'none'
  caughtModal.style.display = 'none'
}
