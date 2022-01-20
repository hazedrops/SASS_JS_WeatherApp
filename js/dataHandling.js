export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2, }/gi;

  // Replace multiple spaces in the input into only one space  
  const searchTerm = rawSearchTerm.replaceAll(regex, " "); 
  
  return searchTerm;
};

export const retrieveLatLong = async (searchTerm) => {
  const geoCodeData = getGeoCodeData(searchTerm);
  const geoCodes = await requestData(geoCodeData);

  if(!geoCodes.results.length) {
    console.log("No result found!!!");
  }

  const tempData = geoCodes.results[0].locations[0];

  const lat = tempData.latLng.lat;
  const long = tempData.latLng.lng;

  const weatherSearchString = retrieveWeatherInfo(lat, long);
  const weatherInfo = await requestWeatherData(weatherSearchString);

  return weatherInfo;
};

const getGeoCodeData = (searchTerm) => {  
  const rawSearchString = `http://www.mapquestapi.com/geocoding/v1/address?key=${config.apiKey}&location=${searchTerm}`;


  const searchString = encodeURI(rawSearchString);
  
  return searchString;
}

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

const requestWeatherData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

const retrieveWeatherInfo = (lat, long) => {
  const rawSearchString = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${config.appId}`;

  const searchString = encodeURI(rawSearchString);
  
  return searchString;
}

