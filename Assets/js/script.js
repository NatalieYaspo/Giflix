// var yelpKey = 'RVK-JmMkSbtKeWjTWBPDjP1i8ILSDhhgp5u3TFJ_C7MDQ98aU3Vx0qAp3SlafxNahI4cakCawlnCtqgAbm7mS1g73j_nwd7hUwyfBrP3PGzeOoIDTSgiMkoXj1-UZXYx';

// Function to handle the search by zip code
// function searchByZipCode(zipCode) {
//   console.log(zipCode);
//   // Fetch restaurant data from API based on the zip code
//   $.ajax({
//     url: `https://api.yelp.com/v3/businesses/search?location=${zipCode}&radius=8046&open_now=true&sort_by=best_match&limit=10`,
//     dataType: 'jsonp',
//     header: {
//       "Authorization": `Bearer RVK-JmMkSbtKeWjTWBPDjP1i8ILSDhhgp5u3TFJ_C7MDQ98aU3Vx0qAp3SlafxNahI4cakCawlnCtqgAbm7mS1g73j_nwd7hUwyfBrP3PGzeOoIDTSgiMkoXj1-UZXYx`,
//       // "accept": "application/json",
//       //"Access-Control-Allow-Origin": "*",
//     },
//     method: "GET",
//     success: function (data) {
//       console.log("data: " + data);
//       // Display the restaurant list
//       displayRestaurantList(data);
//     },
//     error: function (error) {
//       console.error("Error:", error);
//     },
//   });
// }

// async function displayListTest(zipCode) {
//   try {
//     const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${zipCode}&radius=8046&open_now=true&sort_by=best_match&limit=10`, {
//       headers: {
//         Authorization: `Bearer ${yelpKey}`,
//       },
//     });
//   }
//   catch (error) {
//     console.error('Error:', error);
//   }
// }
// console.log(displayListTest(28210));


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
const url = 'http://www.omdbapi.com/?type=movie&apikey=b4e4f55f';

// try {
// 	const response = fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

//Event Listeners
formEl.addEventListener("submit", handleSearchFormSubmit);

//Pulls the year that was searched into storage and runs the showMovies function.
function handleSearchFormSubmit(event) {
  event.preventDefault();
  // console.log("search form clicked!"); - works!

  //Removes Hide class once submit button is clicked
  movieDisplay.classList.remove("hide");

  const movieTitleInput = document.getElementById('movieTitleInput').value;
  // console.log('should see movie name, no quotes: ', movieTitleInput); - works

  localStorage.setItem('movieTitle', movieTitleInput);

  if (!movieTitleInput) {
    console.log("You need to enter a movie title!"); //works!
    return;
  }

  showMovies();
}

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
      // console.log(data); //works!
      console.log(data);
      let movieTitle = data.Title
      let releaseYear = data.Year
      let movieRated = data.Rated
      let moviePlot = data.Plot
      let rottenTomatoRating = data.Ratings[1].Value.slice(0, -1)
      let movieGenre = data.Genre
      let movieActors = data.Actors
      let moviePoster = data.Poster
      // console.log(movieTitle, movieRated, moviePlot);//works!!
      // console.log(rottenTomatoRating);//works
      console.log(moviePoster);

      //Shows data on page
      movieTitleEl.textContent = movieTitle;
      releaseYearEl.textContent = releaseYear;
      movieRatedEl.textContent = "Rated: " + movieRated;
      movieGenreEl.textContent = "Genre: " + movieGenre;
      movieActorsEl.textContent = "Main Actors: " + movieActors;
      moviePlotEl.textContent = moviePlot;
      moviePosterEl.src = moviePoster;
      movieRtRatingEl.textContent = rottenTomatoRating + "%";
    }
    )
    displayRatingMeme(rottenTomatoRating);
    
  }


// const handleInputChange = (event) => {
//   const year = event.target.value;
//   console.log(event);
//   localStorage.setItem("year", year);
// };

// zipCodeInput.addEventListener('change', handleInputChange);
// ZipCodeForm.js //REMOVE?
// const ZipCodeForm = () => {
// };

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const year = localStorage.getItem("year");
//   searchByZipCode(year);
//   $("#yearInput").val("");

