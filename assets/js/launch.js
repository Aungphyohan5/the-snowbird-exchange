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
    $( "#dialog-message" ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
          window.location.href = 'english.html';
        }
      }
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