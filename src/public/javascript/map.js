(function() {
    window.onload = function() {
  
      // Creating a MapOptions object with the required properties
      var options = {
        zoom: 10,
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

      fetch('/')
            .then(response => response.json())
            .then(stores => {
                console.log('Dữ liệu cửa hàng:', stores);
                stores.forEach(store => {
                    // Adding a marker to the map
                    var marker = new google.maps.Marker({
                      position: new google.maps.LatLng(store.LatLng, store.longitude),
                      map: map,
                      title: 'Click me'
                    });
                    const infowindow = new google.maps.InfoWindow({
                        content: `<h3>${store.name}</h3>`
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                });
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu cửa hàng:', error));
      
      // // Creating a LatLngBounds object
      // var bounds = new google.maps.LatLngBounds();
      
      // var marker = new google.maps.Marker({
      //   position: new google.maps.LatLng(40.7257, -74.0047),
      //   map: map,
      //   title: 'Click me'
      // });
      
      // // Creating an InfoWindow with the content text: "Hello World"
      // var infowindow = new google.maps.InfoWindow({
      //   content: 'Hello world'
      // });
      
      // // Adding a click event to the marker
      // google.maps.event.addListener(marker, 'click', function() {
      //   // Calling the open method of the infoWindow
      //   infowindow.open(map, marker);
      // });
      
    };
  })();