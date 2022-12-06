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
  