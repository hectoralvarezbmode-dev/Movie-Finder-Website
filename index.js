const movieListAdd = document.querySelector(".movie__repository")
const loadSpinner = document.querySelector(".loader")
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let movieArray = []



async function GetMovies() {
  try{
  const MovieList = await fetch("http://www.omdbapi.com/?apikey=77879732")
  const Movies =  await MovieList.json()
  console.log(Movies)} 
  catch (error) { console.error("Couldn't load movies", error.message)}
}
// 77879732

async function searchBar(event) {
  try{
  const movieName = event.target.value

  loadSpinner.classList += ' movies__loading'  
  const movieSearch = await fetch(
  `https://www.omdbapi.com/?apikey=77879732&s=${(movieName)}&type=movie`);
  const movieData = await movieSearch.json()
  
    
  movieArray = [...movieData.Search]
  movieListAdd.innerHTML = movieData.Search.map(movie => movieHTML(movie)).join("")
  loadSpinner.classList.remove('movies__loading') 
  }
  catch (error) { 
    console.error("Couldn't load movies,", error.message)
    alert("We couldn't find your request")
    loadSpinner.classList.remove('movies__loading')
  }
} 

function moviePosterFill(movie) {
  return `<div class="movie__card">
        <figure class="movie__img--wrapper">
          <img class="movie__img" src="assets/placeholder.png" alt="">
        </figure>
        <div class="movie__description--wrapper">
            <h5 class="movie__title"> ${movie.Title}</h5>
        <div class="stars">
          Released in ${movie.Year}
        </div>
        </div>
        
      </div>`
}

function movieHTML(movie) {
  return `<div class="movie__card">
        <figure class="movie__img--wrapper">
          <img class="movie__img" src="${movie.Poster}" onerror="this.src='assets/placeholder.png'" alt="">
        </figure>
        <div class="movie__description--wrapper">
            <h5 class="movie__title"> ${movie.Title}</h5>
        <div class="stars">
          Released in ${movie.Year}
        </div>
        </div>
        
      </div>`
}

function filterSearch(event){
  renderSearch(event.target.value)
}


async function renderSearch(filter) {
  const movieArr = movieArray
  console.log(filter)

  if (filter === 'A_TO_Z') {
    movieArr.sort((a, b) => a.Title.localeCompare(b.Title))
    console.log(movieArr)
  }
  if (filter === 'Z_TO_A') {
    movieArr.sort((a, b) => b.Title.localeCompare(a.Title))
    console.log(movieArr)
  }
  if (filter === 'IMDB_RATING'){
    movieArr.sort((a, b) => (a.Year) - (b.Year))
    console.log(movieArr)
  }


  movieListAdd.innerHTML = movieArray.map(movie => movieHTML(movie)).join("")

}