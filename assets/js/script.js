

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

//on click function for search
  $(".searchBtn").click(function(){
    city = $("#city").val();
   //hard code depending on city chosen to set other variables
    if (city=="Miami") {
   console.log("Miami") ;
   visitCountry = "United States";
    } else if (city=="Cancun"){
      console.log("Cancun");
      visitCountry = "Mexico";
    }
    else if (city=="Paris"){
      console.log("Paris ");
      visitCountry="France";
    }
    else if (city=="London"){
      console.log("london");
      visitCountry="England";
    }
    else if (city=="Los Angelas"){
      console.log("Los Angelas");
      viitCountry="United States";
    }
  });
