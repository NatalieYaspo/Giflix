// Function to handle the search by zip code
function searchByZipCode(zipCode) {
    // Fetch restaurant data from API based on the zip code
    fetch(`https://api.example.com/restaurants?zip=${zipCode}`)
        .then(response => response.json())
        .then(data => {
            // Display the restaurant list
            displayRestaurantList(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
}
// ZipCodeForm.js

import React, { useState } from "react";

const ZipCodeForm = () => {
  const [zipCode, setZipCode] = useState("");

  const handleInputChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save zip code to local storage
    localStorage.setItem("zipCode", zipCode);

    // Clear the input field
    setZipCode("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={zipCode}
        onChange={handleInputChange}
        placeholder="Enter ZIP code"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ZipCodeForm;

// RestaurantSearch.js

import React from "react";
import ZipCodeForm from "./ZipCodeForm";

const RestaurantSearch = () => {
  const savedZipCode = localStorage.getItem("zipCode");

  // ...

  return (
    <div>
      {/* Other components and content */}
      <p>Saved ZIP code: {savedZipCode}</p>
      <ZipCodeForm />
      {/* Other components and content */}
    </div>
  );
};

export default RestaurantSearch;

// Function to display the restaurant list
function displayRestaurantList(restaurants) {
    // Clear previous results
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = '';

    // Iterate over the restaurants
    restaurants.forEach(restaurant => {
        // Create a list item for each restaurant
        const listItem = document.createElement('li');
        listItem.textContent = restaurant.name;

        // Add event listener for displaying the rating meme/gif
        listItem.addEventListener('mouseover', () => {
            displayRatingMeme(restaurant.rating);
        });

        // Append the list item to the restaurant list
        restaurantList.appendChild(listItem);
    });
}

// Function to display the rating meme/gif
function displayRatingMeme(rating) {
    let memeUrl;

    // Determine the meme/gif based on the rating
    switch (rating) {
        case 1:
            memeUrl = 'https://example.com/memes/1-star-meme.gif';
            break;
        case 2:
            memeUrl = 'https://example.com/memes/2-star-meme.gif';
            break;
        case 3:
            memeUrl = 'https://example.com/memes/3-star-meme.gif';
            break;
        // Add more cases for other ratings

        default:
            memeUrl = 'https://example.com/memes/default-meme.gif';
            break;
    }

    // Display the meme/gif in an alert
    alert(`Average Rating: ${rating}\n\n${memeUrl}`);
}

// Function to handle idle time
function handleIdleTime() {
    const idleTime = 60000; // 1 minute in milliseconds

    let idleTimer;

    // Reset the idle timer on user activity
    document.addEventListener('mousemove', () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(displayIdleMeme, idleTime);
    });

    // Start the idle timer initially
    idleTimer = setTimeout(displayIdleMeme, idleTime);
}

// Function to display the idle meme
function displayIdleMeme() {
    const idleMemeUrl = 'https://media.giphy.com/media/fYqHQ3HMuU1KK2NX0p/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g';
    alert('You are taking too long!\n\n' + idleMemeUrl);
}

// Example usage
const zipCode = '12345'; // Replace with the actual zip code entered by the user
searchByZipCode(zipCode);
handleIdleTime();


import React from "react";
import "./MemeContainer.css";

const MemeContainer = () => {
    return (
        <div className="meme-container">
            <img src="https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif?cid=ecf05e4722af56fabb2783439d698fc7f375e47dce9eb261&ep=v1_user_favorites&rid=giphy.gif&ct=g" alt="Good Rating Meme" />
            <p>This restaurant has a good rating!</p>
        </div>
    );
};

export default MemeContainer;