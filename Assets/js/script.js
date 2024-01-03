var yelpKey = 'RVK-JmMkSbtKeWjTWBPDjP1i8ILSDhhgp5u3TFJ_C7MDQ98aU3Vx0qAp3SlafxNahI4cakCawlnCtqgAbm7mS1g73j_nwd7hUwyfBrP3PGzeOoIDTSgiMkoXj1-UZXYx';

// Function to handle the search by zip code
function searchByZipCode(zipCode) {
  // Fetch restaurant data from API based on the zip code
  $.ajax({
    url: `https://api.yelp.com/v3/businesses/search?location=${zipCode}&radius=8046&open_now=true&sort_by=best_match&limit=10`,
    header: 'Authorization: Bearer RVK-JmMkSbtKeWjTWBPDjP1i8ILSDhhgp5u3TFJ_C7MDQ98aU3Vx0qAp3SlafxNahI4cakCawlnCtqgAbm7mS1g73j_nwd7hUwyfBrP3PGzeOoIDTSgiMkoXj1-UZXYx',
    method: "GET",
    success: function (data) {
      // Display the restaurant list
      displayRestaurantList(data);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

// ZipCodeForm.js
const ZipCodeForm = () => {
  const handleInputChange = (event) => {
    const zipCode = event.target.value;
    localStorage.setItem("zipCode", zipCode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const zipCode = localStorage.getItem("zipCode");
    searchByZipCode(zipCode);
    $("#zipCodeInput").val("");

    const form = document.getElementById('myForm');
    const zipCodeInput = document.getElementById('zipCodeInput');

    form.addEventListener('submit', handleSubmit);
    zipCodeInput.addEventListener('change', handleInputChange);

    function handleSubmit(event) {
      event.preventDefault();
      // Handle form submission logic here
    }

    function handleInputChange(event) {
      // Handle input change logic here
    }
  };
};
const savedZipCode = localStorage.getItem("zipCode");

    const appContainer = document.getElementById("app");

    const renderRestaurantSearch = () => {
      appContainer.innerHTML = `
        <div>
          <!-- Other components and content -->
          <p>Saved ZIP code: ${savedZipCode}</p>
          <form id="zipCodeForm">
            <input type="text" id="zipCodeInput" placeholder="Enter ZIP code" />
            <button type="submit">Save</button>
          </form>
          <!-- Other components and content -->
        </div>
      `;
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const zipCodeInput = document.getElementById("zipCodeInput");
      const zipCode = zipCodeInput.value;
      localStorage.setItem("zipCode", zipCode);
      zipCodeInput.value = "";
      renderRestaurantSearch();
    };

    const zipCodeForm = document.getElementById("zipCodeForm");
    zipCodeForm.addEventListener("submit", handleFormSubmit);

    renderRestaurantSearch();

// Function to display the restaurant list
function displayRestaurantList(restaurants) {
  const restaurantList = $("#restaurant-list");
  restaurantList.empty();

  restaurants.forEach((restaurant) => {
    const listItem = $("<li>").text(restaurant.name);

    listItem.on("mouseover", () => {
      displayRatingMeme(restaurant.rating);
    });

    restaurantList.append(listItem);
  });
}

// Function to display the rating meme/gif
function displayRatingMeme(rating) {
  let memeUrl;

  switch (rating) {
    case 1:
      memeUrl = "https://example.com/memes/1-star-meme.gif";
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

  alert(`Average Rating: ${rating}\n\n${memeUrl}`);
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
function displayIdleMeme() {
  const idleMemeUrl =
    "https://media.giphy.com/media/fYqHQ3HMuU1KK2NX0p/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g";
  alert("You are taking too long!\n\n" + idleMemeUrl);
}

// Example usage
const zipCode = "12345"; // Replace with the actual zip code entered by the user
searchByZipCode(zipCode);
handleIdleTime();

const MemeContainer = () => {
  const memeContainer = document.createElement("div");
  memeContainer.classList.add("meme-container");

  const img = document.createElement("img");
  img.src =
    "https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g";
  img.alt = "Good Rating Meme";

  const p = document.createElement("p");
  p.textContent = "This restaurant has a good rating!";

  memeContainer.appendChild(img);
  memeContainer.appendChild(p);

  return memeContainer;
};

// Example usage:
// const appContainer = document.getElementById("app");
appContainer.appendChild(MemeContainer());