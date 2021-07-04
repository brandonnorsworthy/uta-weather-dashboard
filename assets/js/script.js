
// Global Variables
var openWeatherAppId = `2c4a921d55c896205bdca23294d0393d`

// search => presented with current and future conditions
// uv index => color indicating favorable, moderate, severe

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
        console.log(`callOneCallAPI: `, data);
        displayCurrentWeather(cityName, data.current);
        displayWeekForecast(data.daily)
    });
}

function displayCurrentWeather(cityName, currentWeather) {
    // current conditions => city name, date, icon of weather conditions, temp, humidity, wind speed, uv index
    $(`#currentWeatherName`).html(cityName); //city name
    $(`#currentWeatherDate`).html(moment().format(`M/D/YYYY`)) //date
    $(`#currentWeatherIcon`).attr(`src`, `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`); //icon of weather conditions
    $(`#currentWeatherTemp`).html(currentWeather.temp) //temp
    $(`#currentWeatherHumidity`).html(currentWeather.humidity) //humidity
    $(`#currentWeatherWind`).html(currentWeather.wind_speed) //windspeed
    $(`#currentWeatherUV`).html(currentWeather.uvi) //uv index
    if (currentWeather.uvi > 10) {
        $(`#currentWeatherUV`).css(`background`, `#aa2020`)
    } else if (currentWeather.uvi > 5) {
        $(`#currentWeatherUV`).css(`background`, `#aa6a20`)
    } else {
        $(`#currentWeatherUV`).css(`background`, `#40aa20`)
    }

    $(`#cityWeatherContainer`).css(`display`, `block`)
}

function displayWeekForecast(forecastData) {
    // future cards => 5 days, date, icon of weather conditions, temp, wind speed, humidity
    //5 days
    for (let index = 1; index <= 5; index++) {
        //date
        console.log(`date: `, moment().clone().add(index,'days').format(`M/D/YYYY`))
        //icon of weather
        console.log(`icon: `, `http://openweathermap.org/img/wn/${forecastData[index].weather[0].icon}.png`)
        //temp
        console.log(`temp: `, forecastData[index].temp.day)
        //wind speed
        console.log(`wind speed: `, forecastData[index].wind_speed)
        //humdity
        console.log(`humidity: `, forecastData[index].humidity)
        createForecastCardElement()
    }
}

function createForecastCardElement(date, icon, temp, wind, humidity) {
    document.createElement(`div`);
}

callCurrentWeatherDataAPI(`new york`)