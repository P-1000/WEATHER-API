const btn = document.getElementById("but")
const loc = document.querySelector(".info .location")
const temp = document.querySelector(".box .info .temp");


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
                let {temp_max,temp_min,temp ,} = data.main
              loc.innerHTML=data.name;
                const celsius =  kTc(temp);
                temp.innerHTML=temp_max
                
        } catch (error) {
            console.log(error)
            console.log("error occured")
            console.log("Geolocation is not supported by this browser.");
        }

}
function kTc(kelvin){
  let celsius = kelvin-273.15;
  return Math.ceil(celsius);
}
btn.addEventListener('click',handleSearch)
 