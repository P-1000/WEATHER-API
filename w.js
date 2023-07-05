// Select elements from the HTML
const loc = document.querySelector(".info .location");
const tempElement = document.querySelector(".box .info .temp");

// Function to convert Kelvin to Celsius
function kTc(kelvin) {
  let celsius = kelvin - 273.15;
  return Math.ceil(celsius);
}

// Weather fetching function
const handleSearch = async () => {
  try {
    const keywe = "4a440ed568b8454c7f5fd1cc451f6ca5";

    // Check if latitude and longitude are available
    if (latitude !== undefined && longitude !== undefined) {
      const wapi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keywe}`;

      // Fetch weather data from the OpenWeatherMap API
      const response = await fetch(wapi);
      const data = await response.json();
      console.log(data);

      // Extract temperature data from the API response
      let { temp_max, temp_min, temp } = data.main;

      // Display location name
      loc.innerHTML = data.name;

      // Convert temperature from Kelvin to Celsius
      const celsius = kTc(temp);

      // Display the maximum temperature
      tempElement.innerHTML = celsius;
    } else {
      console.log("Latitude and longitude data is not available.");
    }
  } catch (error) {
    console.log(error);
    console.log("An error occurred.");
  }
};

// Check if geolocation is supported by the browser
if (navigator.geolocation) {
  // Get the user's current position
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
    setTimeout(() => {
      handleSearch();
    }, 100);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}


// Function to update current day and time
function updateDateTime() {
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");

  // Get the current date and time
  const now = new Date();
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = now.toLocaleDateString(undefined, options);
  const formattedTime = now.toLocaleTimeString(undefined, options);

  // Update the HTML elements with the current day and time
  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}

// Call the updateDateTime function initially and every second to keep it up to date
setInterval(updateDateTime, 1000);
