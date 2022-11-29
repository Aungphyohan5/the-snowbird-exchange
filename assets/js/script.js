
let locations = [
  {city:"Miami", country:"United States"},
  {city:"Cancun", country:"Mexico"},
  {city:"Paris", country:"France"},
  {city:"London", country:"England"},
  {city:"Los Angelas", country:"United States"}
];

//This is the autocomplete for the search bar. 
$( function() {
    var availableCities = [
      
      "Miami",
      "Cancun",
      "Paris",
      "London",
      "Los Angeles"
     
    ];
    $( "#city" ).autocomplete({
      source: availableCities
    });
  } );


  $(".searchBtn").click(function(){
    city = $("#city").val();
    console.log(city);
  });
