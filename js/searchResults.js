// <!-- Date & location -->
  // <div class="localInfo">
  //   <div class="date">Thursday, March 25, 2021</div>
  //   <div class="city">Cypress, CA</div>
  // </div>

  // <div class="weatherInfo">
  //   <!-- Weather image and temperature -->
  //   <div class="weatherDisplay">
  //     <img class="logo" src="img/logo.png" alt="">
  //     10 degree
  //   </div>

  //   <!-- Weather Details -->
  //   <div class="weatherDetail">
  //     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, facere, deserunt soluta, molestias recusandae eius sequi fugiat ad reprehenderit asperiores repellat temporibus distinctio debitis provident est aspernatur architecto? Nobis consequatur doloribus iure molestiae maxime sed tempora vero dolore est voluptas.</p>
  //   </div>
  // </div>

export const deleteSearchResults = () => {
  const parentElement = document.getElementById("main-container");
  let child = parentElement.lastElementChild;
  // console.log(parentElement.childElementCount);
    // console.log("Here!!!");
  while(child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildSearchResults = (weatherInfo) => {
  const mainContainer = document.getElementById("main-container");

  const localInfoDiv = createLocalInfoDiv(weatherInfo);
  const weatherInfoDiv = createWeatherInfoDiv(weatherInfo);

  console.log('Hello!');

  mainContainer.append(localInfoDiv);
  console.log('Hello!');

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
  console.log(localInfoDiv);

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
  console.log(weatherDesc);

  const weatherImgUrl = showWeatherImage(weatherDesc);
  weatherImg.src = weatherImgUrl;
  weatherImg.alt = weatherDesc;

  const temperature = document.createElement("div");
  temperature.classList.add("temperature");

  const temp = weatherInfo.main.temp.toFixed();
  temperature.innerText = `${temp}°`;
  
  const weatherDetail = document.createElement("div");
  weatherDetail.classList.add("weatherDetail"); 

  const feelsLike = document.createElement("div");
  feelsLike.classList.add("feelsLike"); 
  feelsLike.innerText = `Feels Like: ${weatherInfo.main.feels_like.toFixed()}°`;

  const tempHighLow = document.createElement("div");
  tempHighLow.classList.add("tempHighLow"); 
  tempHighLow.innerText = `Temp High / Low: ${weatherInfo.main.temp_max.toFixed()}° / ${weatherInfo.main.temp_min.toFixed()}°`;

  const wind = document.createElement("div");
  wind.classList.add("wind"); 
  wind.innerText = `Wind: ${weatherInfo.wind.speed} mp/h`;

  const humidity = document.createElement("div");
  humidity.classList.add("humidity"); 
  humidity.innerText = `Humidity: ${weatherInfo.main.humidity} %`;

  weatherDisplay.append(weatherImg);
  weatherDisplay.append(temperature);
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

  switch(category) {
    case 'partly':
      url = '../img/partly.webp';
      break;
    case 'sun':
      url = '../img/sun.webp';
      break;
    case 'rain':
      url = '../img/drizzle.webp';
      break;
    case 'wind':
      url = '../img/wind.webp';
      break;
    default:
      url = '../img/cloud.webp';
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

// const createResultImage = (result) => {
//   const resultImage = document.createElement("div");
//   resultImage.classList.add("resultImage");

//   const img = document.createElement("img");
//   img.src = result.img;
//   img.alt = result.title;

//   resultImage.append(img);

//   return resultImage;
// };

// const createResultText = (result) => {
//   const resultText = document.createElement("div");
//   resultText.classList.add("resultText");
  
//   const resultDescription = document.createElement("p");
//   resultDescription.classList.add("resultDescription");
//   resultDescription.textContent = result.text;

//   resultText.append(resultDescription);
  
//   return resultText;
// };

// export const clearStatsLine = () => {
//   document.getElementById("stats").textContent = "";
// };

// export const setStatsLine = (numberOfResults) => {
//   const statLine = document.getElementById('stats');

//   if(numberOfResults) {
//     statLine.textContent = `Displaying ${numberOfResults} results.`;
//   } else {
//     statLine.textContent = "Sorry, no results."
//   }
// }
