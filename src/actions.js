const axios = require('axios')

let config = {
  username: 'savta',
  'user-agent': 'PostmanRuntime/7.28.4',
  accept: '*/*',
  'postman-token': '92f7f104-5486-4325-a688-f438063dcc78',
  host: 'localhost:8080',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '0',
}

// axios
//   .post('http://localhost:8080/info', config)
//   .then((res) => console.log(res.data))

//get username pokemon list: works. just need to fix error when user does not exist
function getUserPokemonList() {
  axios
    .get('http://localhost:8080/pokemon/', { headers: { username: 'savta' } })
    .then((res) => console.log(res))
}

//get pokemon by id: works. returns pokeObject
function getPokemonById() {
  axios
    .get('http://localhost:8080/pokemon/get/25', {
      headers: { username: 'savta' },
    })
    .then((res) => console.log(res.data))
}
//get pokemon by name: works. returns pokeObject
function getPokemonByName() {
  axios
    .get('http://localhost:8080/pokemon/query?name=pikachu', {
      headers: { username: 'savta' },
    })
    .then((res) => console.log(res.data))
}

//get all pokemon caught by user. identical function to getUserPokemonList
function getCaughtList() {
  axios
    .get('http://localhost:8080/pokemon/list', {
      headers: { username: 'savta' },
    })
    .then((res) => console.log(res.data))
}

getCaughtList()
