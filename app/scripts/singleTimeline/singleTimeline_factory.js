(function () {
  angular.module('myPlanit')
    .factory('SingleTimelineFactory', ['PARSE_URI', '$http', 'PARSE_HEADERS',
      function (PARSE_URI, $http, PARSE_HEADERS) {

        // function to begin the code to generate the map
        var genMap = function () {

          var map;
          // var service;

          navigator.geolocation.getCurrentPosition(function (location) {

            var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

            var mapOptions = {
              center: currentLocation,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

            var marker = new google.maps.Marker({
              position: currentLocation,
              map: map
            });

            // // initialize the service object
            // service = new google.maps.places.PlacesService(map);

              // // This ensures we wait until the map bounds are initialized before we perform the search
              // google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

            // redo search when the refresh button is clicked
            // $('#refresh').click(performSearch);

            // draw circle on map
            var circleOptions = {
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 1.5,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: map,
              center: currentLocation,
              radius: 2000
            };


            // Add the circle for this city to the map.
            var circle = new google.maps.Circle(circleOptions);

            // traffic
            var trafficLayer = new google.maps.TrafficLayer();

            // allows toggle to show traffic when button clicked
            $('#toggle_traffic').click( function () {

              if(trafficLayer.getMap()) {
                trafficLayer.setMap(null);
              } else {
                trafficLayer.setMap(map);
              }

            });

          });

        }


        //     function handleSearchResults(results, status) {
        //       console.log(results);
        //
        //       for(var i = 0; i < results.length; i++) {
        //
        //         var marker = new google.maps.Marker({
        //           position: results[i].geometry.location,
        //           map: map,
        //           icon: results[i].icon
        //         });
        //
        //       }
        //
        //     }
        //
        //     function performSearch() {
        //
        //       var request = {
        //         bounds: map.getBounds(),
        //         types:['establishment']
        //       }
        //       service.nearbySearch(request, handleSearchResults);
        //     }
        //
        //   }); // end of navigator function
        //
        // }; // end of genMap function


        var mapPois = function (pois) {
          _.each(pois, function (coords) {
            console.log(coords);
            // var lat = coords.('lat');
            // var lng = coords.get('lng');

          //   var poiMap = new google.maps.LatLng(lat, lng);
          //
          //   new google.maps.Marker({
          //     position: latLng,
          //     map: poiMap
          //   });
          //
          //
          // });
          });
        }


        return {
          genMap:  genMap,
          mapPois: mapPois
        }

      }


  ]);

}());
