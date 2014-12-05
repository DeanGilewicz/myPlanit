(function () {
  angular.module('myPlanit')
    .factory('SingleTimelineFactory', ['PARSE_URI', '$http', 'PARSE_HEADERS',
      function (PARSE_URI, $http, PARSE_HEADERS) {
        // set variable to be used in mapPois
        var poiLat;
        var poiLng;
        var poiLatLng;

        var mapPois = function (pois) {
          // create a new google maps latlng object with first poi's lat and lng
          var firstPoi = new google.maps.LatLng(pois[0].lat, pois[0].lng);

          var mapOptions = {
            // center map based on first poi coords
            center: firstPoi,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          // create map using mapOptions and show in elemennt with id
          var poiMap = new google.maps.Map(document.getElementById('map-pois'), mapOptions);
            // _.each to loop through all of the poi ojects
            _.each(pois, function (poi) {
              // set value of poiLat and poiLng
              poiLat = poi.lat;
              poiLng = poi.lng;
              // create a new google maps latlng object with all poi lat and lng
              poiLatLng = new google.maps.LatLng(poiLat, poiLng);
              // generate markers for each poi using their coords and placing on poiMap
              new google.maps.Marker({
                position: poiLatLng,
                map: poiMap
              });

              // // draw circle on map
              //   var circleOptions = {
              //     strokeColor: '#FF0000',
              //     strokeOpacity: 0.8,
              //     strokeWeight: 1.5,
              //     fillColor: '#FF0000',
              //     fillOpacity: 0.35,
              //     map: poiMap,
              //     center: poiLatLng,
              //     radius: 2000
              //   };
              //
              // // Add the circle for this city to the map.
              // var circle = new google.maps.Circle(circleOptions);

                // create a new google maps traffic layout object
                var trafficLayer = new google.maps.TrafficLayer();

                  // allows toggle to show traffic when button clicked
                  $('#toggle_traffic').click( function () {

                    if(trafficLayer.getMap()) {
                      trafficLayer.setMap(null);
                    } else {
                      trafficLayer.setMap(poiMap);
                    }

                  });

            });

          }


        return {
          mapPois: mapPois
        }

      }


  ]);

}());
