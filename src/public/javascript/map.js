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
      
      // Attaching click events to the buttons
      
      // Getting values
      document.getElementById('getValues').onclick = function() {
        alert('Current Zoom level is ' + map.getZoom());
        alert('Current center is ' + map.getCenter());
        alert('The current mapType is ' + map.getMapTypeId());
      }
  
      // Changing values
      document.getElementById('changeValues').onclick = function() {
        map.setOptions({
          center: new google.maps.LatLng(9.991177911785233,-254.80171181477513),
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        });
      }
  
    };
  })();