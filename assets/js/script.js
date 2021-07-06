// HTML Variables
var citySearchFormEl = $(`#citySearchForm`);
var searchInputEl = $(`#searchInput`);
var foreCastContainer = $(`#foreCastContainer`);
var previousSearchesEl = $(`#previousSearches`);

// Global Variables
var openWeatherAppId = `2c4a921d55c896205bdca23294d0393d`;

// search => presented with current and future conditions
// search history => when click presented with current and future conditions for that city
function searchInput(event) {
    event.preventDefault()
    callCurrentWeatherDataAPI(searchInputEl.val())
}

function callCurrentWeatherDataAPI(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${openWeatherAppId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data.coord.lon, data.coord.lat);
        cityName = data.name;
        // console.log(`callCurrentWeatherDataAPI: `, cityName);
        callOneCallAPI(cityName, data.coord.lon, data.coord.lat);
        displayPreviousSearches(cityName, false);
        })
    .catch(error => {
        console.error('Error:', error);
    });

    return;
}

function callOneCallAPI(cityName, longitude, latitude) {
    var url = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lon=${longitude}&lat=${latitude}&appid=${openWeatherAppId}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
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

    // uv index => color indicating favorable, moderate, severe
    if (currentWeather.uvi > 6) {
        $(`#currentWeatherUV`).css(`background`, `#aa2020`)
    } else if (currentWeather.uvi > 4) {
        $(`#currentWeatherUV`).css(`background`, `#aa6a20`)
    } else {
        $(`#currentWeatherUV`).css(`background`, `#40aa20`)
    }

    $(`#cityWeatherContainer`).css(`display`, `block`)
}

function displayWeekForecast(forecastData) {
    // future cards => 5 days, date, icon of weather conditions, temp, wind speed, humidity
    //5 days
    foreCastContainer.html(``);
    for (let index = 1; index <= 5; index++) {
        var divEl = $(`
        <div class="foreCastCard">
        <p style="font-weight: 800">${moment().clone().add(index,'days').format(`M/D/YYYY`)}</p>
        <img src="http://openweathermap.org/img/wn/${forecastData[index].weather[0].icon}.png" alt="forcast day icon">
        <p>Temp: ${forecastData[index].temp.day}°F</p>
        <p>Wind: ${forecastData[index].wind_speed}MPH</p>
        <p>Humidity: ${forecastData[index].humidity}%</p>
        </div>`)
        divEl.appendTo(foreCastContainer)
    }
}

function displayPreviousSearches(cityName, initialStart) {
    var matchFound = false;
    $('#previousSearches').children('').each(function(i) {
        if (cityName == $(this).text()) {
            matchFound = true;
            return;
        }
    });
    if (matchFound) {return;}

    var buttonEl = $(`<button type="button" class="col-12 mt-3 btn btn-secondary">${cityName}</button>`)
    buttonEl.on(`click`, previousButtonClick);
    buttonEl.prependTo(previousSearchesEl);

    if (!initialStart) {savePreviousData(cityName)};
}

function savePreviousData(cityName) {
    tempItem = JSON.parse(localStorage.getItem(`previousSearches`))
    console.log(`showing TempItem: `, tempItem)
    if (tempItem != null) {
        console.log(`adding new item: `, tempItem.concat(cityName));
        localStorage.setItem(`previousSearches`, JSON.stringify(tempItem.concat(cityName)))
    } else {
        tempArr = [cityName];
        console.log(`else saving: `, tempArr);
        localStorage.setItem(`previousSearches`, JSON.stringify(tempArr))
    }
}

function previousButtonClick(event) {
    callCurrentWeatherDataAPI(event.target.innerHTML)
}

function init() {
    citySearchFormEl.submit(searchInput)
    tempArr = JSON.parse(localStorage.getItem(`previousSearches`))
    if (tempArr != null){
        for (let index = 0; index < tempArr.length; index++) {
            displayPreviousSearches(tempArr[index], true)
        }
    }
}

init()