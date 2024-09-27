(function() {
    window.onload = function() {
  
      // Creating a MapOptions object with the required properties
      var options = {
        zoom: 13,
        center: new google.maps.LatLng(9.990759886733022,-254.89198479426483),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      // Creating the map  
      var map = new google.maps.Map(document.getElementById('map'), options);
  
    };
  })();