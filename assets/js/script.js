var cityNameEl = document.querySelector('#city-name');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var fiveDayHeadingEl = document.querySelector("#five-day-heading");
var forecastEl = document.querySelector('#fiveDayForecast');
var locationPictureEL = document.querySelector('#location-picture-display')
var languagePref = localStorage.getItem("language");
let city = "";
console.log(languagePref)
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

// on click function for search
$(".searchBtn").click(function () {
  city = $("#city").val();
  if (!city) {
    return;
  }
  currencyExchange();
  searchButton();
  searchHistory();
  $("#city").val("");
});

// // Language modal 
// $( function() {
//   $( "#dialog-confirm" ).dialog({
//     resizable: false,
//     height: "auto",
//     width: 400,
//     modal: true,
//     buttons: {
//       "English": function() {
//         languagePref = "English";
//         localStorage.setItem("language", languagePref);
//         $( this ).dialog( "close" );
//       },
//       "French": function() {
//         languagePref = "French";
//         localStorage.setItem("language", languagePref);
//         $( this ).dialog( "close" );
//         console.log("I hate french");
//         window.location.href = 'https://google.ca/'
//       }
//     }
//   });
// } );


//Function to add the previously searched cities
function searchHistory() {
  var pEl = $("<p>")
  var btnEl = $('<button>');
  btnEl.attr('id', 'extraBtn');
  btnEl.addClass("ui-button ui-widget ui-corner-all");
  btnEl.text(city);
  pEl.append(btnEl);
  $("#search-history").prepend(pEl);

  //function to change to the selected city when a previously searched city is clicked.
  $("#extraBtn").on("click", function () {
    city = $(this).text();
    console.log(city)
    currencyExchange();
    searchButton();
  });


}

city = $("#city").val();

function currencyExchange() {
  // fetch request gets a list of currency exchange rate
  var requestURL = 'https://v6.exchangerate-api.com/v6/4fecc15eb9a67c4c01430877/latest/CAD';
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //hard code depending on city chosen to set other variables
      var picClass = locationPictureEL.classList
      var picClassList = ['miami-image', 'cancun-image', 'london-image', 'rio-image', 'paris-image'];
      if (city == "Miami") {
        console.log("Miami");

        // setting the currency exchange text for h1 element

        // $('#currencyexchange').text(" $ 1 CAD - Canadian Dollar" + " = " + " $" + data.conversion_rates.USD.toFixed(2) + " USD - United States Dollar")
        document.getElementById('currencyexchange').innerHTML = ('<img src="assets/flag-icon/Canada.png" class="icon">' + " $ 1 CAD - Canadian Dollar" + " = " + " $" + data.conversion_rates.USD.toFixed(2) + " USD - United States Dollar" + '<img src="assets/flag-icon/USA.png" class="icon">')
        document.getElementById('currencyexchange').classList.add('currency-display', 'is-size-2');

        if (picClass != 'miami-image') {
          picClass.remove(...picClassList);
        }
        locationPictureEL.classList.add('miami-image');
      }
      else if (city == "Cancun") {
        console.log("Cancun");

        // setting the currency exchange text for h1 element
        document.getElementById('currencyexchange').innerHTML = ('<img src="assets/flag-icon/Canada.png" class="icon">' + " $ 1 CAD - Canadian Dollar" + " = " + " Mexican $" + data.conversion_rates.MXN.toFixed(2) + " MXN  - Mexican Peso " + '<img src="assets/flag-icon/Mexico.png" class="icon">')
        document.getElementById('currencyexchange').classList.add('currency-display', 'is-size-2');

        if (picClass != 'cancun-image') {
          picClass.remove(...picClassList);
        }
        locationPictureEL.classList.add('cancun-image');
      }
      else if (city == "Paris") {
        console.log("Paris ");
        // setting the currency exchange text for h1 element
        document.getElementById('currencyexchange').innerHTML = ('<img src="assets/flag-icon/Canada.png" class="icon">' + " $ 1 CAD - Canadian Dollar" + " = " + "$" + data.conversion_rates.EUR.toFixed(2) + " EUR - Euro" + '<img src="assets/flag-icon/France.png" class="icon">')
        document.getElementById('currencyexchange').classList.add('currency-display', 'is-size-2');

        if (picClass != 'paris-image') {
          picClass.remove(...picClassList);
        }
        locationPictureEL.classList.add('paris-image');
      }
      else if (city == "London") {
        console.log("london");
        // setting the currency exchange text for h1 element
        document.getElementById('currencyexchange').innerHTML = ('<img src="assets/flag-icon/Canada.png" class="icon">' + "$ 1 CAD - Canadian Dollar" + " = " + "$" + data.conversion_rates.GBP.toFixed(2) + " GBP - Pound Sterling" + '<img src="assets/flag-icon/England.png" class="icon">')
        document.getElementById('currencyexchange').classList.add('currency-display', 'is-size-2');

        if (picClass != 'london-image') {
          picClass.remove(...picClassList);
        }
        locationPictureEL.classList.add('london-image');
      }
      else if (city == "Rio de Janeiro") {
        console.log("Rio de Janeiro");
        visitCountry = "Brasil";
        // setting the currency exchange text for h1 element
        document.getElementById('currencyexchange').innerHTML = ('<img src="assets/flag-icon/Canada.png" class="icon">' + " $ 1 CAD - Canadian Dollar" + " = " + " $" + data.conversion_rates.BRL.toFixed(2) + " BRL - Brazilian Real" + '<img src="assets/flag-icon/Brazil.png" class="icon">')
        document.getElementById('currencyexchange').classList.add('currency-display', 'is-size-2');
        if (picClass != 'rio-image') {
          picClass.remove(...picClassList);
        }
        locationPictureEL.classList.add('rio-image');
      }
    })
}

//function to get five day forecast using the lat and lon from the geo api
function displayForecast(lat, lon, apiKey) {
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
      index and adds them to the browser, adding the bulma class 'column' so that it functions with the
      bulma CSS and displays in five columns. Finally, it appends the created dayElement child to the
      forecastEL section in the HTML.
      */
      for (var i = 0; i < data.list.length; i++) {
        var date = data.list[i].dt_txt;
        if (date.endsWith('15:00:00')) {
          var dayElement = document.createElement('div');
          dayElement.textContent = date;
          var image = document.createElement('img');
          image.classList.add('weather-icon');
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
          dayElement.classList.add('column', 'dayElement', 'forecast-display-colour')
          forecastEl.appendChild(dayElement);
        }
      }
    })
}
// Pulls the value from the text field of the search bar and adds it into the geo-location API to return coordinates.
function searchButton() {

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
        displayForecast(lat, lon, apiKey);
      }
    })
}
//function to clear search history 
$("#clear-history").on("click", function (event) {
  $("#search-history").empty();
});