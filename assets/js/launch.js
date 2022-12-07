var languagePref = localStorage.getItem("language");

// Language modal 
$( function() {
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "English": function() {
          localStorage.setItem("language","english");
          $( this ).dialog( "close" );
          window.location.href = 'english.html';
            },
        "French": function() {
          localStorage.setItem("language","french");
          $( this ).dialog( "close" );
          window.location.href = './french.html'
        }
      }
    });
  } );

  //Redirect from French site as french currently no french version. 
  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
       
        duration: 1000
      }
    });
 
    $( "#opener" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
  } );
  
  if (languagePref=="english") {
    $(".englishBtn").addClass("greenBtn");
    $(".frenchBtn").addClass("yellowBtn");
    console.log("Color should work for English");
  } else if (languagePref=="french"){
    $(".englishBtn").addClass("yellowBtn");
    $(".frenchBtn").addClass("greenBtn");
    console.log("Color should work for french");
  }