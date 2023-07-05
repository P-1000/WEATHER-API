// Select elements from the HTML
const bodyElement = document.body;
const locationElement = document.getElementById("location");
const tempElement = document.getElementById("temp");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

// Function to convert Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
  let celsius = kelvin - 273.15;
  return Math.ceil(celsius);
}

// Function to update current day and time
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const formattedDate = now.toLocaleDateString(undefined, options);
  const formattedTime = now.toLocaleTimeString(undefined, options);

  // Update the HTML elements with the current day and time
  if (dateElement !== null) {
    dateElement.textContent = formattedDate;
  }
  if (timeElement !== null) {
    timeElement.textContent = formattedTime;
  }
}

// Function to set body background image
function setBackgroundImage(imageUrl) {
  bodyElement.style.backgroundImage = `url(${imageUrl})`;
}

// Weather fetching function
// Weather fetching function
const fetchWeather = async () => {
  try {
    // Get the current position of the user
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    const { latitude, longitude } = position.coords;

    const apiKey = "4a440ed568b8454c7f5fd1cc451f6ca5";
    const uapiKey = "3HroJRx-sIURgv-eUs7IsA71YsixIgQVVvhpkSg_OcM"

    // Check if latitude and longitude are available
    if (latitude !== undefined && longitude !== undefined) {
      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      // Fetch weather data from the OpenWeatherMap API
      const response = await fetch(weatherAPI);
      const data = await response.json();
      console.log(data);

      // Extract temperature data from the API response
      const { temp } = data.main;


      // Convert temperature from Kelvin to Celsius
      const celsius = convertKelvinToCelsius(temp);

      // Display the temperature
      if (tempElement !== null) {
        tempElement.textContent = `${celsius}°C`;
      }
      if (locationElement !== null) {
        locationElement.textContent = `${data.name}, ${data.sys.country}`;
      }

      // Get the weather condition
      const weatherCondition = data.weather[0].description.toLowerCase();

      // Get the current hour of the day
      const currentHour = new Date().getHours();
      let timeOfDay = "";

      // Determine the time of day based on the current hour
      if (currentHour >= 5 && currentHour < 12) {
        timeOfDay = "morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = "afternoon";
      } else if (currentHour >= 18 && currentHour < 21) {
        timeOfDay = "evening";
      } else {
        timeOfDay = "night";
      }

      // Modify the weather condition with the time of day
      const modifiedWeatherCondition = `${timeOfDay} ${weatherCondition}`;

      // Fetch image data from the Unsplash API based on the modified weather condition
      try {
        const unsplashAPI = `https://api.unsplash.com/photos/random?query=${modifiedWeatherCondition}&client_id=${uapiKey}`;

        // Fetch image data from the Unsplash API
        const unsplashResponse = await fetch(unsplashAPI);
        const unsplashData = await unsplashResponse.json();
        console.log(unsplashData);
  
        // Extract image URL from the API response
        const imageUrl = unsplashData.urls.full;
      } catch (error) {
        console.log(error)
      }

      // Set the background image
      if (imageUrl) {
        setBackgroundImage(imageUrl);
      }

    } else {
      console.log("Latitude and longitude data is not available.");
    }
  } catch (error) {
  console.debug(error);
    console.log("An error occurred while fetching weather data.");
  }
};


// Call the updateDateTime function initially and every second to keep it up to date
updateDateTime();
setInterval(updateDateTime, 1000);

// Call the fetchWeather function to fetch weather data
fetchWeather();
