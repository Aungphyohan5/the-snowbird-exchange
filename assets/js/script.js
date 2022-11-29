
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