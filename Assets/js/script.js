// Kyle C Gify API Key - cmVU7ix5dloWzAOS2tEDijL0F1CEkuZT
// Kyle C OMDB API Key - b4e4f55f
// Natalie Y Gify API Key - 0ZtRGAT8OHOQfkQQhxXgwfbapGpNP66I
// Natalie Y OMDB API Key - a9de6950
// Deven C Giphy API Key - dLg5M2Mlv8CQ642sfvMyyvV9C1GcK7vg
// Deven C OMDB API Key - a43e73e6

//Movie Variables
const formEl = document.getElementById('movieTitleSearchForm');
const movieDisplay = document.getElementById('movieDisplay');
const movieTitleEl = document.getElementById('movieTitle');
const movieRatedEl = document.getElementById('movieRated');
const moviePlotEl = document.getElementById('moviePlot');
const movieRtRatingEl = document.getElementById('rottenTomatoRating');
const movieGenreEl = document.getElementById('movieGenre');
const movieActorsEl = document.getElementById('movieActors');
const moviePosterEl = document.getElementById('moviePoster');
const releaseYearEl = document.getElementById('releaseYear');
const url = 'https://www.omdbapi.com/?type=movie&apikey=b4e4f55f';
const gifEL = document.getElementById('iframe');

//Event Listeners
formEl.addEventListener("submit", handleSearchFormSubmit);

//Pulls the year that was searched into storage and runs the showMovies function.
function handleSearchFormSubmit(event) {
  event.preventDefault();
  // console.log("search form clicked!"); - works!

  const movieTitleInput = document.getElementById('movieTitleInput').value;
  // console.log('should see movie name, no quotes: ', movieTitleInput); - works

  localStorage.setItem('movieTitle', movieTitleInput);

  if (!movieTitleInput) {
    alert("You need to enter a movie title!"); //works!
    return;
  }

  showMovies();
}

//This will show the information for the movie title that was searched
function showMovies() {
  //Pulls movie title searched:
  var searchedMovieTitle = localStorage.getItem('movieTitle');
  // console.log("should see movie title, with no quotes: ", searchedMovieTitle); //- works

  //Adds the year to search to URL
  var urlBySearchYear = url + '&t=' + searchedMovieTitle;
  // console.log(urlBySearchYear); //- works!

  //Gets information from API
  fetch(urlBySearchYear)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.Response);
      if (data.Response == "False") {
        // console.log("no data")
        alert(data.Error);
      } else {
        //Removes Hide class once submit button is clicked
        movieDisplay.classList.remove("hide");
        // console.log(data); //works!
        let movieTitle = data.Title
        let releaseYear = data.Year
        let movieRated = data.Rated
        let moviePlot = data.Plot
        let rating = data.Ratings[1].Value.slice(0, -1)
        let movieGenre = data.Genre
        let movieActors = data.Actors
        let moviePoster = data.Poster

        //Displays data on page
        movieTitleEl.textContent = movieTitle;
        releaseYearEl.textContent = releaseYear;
        movieRatedEl.textContent = "Rated: " + movieRated;
        movieGenreEl.textContent = "Genre: " + movieGenre;
        movieActorsEl.textContent = "Main Actors: " + movieActors;
        moviePlotEl.textContent = moviePlot;
        moviePosterEl.src = moviePoster;
        movieRtRatingEl.textContent = "Rotten Tomatoes Rating: " + rating + "%";
        displayRatingMeme(parseInt(rating));
      }
    }
    )
}
//This will display the meme/gif based on movie rating
function displayRatingMeme(rating) {
  // console.log(rating); //Works!

  let memQuery = "";
  if (rating >= 85) {
    memQuery = "awesome";
  } else if (rating >= 50) {
    memQuery = "meh";
  } else if (rating < 50) {
    memQuery = "eww";
  }

  // Giphy API that we will pass through a keywork based on rating
  let memeUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${memQuery}&rating=pg-13&limit=10`;
  fetch(memeUrl)
    .then(function (d) {
      return d.json()
    })
    .then(function (data) {
      // console.log(memeUrl) //works!
      // console.log(data.data)
      var randomgif = Math.floor(Math.random() * data.data.length);
      var gifEmbedUrl = data.data[randomgif].embed_url;
      gifEL.src = gifEmbedUrl;
    })
}

const apiKey = 'dLg5M2Mlv8CQ642sfvMyyvV9C1GcK7vg';

// Function to handle idle time
function handleIdleTime() {
  const idleTime = 60000; // 1 minute in milliseconds
  let idleTimer;

  $(document).on("mousemove", () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(displayIdleMeme, idleTime);
  });

  idleTimer = setTimeout(displayIdleMeme, idleTime);
}