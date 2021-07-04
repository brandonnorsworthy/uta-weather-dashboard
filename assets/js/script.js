
// Global Variables
var openWeatherAppId = `2c4a921d55c896205bdca23294d0393d`

// search => presented with current and future conditions
// uv index => color indicating favorable, moderate, severe
// future cards => 5 days, date, icon of weather conditions, temp, wind speed, humidity
// search history => when click presented with current and future conditions for that city

//? current weather data
//? https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&appid=2c4a921d55c896205bdca23294d0393d
//? one call
//? https://api.openweathermap.org/data/2.5/onecall?q=houston&units=imperial&appid=2c4a921d55c896205bdca23294d0393d

function callCurrentWeatherDataAPI(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${openWeatherAppId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data.coord.lon, data.coord.lat);
        cityName = data.name;
        // console.log(`callCurrentWeatherDataAPI: `, cityName);
        callOneCallAPI(cityName, data.coord.lon, data.coord.lat);
    });

    return;
}

function callOneCallAPI(cityName, longitude, latitude) {
    var url = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lon=${longitude}&lat=${latitude}&appid=${openWeatherAppId}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(`callOneCallAPI: `, data);
        displayCurrentWeather(cityName, data.current);
    });
}

function displayCurrentWeather(cityName, currentWeather) {
    // console.log(`displayCurrentWeather: `, currentWeather);
    // current conditions => city name, date, icon of weather conditions, temp, humidity, wind speed, uv index
    //city name
    console.log(`City Name: `, cityName);
    //date
    console.log(`Date: `, moment().format(`M/D/YYYY`));
    //icon of weather conditions
    // var imgEl = document.createElement(`img`);
    // imgEl.setAttribute(`src`, `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`);
    // document.querySelector(`body`).appendChild(imgEl)
    //temp
    console.log(`Temp: `, currentWeather.temp);
    //humidity
    console.log(`Humidity: `, currentWeather.humidity);
    //windspeed
    console.log(`Wind Speed: `, currentWeather.wind_speed);
    //uv index
    console.log(`UV: `, currentWeather.uvi);
}

callCurrentWeatherDataAPI(`new york`)