
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
