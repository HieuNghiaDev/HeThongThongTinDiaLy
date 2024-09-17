(function() {
    window.onload = function() {
  
      // Creating a MapOptions object with the required properties
      var options = {
        zoom: 12,
        center: new google.maps.LatLng(9.944620952122317, 105.14710569278715),
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

      google.maps.event.addListenerOnce(map, 'idle', function() {
          // Lấy dữ liệu cửa hàng từ server
          fetch('/stores/map-data')
              .then(response => response.json())
              .then(stores => {
                  console.log('Dữ liệu cửa hàng:', stores);
                  // Tiếp tục xử lý...
                  stores.forEach(store => {
                      console.log('Tạo marker cho:', store.name_store, 'tại:', store.latitude, store.longitude);
                      const marker = new google.maps.Marker({
                          position: new google.maps.LatLng(store.latitude, store.longitude),
                          map: map,
                          title: store.name_store
                      });

                      // Tạo infowindow cho mỗi marker
                      const infowindow = new google.maps.InfoWindow({
                          content: `<h3>${store.name_store}</h3><p>Địa chỉ: ${store.address}</p>`
                      });

                      // Thêm sự kiện click cho marker
                      marker.addListener('click', function() {
                          infowindow.open(map, marker);
                      });
                  });
              })
              .catch(error => console.error('Lỗi khi lấy dữ liệu cửa hàng:', error));
      });
      
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