window.addEventListener("load", () => {
  let long, lat;
  let description = document.querySelector(".description");
  let degree = document.querySelector(".degree");
  let timezone = document.querySelector(".timezone");
  let degreeSection = document.querySelector(".degree-section");

  const degreeSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // Allow users to make request from the local host
      const proxy = "http://cors-anywhere.herokuapp.com/"; 

      const api = `${proxy}https://api.darksky.net/forecast/78ecc83c35ed6e1bcae1ddcd0ba15876/${lat},${long}`;

      fetch(api) // Getting information from the url
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently; // Same as data.currently.temperature & data.currently.summary

          // Set DOM elements from the API
          degree.textContent = temperature;
          description.textContent = summary;
          timezone.textContent = data.timezone;

          // Formula for celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcons(icon, document.querySelector("#icon"));

          // Change temperature to Celsius/Farenheit
          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "F") {
              degreeSpan.textContent = "C";
              degree.textContent = parseFloat(celsius).toFixed(2);
            } else {
              degreeSpan.textContent = "F";
              degree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Please allow the system to know your position!";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // Replace every '-' in the data 'icon' into the '_' and make it upper case

    skycons.play(); // Animates skycons
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
