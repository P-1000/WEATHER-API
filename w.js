const btn = document.getElementById("but")

let latitude,longitude;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
     console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
    });
  } else{
    console.log("Geolocation is not supported by this browser.");
  }


const handleSearch = async ()=>{
        try {
               const keywe = '4a440ed568b8454c7f5fd1cc451f6ca5'
               const wapi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keywe}`;
               const response = await fetch(wapi);
               const data = await response.json();
               console.log(data)
        } catch (error) {
            console.log(error)
            console.log("error occured")
        }

}

btn.addEventListener('click',handleSearch)
