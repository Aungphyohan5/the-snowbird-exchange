// Language modal 
$( function() {
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "English": function() {
          localStorage.setItem("language","homeenglish");
          $( this ).dialog( "close" );
          window.location.href = 'english.html';
          console.log("I don't think this worked")
        },
        "French": function() {
          localStorage.setItem("language","homefrench");
          $( this ).dialog( "close" );
          console.log("I hate french");
          window.location.href = './french.html'
        }
      }
    });
  } );

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
  