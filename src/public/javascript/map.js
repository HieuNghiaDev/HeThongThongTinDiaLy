(function() {
    window.onload = function() {
  
      // Creating a MapOptions object with the required properties
      var options = {
        zoom: 20,
        center: new google.maps.LatLng(9.9549729,105.121318),
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

      // Creating a LatLngBounds object
    var bounds = new google.maps.LatLngBounds();
    
    // Creating an array that will contain the coordinates 
    // for New York, San Francisco, and Seattle
    var places = [];
    
    // Adding a LatLng object for each city
    places.push(new google.maps.LatLng(40.756, -73.986));
    places.push(new google.maps.LatLng(37.775, -122.419));
    places.push(new google.maps.LatLng(47.620, -122.347));
    places.push(new google.maps.LatLng(-22.933, -43.184));
    
    
    // Creating a variable that will hold 
    // the InfoWindow object
    var infowindow;

    var marker = new google.maps.MarkerImage(
      '/public/images/icon/shopping-cart.png', 
      new google.maps.Size(32, 37),
      new google.maps.Point(0, 0), 
      new google.maps.Point(16, 35)
    );

    var markerHover = new google.maps.MarkerImage(
      '/public/images/icon/shopping-cart.png', 
      new google.maps.Size(32, 37),
      new google.maps.Point(33, 0), 
      new google.maps.Point(16, 35)
    );

    var markerClick = new google.maps.MarkerImage(
      '/public/images/icon/shopping-cart.png', 
      new google.maps.Size(32, 37),
      new google.maps.Point(66, 0), 
      new google.maps.Point(16, 35)
    );
    
    // Adding a marker to the map
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(40.756054, -73.986951), 
      map: map,
      icon: wifi,
      shadow: shadow
    });

    // Hover
    google.maps.event.addListener(marker, 'mouseover', function() {
      this.setIcon(wifiHover);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
      this.setIcon(wifi);
    });
 
    // Click
    google.maps.event.addListener(marker, 'mousedown', function() {
      this.setIcon(wifiClick);
    });
    };
  })();