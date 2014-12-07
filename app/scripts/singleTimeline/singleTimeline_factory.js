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
        var directionsDisplay;
        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService();

        var mapPois = function (pois) {

          directionsDisplay = new google.maps.DirectionsRenderer();

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
          // bind directions service to poiMap
          directionsDisplay.setMap(poiMap);
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
          // display step by step directions
          directionsDisplay.setPanel(document.getElementById("directionsPanel"));

        }

        // IF INPUT ROUTESTART HAS A VALUE IN THEN ADD THIS TO THE BEGINNING OF THE WAYPOINT ARRAY
        // IF INPUT ROUTEEND HAS A VALUE IN THEN ADD THIS TO THE END OF THE WAYPOINT ARRAY
        // IF NEITHER HAVE INPUT THEN JUST CALCULATE WAYPOINTS - POIS
        // NEST IF ELSE FOR OPTIMIZE BUTTON - IF VALUE IN ROUTESTART, ROUTEEND, NEITHER

        var getDirections = function (pois) {
            console.log(pois);
            var firstPoi = _.first(pois);
            var firstPoiLat = firstPoi.lat;
            var firstPoiLng = firstPoi.lng;
            console.log(firstPoiLat);
            console.log(firstPoiLng);

            var firstPoiLatLng = new google.maps.LatLng(firstPoiLat, firstPoiLng);
            console.log(firstPoiLatLng);

            // console.log(firstPoiCoords);
            // console.log(firstCoords);
            // var last = _.last(pois);
            // var lastCoords = last.lat, last.lng;
            // console.log(lastCoords);




            // allow user to select mode of transport
            var travelMode = $('input[name="travelMode"]:checked').val();


            // startpoint
            if ($("#routeStart").val() == "") {

              var start = firstPoiLatLng;

            } else {

              var start = $("#routeStart").val();

            }



            // endpoint
            var end = $("#routeEnd").val();
            // init an empty waypoints array
            var waypoints = [];



            // var checkboxArray = document.getElementById('waypoints');
            // for (var i = 0; i < checkboxArray.length; i++) {
            //   if (checkboxArray.options[i].selected == true) {
            //     waypoints.push({
            //       location: checkboxArray[i].value,
            //       stopover: true
            //     });
            //   }
            // }

            _.each(pois, function (poi) {

              // set value of poiLat and poiLng
              poiLat = poi.lat;
              poiLng = poi.lng;
              // // create a new google maps latlng object with all poi lat and lng
              poiLatLng = new google.maps.LatLng(poiLat, poiLng);

              waypoints.push(
                {
                location: poiLatLng,
                stopover: true
              }
              );


            });










            var request = {
              origin: start,
              destination: end,
              waypoints: waypoints,
              // optimizeWaypoints: true, // will create the most efficient route
              unitSystem: google.maps.UnitSystem.IMPERIAL,
              travelMode: google.maps.DirectionsTravelMode[travelMode]
            };
            // send the request to google api
            directionsService.route(request, function(response, status) {
              console.log(response);
              // check to make sure reuest was successful
              if (status == google.maps.DirectionsStatus.OK) {
                // clear the directions panel before adding new directions
                $('#directionsPanel').empty();
                // generate directions
                directionsDisplay.setDirections(response);
                // set var to payload returned from google api
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions_panel');
                // input html into id directions_panel as route information is created
                summaryPanel.innerHTML = '';
                // run through each of the legs in var route and display info
                for (var i = 0; i < route.legs.length; i++) {
                  var routeSegment = i + 1;
                  summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                  summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                  summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                  summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                }

              } else {
                // alert an error message when the route could not be calculated.
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

          // }


        return {
          mapPois:            mapPois,
          getDirections:      getDirections,
          updateAllottedTime: updateAllottedTime
        }

      }


  ]);

}());
