import { sliceDegreeSign } from "./script.js";
  

export const deleteSearchResults = () => {
  const parentElement = document.getElementById("main-container");
  let child = parentElement.lastElementChild;
  
  while(child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildSearchResults = (weatherInfo) => {
  const mainContainer = document.getElementById("main-container");

  const localInfoDiv = createLocalInfoDiv(weatherInfo);
  const weatherInfoDiv = createWeatherInfoDiv(weatherInfo);

  mainContainer.append(localInfoDiv);
  mainContainer.append(weatherInfoDiv);

  return mainContainer;
};

const createLocalInfoDiv = (weatherInfo) => {
  const localInfoDiv = document.createElement("div");
  localInfoDiv.classList.add("localInfoDiv");

  const dateDiv = document.createElement("div");
  dateDiv.classList.add("dateDiv");
  const dateSpan = document.createElement("span");
  dateSpan.classList.add("dateSpan");

  const dt = weatherInfo.dt;
  const tempDate = new Date(+dt * 1000);
  const date = tempDate.toDateString();

  dateSpan.innerText = date;

  dateDiv.append(dateSpan);  
  localInfoDiv.append(dateDiv);

  const cityDiv = document.createElement("div");
  cityDiv.classList.add("cityDiv");

  const city = weatherInfo.name;
  cityDiv.innerText = city;
  
  localInfoDiv.append(cityDiv);

  return localInfoDiv;
};

const createWeatherInfoDiv = (weatherInfo) => {
  const weatherInfoDiv = document.createElement("div");
  weatherInfoDiv.classList.add("weatherInfoDiv");

  const weatherDisplay = document.createElement("div");
  weatherDisplay.classList.add("weatherDisplay");

  const weatherImg = document.createElement("img");
  weatherImg.classList.add("weatherImg");
  weatherImg.setAttribute = ("id", "weatherImg");

  const weatherDesc = weatherInfo.weather[0].main;

  const weatherImgUrl = showWeatherImage(weatherDesc);
  weatherImg.src = weatherImgUrl;
  weatherImg.alt = weatherDesc;

  const temperatureDiv = document.createElement("div");
  temperatureDiv.classList.add("temperatureDiv");

  const temp = weatherInfo.main.temp.toFixed();
  const temperature = processTempByMode(temp);
  temperatureDiv.innerText = `${temperature}°`;
  
  const weatherDetail = document.createElement("div");
  weatherDetail.classList.add("weatherDetail"); 

  const feelsLike = document.createElement("div");
  feelsLike.classList.add("feelsLike"); 
  const feelsLikeTemp = processTempByMode(weatherInfo.main.feels_like);
  feelsLike.innerText = `Feels Like: ${feelsLikeTemp}°`;

  const tempHighLow = document.createElement("div");
  tempHighLow.classList.add("tempHighLow"); 
  const tempTextSpan = document.createElement("span");
  tempTextSpan.classList.add("tempTextSpan");
  const tempDegreeSpan = document.createElement("span");
  tempDegreeSpan.classList.add("tempDegreeSpan");
  const highTemp = processTempByMode(weatherInfo.main.temp_max);
  const lowTemp = processTempByMode(weatherInfo.main.temp_min);
  tempTextSpan.innerText = "Temp High / Low: ";
  tempDegreeSpan.innerText = `${highTemp}° / ${lowTemp}°`;

  const wind = document.createElement("div");
  wind.classList.add("wind"); 
  wind.innerText = `Wind: ${weatherInfo.wind.speed} mp/h`;

  const humidity = document.createElement("div");
  humidity.classList.add("humidity"); 
  humidity.innerText = `Humidity: ${weatherInfo.main.humidity} %`;

  weatherDisplay.append(weatherImg);
  weatherDisplay.append(temperatureDiv);
  tempHighLow.append(tempTextSpan);
  tempHighLow.append(tempDegreeSpan);
  weatherDetail.append(feelsLike);
  weatherDetail.append(tempHighLow);
  weatherDetail.append(wind);
  weatherDetail.append(humidity);
  weatherInfoDiv.append(weatherDisplay);
  weatherInfoDiv.append(weatherDetail);

  return weatherInfoDiv;
};

const showWeatherImage = (weatherDesc) => {
  const category = categorize(weatherDesc);
  let url='';

  // switch(category) {
  //   case 'partly':
  //     url = '../img/partly.webp';
  //     break;
  //   case 'sun':
  //     url = '../img/sun.webp';
  //     break;
  //   case 'rain':
  //     url = '../img/rain.webp';
  //     break;
  //   case 'wind':
  //     url = '../img/wind.webp';
  //     break;
  //   default:
  //     url = '../img/cloud.webp';
  //     break;
  // }

  switch(category) {
    case 'partly':
      url = '../WeatherApp/img/partly.webp';
      break;
    case 'sun':
      url = '../WeatherApp/img/sun.webp';
      break;
    case 'rain':
      url = '../WeatherApp/img/rain.webp';
      break;
    case 'wind':
      url = '../WeatherApp/img/wind.webp';
      break;
    default:
      url = '../WeatherApp/img/cloud.webp';
      break;
  }


  return url;
}

const categorize = (str) => {
  const string = str.toLowerCase();

  if(string.includes('sun') && string.includes('partly')) {
    return 'partly';
  } else if (string.includes('sun') || string.includes('clear')) {
    return 'sun';
  } else if (string.includes('cloud')){
    return 'cloud';
  } else if (string.includes('rain')){
    return 'rain';  
  } else if (string.includes('wind')) {
    return 'wind';
  }
}

const processTempByMode = (tempStr) => {
  const modeSelector = document.getElementById("modeSelector");

  const mode = sliceDegreeSign(modeSelector.innerText);

  if(mode === 'C') {
    const intTemp = parseInt(tempStr);
    const longTemp = (intTemp - 32) * 5 / 9;
    const temp = longTemp.toFixed();
    return temp;
  } else return tempStr;
}
