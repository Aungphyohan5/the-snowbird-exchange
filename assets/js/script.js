
//This is the autocomplete for the search bar. 
$( function() {
    var availableCities = [
      "Miami",
      "Cancun",
      "Paris",
      "London",
      "Los Angelas"
     
    ];
    $( "#city" ).autocomplete({
      source: availableCities
    });
  } );