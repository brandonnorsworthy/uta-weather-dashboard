# uta-weather-dashboard

deployment: https://brandonnorsworthy.github.io/uta-weather-dashboard/

### About
Weather Dashboard using Open Weather API that runs in the browser and features dynamically updated HTML and CSS.

Use the OpenWeather One Call API to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use localStorage to store any persistent data. For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keys.  
  
  
GIVEN a weather dashboard with form inputs  
WHEN I search for a city  
THEN I am presented with current and future conditions for that city and that city is added to the search history  
WHEN I view current weather conditions for that city  
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index  
WHEN I view the UV index  
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe  
WHEN I view future weather conditions for that city  
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity  
WHEN I click on a city in the search history  
THEN I am again presented with current and future conditions for that city  
  
  
search => presented with current and future conditions  
current conditions => city name, date, icon of weather conditions, temp, humidity, wind speed, uv index  
uv index => color indicating favorable, moderate, severe  
future cards => 5 days, date, icon of weather conditions, temp, wind speed, humidity  
search history => when click presented with current and future conditions for that city  