// zipCodeInput.addEventListener('change', handleInputChange);

// function handleSubmit(event) { - REMOVE???
//   event.preventDefault();
//   // Handle form submission logic here
// }

// function handleInputChange(event) {
//   // Handle input change logic here
// }
// };

// form.addEventListener('submit', handleSubmit);

// const savedZipCode = localStorage.getItem("year");

// const appContainer = document.getElementById("app");

// This will pull all info from API - NEED TO MAKE WORK
// const renderRestaurantSearch = () => {
//   appContainer.innerHTML = `
//         <div>
//           <!-- Other components and content -->
//           <p>Saved ZIP code: ${savedZipCode}</p>
//           <form id="zipCodeForm">
//             <input type="text" id="zipCodeInput" placeholder="Enter ZIP code" />
//             <button type="submit">Save</button>
//           </form>
//           <!-- Other components and content -->
//         </div>
//       `;
// };

// When you click search, this will save zipcode to local storage then calls to render the search.
// const handleFormSubmit = (event) => {
//   event.preventDefault();
//   const zipCodeInput = document.getElementById("yearInput");
//   const zipCode = zipCodeInput.value;
//   localStorage.setItem("year", zipCode);
//   zipCodeInput.value = "";
//   // renderRestaurantSearch(); - NEED TO PUT THIS BACK WHEN IT WORKS
// };

// const zipCodeForm = document.getElementById("zipCodeForm");
// zipCodeForm.addEventListener("submit", handleFormSubmit);

// // renderRestaurantSearch(); - NEED TO PUT THIS BACK WHEN IT WORKS

// // Function to display the restaurant list
// function displayRestaurantList(data) {
//   console.log(data);
//   const restaurantList = $("#restaurant-list");
//   restaurantList.empty();

//   restaurants.forEach((restaurant) => {
//     const listItem = $("<li>").text(restaurant.name);

//     listItem.on("mouseover", () => {
//       displayRatingMeme(restaurant.rating);
//     });

//     restaurantList.append(listItem);
//   });
// }

// Function to display the rating meme/gif
function displayRatingMeme(rating) {
  let memeUrl = "https://media.giphy.com/media/fYqHQ3HMuU1KK2NX0p/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g";
  
  

  switch (rating) {
    case 1:
      memeUrl = "https://media.giphy.com/media/fYqHQ3HMuU1KK2NX0p/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g";
      break;
    case 2:
      memeUrl = "https://example.com/memes/2-star-meme.gif";
      break;
    case 3:
      memeUrl = "https://example.com/memes/3-star-meme.gif";
      break;
    default:
      memeUrl = "https://example.com/memes/default-meme.gif";
      break;
  }

}

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

// Function to display the idle meme
// function displayIdleMeme() {
//   const idleMemeUrl =
//     "https://media.giphy.com/media/fYqHQ3HMuU1KK2NX0p/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g";
//   alert("You are taking too long!\n\n" + idleMemeUrl);
// }

// Example usage
// const zipCode = ""; // Replace with the actual zip code entered by the user
// searchByZipCode(zipCode);
// handleIdleTime();

const MemeContainer = () => {
  const memeContainer = document.createElement("div");
  memeContainer.classList.add("meme-container");

  const img = document.createElement("img");
  img.src =
    "https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g";
  img.alt = "Good Rating Meme";

  const p = document.createElement("p");
  p.textContent = "This movie has a good rating!";

  memeContainer.appendChild(img);
  memeContainer.appendChild(p);

  return memeContainer;
};

// const memes = [
//   { name: "Meme 1", rating: 80, imageURL: "https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g" },
//   { name: "Meme 2", rating: 30, imageURL: "meme2.jpg" },
//   { name: "Meme 3", rating: 60, imageURL: "meme3.jpg" },];
// const above50Memes = [];
// const below50Memes = [];
// memes.forEach((meme) => {
//   if (meme.rating > 50) {
//     above50Memes.push(meme);
//   } else {
//     below50Memes.push(meme);
//   }
// });
// const randomIndex = Math.floor(Math.random() * above50Memes.length);
// const randomMeme = above50Memes[randomIndex];

// Example usage:
// const appContainer = document.getElementById("app");
// appContainer.appendChild(MemeContainer())