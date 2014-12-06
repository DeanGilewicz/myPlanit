(function () {
  angular.module('myPlanit')
    .factory('SingleTimelineFactory', ['PARSE_URI', '$http', 'PARSE_HEADERS',
      function (PARSE_URI, $http, PARSE_HEADERS) {

        var updateAllottedTime = function (poi, updateTime, singlePlan) {

          // update on Parse the specifiic poi object's allotted time
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS).success( function(data) {
            console.log(data);
          });

        }

        // set variable to be used in mapPois
        var poiLat;
        var poiLng;
        var poiLatLng;
        var directionDisplay;
        var directionsService = new google.maps.DirectionsService();


        var mapPois = function (pois) {
          // create a new google maps latlng object with first poi's lat and lng
          var firstPoi = new google.maps.LatLng(pois[0].lat, pois[0].lng);
          directionsDisplay = new google.maps.DirectionsRenderer();

          var mapOptions = {
            // center map based on first poi coords
            center: firstPoi,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // create map using mapOptions and show in elemennt with id
          var poiMap = new google.maps.Map(document.getElementById('map-pois'), mapOptions);

          directionsDisplay.setMap(poiMap);
          directionsDisplay.setPanel(document.getElementById("directionsPanel"));

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

            });


          function calcRoute() {
            var travelMode = $('input[name="travelMode"]:checked').val();
            var start = $("#routeStart").val();
            var via = $("#routeVia").val();

            if (travelMode == 'TRANSIT') {
              via = ''; // if the travel mode is transit, don't use the via waypoint because that will not work
            }

            var end = "51.764696,5.526042"; // endpoint is a geolocation
            var waypoints = []; // init an empty waypoints array
            if (via != '') {
              // if waypoints (via) are set, add them to the waypoints array
              waypoints.push({
                location: via,
                stopover: true
              });
            }

            var request = {
              origin: start,
              destination: end,
              waypoints: waypoints,
              // optimizeWaypoints: true, // will create the most efficient route
              unitSystem: google.maps.UnitSystem.IMPERIAL,
              travelMode: google.maps.DirectionsTravelMode[travelMode]
            };

            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                $('#directionsPanel').empty(); // clear the directions panel before adding new directions
                directionsDisplay.setDirections(response);
              } else {
                // alert an error message when the route could nog be calculated.
                if (status == 'ZERO_RESULTS') {
                  alert('No route could be found between the origin and destination.');
                } else if (status == 'UNKNOWN_ERROR') {
                  alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
                } else if (status == 'REQUEST_DENIED') {
                  alert('This webpage is not allowed to use the directions service.');
                } else if (status == 'OVER_QUERY_LIMIT') {
                  alert('The webpage has gone over the requests limit in too short a period of time.');
                } else if (status == 'NOT_FOUND') {
                  alert('At least one of the origin, destination, or waypoints could not be geocoded.');
                } else if (status == 'INVALID_REQUEST') {
                  alert('The DirectionsRequest provided was invalid.');
                } else {
                  alert("There was an unknown error in your request. Requeststatus: nn"+status);
                }
              }
            });

          }

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
                // var trafficLayer = new google.maps.TrafficLayer();

                  // allows toggle to show traffic when button clicked
                  // $('#toggle_traffic').click( function () {
                  //
                  //   if(trafficLayer.getMap()) {
                  //     trafficLayer.setMap(null);
                  //   } else {
                  //     trafficLayer.setMap(poiMap);
                  //   }
                  //
                  // });

            // });

          }


        return {
          mapPois:            mapPois,
          updateAllottedTime: updateAllottedTime
        }

      }


  ]);

}());
