
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
    $(`#currentWeatherName`).html(cityName);
    // console.log(`City Name: `, cityName);
    //date
    $(`#currentWeatherDate`).html(moment().format(`M/D/YYYY`))
    // console.log(`Date: `, moment().format(`M/D/YYYY`));
    //icon of weather conditions
    $(`#currentWeatherIcon`).attr(`src`, `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`);
    // document.querySelector(`body`).appendChild(imgEl)
    //temp
    $(`#currentWeatherTemp`).html(currentWeather.temp)
    // console.log(`Temp: `, currentWeather.temp);
    //humidity
    $(`#currentWeatherHumidity`).html(currentWeather.humidity)
    // console.log(`Humidity: `, currentWeather.humidity);
    //windspeed
    $(`#currentWeatherWind`).html(currentWeather.wind_speed)
    // console.log(`Wind Speed: `, currentWeather.wind_speed);
    //uv index
    $(`#currentWeatherUV`).html(currentWeather.uvi)
    if (currentWeather.uvi > 10) {
        $(`#currentWeatherUV`).css(`background`, `#aa2020`)
    } else if (currentWeather.uvi > 5) {
        $(`#currentWeatherUV`).css(`background`, `#aa6a20`)
    } else {
        $(`#currentWeatherUV`).css(`background`, `#40aa20`)
    }
    // console.log(`UV: `, currentWeather.uvi);

    $(`#cityWeatherContainer`).css(`display`, `block`)
}

callCurrentWeatherDataAPI(`new york`)