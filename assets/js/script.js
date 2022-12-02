var cityNameEl = document.querySelector('#city-name');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var fiveDayHeadingEl = document.querySelector("#five-day-heading");
var forecastEl = document.querySelector('#fiveDayForecast');

let city = "";

//This is the autocomplete for the search bar. 
$(function () {
  var availableCities = [

    "Miami",
    "Cancun",
    "Paris",
    "London",
    "Rio de Janeiro"

  ];
  $("#city").autocomplete({
    source: availableCities
  });
});
function getApi() {
  // fetch request gets a list of currency exchange rate
  var requestURL = 'https://v6.exchangerate-api.com/v6/4fecc15eb9a67c4c01430877/latest/CAD';

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data)


      city = $("#city").val();
      //hard code depending on city chosen to set other variables
      if (city == "Miami") {
        console.log("Miami");
        visitCountry = "United States";
        // setting the currency exchange text for h1 element
        $('#currencyexchange').text("🇨🇦 $ 1 CAD - Canadian Dollar" + " = " + " 🇺🇸 $" + data.conversion_rates.USD.toFixed(2) + " USD - United States Dollar")

      } else if (city == "Cancun") {
        console.log("Cancun");
        visitCountry = "Mexico";
        // setting the currency exchange text for h1 element
        $('#currencyexchange').text("🇨🇦 $ 1 CAD - Canadian Dollar" + " = " + " Mexican $" + data.conversion_rates.MXN.toFixed(2) + " MXN  - Mexican Peso ")
      }
      else if (city == "Paris") {
        console.log("Paris ");
        visitCountry = "France";
        // setting the currency exchange text for h1 element
        $('#currencyexchange').text("🇨🇦 $ 1 CAD - Canadian Dollar" + " = " + " 🇲🇫 $" + data.conversion_rates.EUR.toFixed(2) + " EUR - France Euro")
      }
      else if (city == "London") {
        console.log("london");
        visitCountry = "England";
        // setting the currency exchange text for h1 element
        $('#currencyexchange').text("🇨🇦 $ 1 CAD - Canadian Dollar" + " = " + " 🏴󠁧󠁢󠁥󠁮󠁧󠁿 $" + data.conversion_rates.GBP.toFixed(2) + " GBP - Pound Sterling")
      }
      else if (city == "Rio de Janeiro") {
        console.log("Rio de Janeiro");
        visitCountry = "United States";
        $('#currencyexchange').text("🇨🇦 $ 1 CAD - Canadian Dollar" + " = " + " $" + data.conversion_rates.BRL.toFixed(2) + " BRL - Brazilian Real")
      }

    })
}
// on click function for search
$(".searchBtn").click(function () {
  city = $("#city").val();
  getApi();
  searchButton();
  searchHistory()
});

function searchHistory() {
  var pEl = $("<p>")
  var btnEl = $('<button>');
  btnEl.attr('id', 'extraBtn');
  btnEl.addClass("ui-button ui-widget ui-corner-all");
  btnEl.text(city);
  pEl.append(btnEl);
  $("#search-history").prepend(pEl);


}

/*
********
Second Code Dump from Brian
********
*/

// function displayCurrentWeather(lat, lon, apiKey) {
//   // Calls to the current weather API using the lat and lon gained from the geo-location API
//   var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

//   fetch(currentWeather)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       cityNameEl.textContent = data.name + '   ';
//       var icon = data.weather[0].icon;
//       document.querySelector('#weather-icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
//       tempEl.textContent = 'Current Temperature: ' + data.main.temp + ' ° C';
//       windEl.textContent = 'Current Wind Speed: ' + data.wind.speed + ' kph';
//       humidityEl.textContent = 'Current Humidity: ' + data.main.humidity + ' %';
//     })
// }

function displayForecast(lat, lon, apiKey) {
  // Third fetch now to the 5 day forecast API, again using the lat and lon variables from the geo-location API.
  var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayHeadingEl.textContent = 'Five Day Forecast:';

      /* This if statement removes any of the Five Day forecast elements that existed from a previous search;
      before adding this more would just be added and it would create a longer and longer list for every search.
      Solution found on stackoverflow, posted by Ivan Sivak, found at the following link:
      https://stackoverflow.com/questions/13125817/how-to-remove-elements-that-were-fetched-using-queryselectorall
      */
      if (document.contains(document.querySelector('.dayElement'))) {
        document.querySelectorAll('.dayElement').forEach(e => e.remove());
      }

      /* This loop combs through the results returned from the five-day forecast API and looks for indices
      that have a dt_txt property that ends with 15:00:00. The endsWith function was suggested by tutor
      Alistair Rowden and was unknown to me before the session. It then creates the data for each returned
      index and adds them to the browser, adding the bootstrap class 'col' so that it functions with the
      bootstrap and displays in five columns. Finally, it appends the created dayElement child to the
      forecastEL section in the HTML.
      */
      for (var i = 0; i < data.list.length; i++) {
        var date = data.list[i].dt_txt;
        if (date.endsWith('15:00:00')) {
          var dayElement = document.createElement('div');
          dayElement.textContent = date;
          var image = document.createElement('img');
          var icon = data.list[i].weather[0].icon;
          image.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
          dayElement.appendChild(image);
          var temp = document.createElement('h5');
          var tempReading = data.list[i].main.temp
          temp.textContent = 'Temp: ' + tempReading + ' ° C';
          dayElement.appendChild(temp);
          var wind = document.createElement('h5');
          var windReading = data.list[i].wind.speed
          wind.textContent = 'Wind: ' + windReading + ' kph';
          dayElement.appendChild(wind);
          var humidity = document.createElement('h5');
          var humidityReading = data.list[i].main.humidity
          humidity.textContent = 'Humidity: ' + humidityReading + ' %';
          dayElement.appendChild(humidity);
          dayElement.classList.add('column', 'dayElement')
          forecastEl.appendChild(dayElement);
        }
      }
    })
}

function searchButton() {
  // Pulls the value from the text field of the search bar and adds it into the geo-location API to return coordinates.
  var searchEntry = city;
  var apiKey = 'cf49844e3f54a62c370a39540478245f';
  var geoCoordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchEntry + '&appid=' + apiKey;

  // Throws error to console if searchEntry bar is blank.
  if (!searchEntry) {
    console.error('You need a search input value!');
    return;
  }

  // Fetches from the geo-coordinates API and defines the lat and lon variables.
  fetch(geoCoordinates)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        var lat = data[i].lat;
        // console.log(lat);
        var lon = data[i].lon;
        // console.log(lon);
        var citySearched = data[i].name + ', ' + data[i].state + ', ' + data[i].country;
        /* Each function written above is called here so that the variables generated within this function can
        be passed into the other function and used.
        */
        //displayCurrentWeather(lat, lon, apiKey);
        displayForecast(lat, lon, apiKey);
      }
    })
}

/*
********
End Second Code Dump
********
*/