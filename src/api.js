const url = 'https://www.omdbapi.com/?apikey=711a15f6'

/*function getMovies() {
  return fetch(`${url}&s=iron+man&t=movie&page=1`)
    .then(res => res.json())
    .then(res => res.Search)
}*/

function getMovies(name) {
  return fetch(`${url}&s=${name.trim().replace(' ', '+')}&page=1`).then(res =>
    res.json()
  )
  //.then(res => res.Search)
}

function getMovie(id) {
  return fetch(`${url}&i=${id}`)
    .then(res => res.json())
    .then(res => res)
}

export default {
  getMovies,
  getMovie
}
