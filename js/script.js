'use strict';

import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";
// import { deleteSearchResults, buildSearchResults } from "./searchResults.js";
import { deleteSearchResults, buildSearchResults } from "./searchResults.js";
import { getSearchTerm, retrieveLatLong } from "./dataHandling.js";

document.addEventListener("readystatechange", (event) => {
  if(event.target.readyState === 'complete') {
    initApp();
    console.log(event.target.readyState)
  }
});

const initApp = () => {
  // Set the focus
  setSearchFocus();

  // 3 listeners clear text
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);

  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
}

// Procedural "workflow" function 
const submitTheSearch = (event) => {
  event.preventDefault();
  
  // Delete search results
  deleteSearchResults();

  // Process the search
  processTheSearch();

  // // Set the focus
  // setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  const searchTerm = getSearchTerm();

  // console.log("here", searchTerm);
  
  if (searchTerm === "") {
    setSearchFocus();
    return;
  } 

  const weatherInfo = await retrieveLatLong(searchTerm);
  console.log(weatherInfo);


  // If there are any results, build search results
  if(!weatherInfo) return;
  
  buildSearchResults(weatherInfo);

  
};