'use strict';

import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";
import { deleteSearchResults, buildSearchResults } from "./searchResults.js";
import { getSearchTerm, retrieveLatLong } from "./dataHandling.js";

document.addEventListener("readystatechange", (event) => {
  if(event.target.readyState === 'complete') {
    initApp();
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

  const mode = document.getElementById("mode");
  mode.addEventListener("click", convertMode);  
}

// Procedural "workflow" function 
const submitTheSearch = (event) => {
  event.preventDefault();
  
  // Delete search results
  deleteSearchResults();

  // Process the search
  processTheSearch();

  // Set the focus
  setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  const searchTerm = getSearchTerm();
  
  if (searchTerm === "") {
    setSearchFocus();
    return;
  } 

  const weatherInfo = await retrieveLatLong(searchTerm);

  // If there are any results, build search results
  if(!weatherInfo) return;
  
  buildSearchResults(weatherInfo);
};

const convertMode = (event) => {
  event.preventDefault();

  const mode = sliceDegreeSign();

  makeConversion(mode);

  setSearchFocus();
};

export const sliceDegreeSign = () => {
  const tempModeValue = document.getElementById("mode").innerText;
  const modeValue = tempModeValue.slice(-1);

  return modeValue;
}

const makeConversion = (modeValue) => {
  switch(modeValue){
    case 'C':
      // Change the C -> F   
      const modeSelector1 = document.getElementById("modeSelector");
      modeSelector1.innerText = "°F"
      deleteSearchResults();
      processTheSearch();
      break;

    case 'F':
      // Change the F -> C
      const modeSelector2 = document.getElementById("modeSelector");
      modeSelector2.innerText = "°C"
      deleteSearchResults();
      processTheSearch();
      break;

    default:
  }

};  

// When the logo image is clicked, refresh the page
const refreshPage = (event) => {
  event.preventDefault();
  window.location.reload();
}

const logo = document.getElementById("logo");
logo.addEventListener("click", refreshPage);

