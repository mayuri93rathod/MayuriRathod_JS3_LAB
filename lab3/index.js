const api = {
     key: "7e3f21edee540e6110af347b55eb1ab2",
     base: "https://api.openweathermap.org/data/2.5/weather"
 }

//get search bar element
const inputCity = document.getElementById('searchBar');
console.log(inputCity);

inputCity.addEventListener( "keypress" ,updateValues);

function updateValues( event ){

   // console.log(event);
    if (event.keyCode === 13) {
         console.log("Enter key is pressed");   
         getWeatherInfo(inputCity.value) ;    
         
    }
}

function getWeatherInfo(cityName){
     
     const url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;

     let promise = fetch( url );
     console.log( promise );

     promise.then( ( reponse )=>{
          console.log( reponse );
          return reponse.json();
     } ).then( ( weatherResponse ) => {

          console.log( weatherResponse );
          if( weatherResponse.cod === 200 ){
               //valid city name then display details on html page
               displayWeatherDetails( weatherResponse );
          }//404 not valid city
          else{
               alert( weatherResponse.message );
          }
     })
     .catch( err => console.log(err) );
     
}

function displayWeatherDetails( weatherInfo ){

     console.log( 'updating weather deatils' );

     //getting all elements by id
     const city = document.getElementById( "city" );
     const today_date = document.getElementById( "date" );
     const avgTemp = document.getElementById("avgTemp");
     const weather = document.getElementById("weather");
     const tempRange = document.getElementById("tempRange");

     city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;

     avgTemp.innerText =`${Math.round(weatherInfo.main.temp)} °C `;
     
     today_date.innerText = new Date().toDateString();

     weather.innerText = `${weatherInfo.weather[0].main}`;

     tempRange.innerText = `${Math.round(weatherInfo.main.temp_min)}°c / ${Math.round(weatherInfo.main.temp_max)}°c`;
     
     //console.log(weatherInfo.weather[0].main);
                    
} 