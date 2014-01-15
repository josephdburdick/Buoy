
      var map, latLng, marker, infoWindow, ad;
      var geocoder = new google.maps.Geocoder();
      var image = 'http://joeylabs.com/sites/buoy/assets/images/buoy-icon.png';
      function showAddress(val) {
        infoWindow.close();
        geocoder.geocode( { 'address': val }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
             marker.setPosition(results[0].geometry.location);
             geocode(results[0].geometry.location);
          } else {
             alert("Sorry but Google Maps could not find this location.");
          }
       });
      }

      function geocode(position) {
        geocoder.geocode({
           latLng: position
        }, function(responses) {
             var html = '';
             if (responses && responses.length > 0) {
                html += '' + responses[0].formatted_address; //Add string here.
                $("#venue_street").val(responses[0].formatted_address);
                $("#venue_lat").val(marker.getPosition().lat());
                $("#venue_lng").val(marker.getPosition().lng());
                $("#venue_city").val(responses[1].address_components[1].short_name);
                $("#venue_state").val(responses[1].address_components[3].long_name);
                $("#venue_zip").val(responses[1].address_components[6].long_name);
                $("#venue_country").val(responses[1].address_components[4].long_name);
             } else {
                html += 'Sorry but Google Maps could not determine the approximate postal address of this location.';
             }

             html += '';
             map.panTo(marker.getPosition());
             infoWindow.setContent("<div id='iw'>" + html + "</div>");
             infoWindow.open(map, marker);
         });
      }

      function initialize() {

        var myOptions = {
          zoom: 16,
          panControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map'),
            myOptions); 

        if (geoPosition.init()) 
            geoPosition.getCurrentPosition(locationFound, defaultLocation, {enableHighAccuracy:true});
        else
            defaultLocation();
      }

      function locationFound(position) {
        showMap(position.coords.latitude, position.coords.longitude);
      }

      function defaultLocation() {
        showMap(40.782001, -73.832703);
      }

      function showMap(lat, lng) {
       
        latLng = new google.maps.LatLng(lat, lng);

        map.setCenter(latLng);

        marker = new google.maps.Marker({
          icon: image, position: latLng, map: map, draggable: true, animation: google.maps.Animation.DROP

        });

        $("#venue_lat").val(lat)
        $("#venue_lng").val(lng)        

        infoWindow = new google.maps.InfoWindow({
           content: 'Drag the buoy to find the approximate street address.'
        });

        infoWindow.open(map, marker);

        google.maps.event.addListener(marker, 'dragstart', function (e) {
           infoWindow.close();
        });

        google.maps.event.addListener(marker, 'dragend', function (e) {
           var point = marker.getPosition();
           map.panTo(point);
           geocode(point);
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);
