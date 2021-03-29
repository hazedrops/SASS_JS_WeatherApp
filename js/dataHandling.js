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

  let resultArray = [];

  const lat = tempData.latLng.lat;
  const long = tempData.latLng.lng;

  const weatherSearchString = retrieveWeatherInfo(lat, long);
  const weatherInfo = await requestWeatherData(weatherSearchString);

  return weatherInfo;
};

const getGeoCodeData = (searchTerm) => {
  // const maxChars = getMaxChars();

  const rawSearchString = `http://www.mapquestapi.com/geocoding/v1/address?key=Pzhrs2ylWGmTmpobTAkxGdGaVrdCIfhU&location=${searchTerm}`;

  const searchString = encodeURI(rawSearchString);
  
  return searchString;
}

// const getMaxChars = () => {
//   const width = window.innerWidth || document.body.clientWidth;
//   let maxChars;

//   if(width < 414) maxChars = 65;
//   if(width >= 414 && width < 1400) maxChars = 100;
//   if(width >= 1400) maxChars = 130;

//   return maxChars;
// }

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
    // console.log('response', response);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

const retrieveWeatherInfo = (lat, long) => {
  const rawSearchString = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=90bd2e2238cfe623292dac7d2a084e2a`;

  const searchString = encodeURI(rawSearchString);
  
  return searchString;
}

// const processWikiResults = (results) => {
//   const resultArray = [];

//   Object.keys(results).forEach(key => {
//     const id = key;
//     const title = results[key].title;
//     const text = results[key].extract;
//     const img = results[key].hasOwnProperty("thumbnail") 
//       ? results[key].thumbnail.source
//       : null; 
    
//     const item = {
//       id: id,
//       title: title,
//       img: img,
//       text: text
//     };

//     resultArray.push(item);
//   });
  
//   return resultArray;
// }
