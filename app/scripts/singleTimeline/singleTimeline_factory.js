(function () {
  angular.module('myPlanit')
    .factory('SingleTimelineFactory', ['PARSE_URI', '$http', 'PARSE_HEADERS',
      function (PARSE_URI, $http, PARSE_HEADERS) {

        var updateMaxPlanTime = function (singlePlan, updateMaxTime) {
          // update on Parse the specifiic plan's totalPlanMins
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS).success( function(data) {
            console.log(data);
          });
        }// end of updateMaxPlanTime func

        var updateAllottedTime = function (poi, updateTime, singlePlan) {
          // update on Parse the specifiic poi object's allotted time
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS).success( function(data) {
            console.log(data);
          });
        }// end of updateAllottedTime func

        var totalAllottedTime = function (pois) {
          var sum = 0;
          _.each(pois, function (pois) {
            var aT = pois.allottedTime;
            console.log(aT);
            sum = sum + aT;
            console.log(sum);
          });
          $('#totalAllottedTime').text(sum + ' minutes');

        }// end of updateAllottedTime func

        // set variables to accessible
        var poiLat;
        var poiLng;
        var poiLatLng;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService(); // instantiate a directions service


        var mapPois = function (pois) {
          // instantiate a directions renderer
          directionsDisplay = new google.maps.DirectionsRenderer();
          // create a new google maps latlng object with first poi's lat and lng
          var firstPoi = new google.maps.LatLng(pois[0].lat, pois[0].lng);
          // set mapOptions
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
            // new google.maps.Marker({
            //   position: poiLatLng,
            //   map: poiMap
            // });
          }); // end of _.each func
          // create a new google maps traffic layout object
          var trafficLayer = new google.maps.TrafficLayer();
          // allows toggle to show traffic when button clicked
          $('#toggle_traffic').click( function () {
            if(trafficLayer.getMap()) {
              trafficLayer.setMap(null);
            } else {
              trafficLayer.setMap(poiMap);
            }
          });// end of traffic func
          // display step by step directions
          directionsDisplay.setPanel(document.getElementById("directionsPanel"));
          // call func to automatically generate directions between all pois
          getDirections(pois);

        }// end of mapPois func


        var getDirections = function (pois) {
            // get the first obj in pois array
            var firstPoi = _.first(pois);
            // set the lat for first obj
            var firstPoiLat = firstPoi.lat;
            // set the lng for first obj
            var firstPoiLng = firstPoi.lng;
            // create a new google maps latlng object with first obj's lat lng coords
            var firstPoiLatLng = new google.maps.LatLng(firstPoiLat, firstPoiLng);
            // get the last obj in pois array
            var lastPoi = _.last(pois);
            // set the lat for last obj
            var lastPoiLat = lastPoi.lat;
            // set the lng for last obj
            var lastPoiLng = lastPoi.lng;
            // create a new google maps latlng object with last obj's lat lng coords
            var lastPoiLatLng = new google.maps.LatLng(lastPoiLat, lastPoiLng);
            // get all obj's but the first one in pois array
            var allButFirstPoi = _.rest(pois, 1);
            // get all obj's but the last one in pois array
            var allButLastPoi = _.initial(pois);
            // pass the new array (pois array but without first obj) into func to get all but last obj
            var noFirstnoLastPoi = _.initial(allButFirstPoi);

            // if user doesn't enter a starting point then set to first poi, user enters ending point
            if ($("#routeStart").val() == "" && $("#routeEnd").val() !== "") {
              // set origin to be the first point of interest
              var start = firstPoiLatLng;
              // set destination to the value of input for routeEnd
              var end = $("#routeEnd").val();
              // init an empty waypoints array
              var waypoints = [];
              // iterate through all but first point of interest
              _.each(allButFirstPoi, function (poi) {
                // set value of poiLat and poiLng
                allButFirstPoiLat = poi.lat;
                allButFirstPoiLng = poi.lng;
                // create a new google maps latlng object with all but first poi lat and lng
                allButFirstPoiLatLng = new google.maps.LatLng(allButFirstPoiLat, allButFirstPoiLng);
                // add all but first poi obj coords into waypoint array
                waypoints.push({
                  location: allButFirstPoiLatLng,
                  stopover: true
                });
              });// end of _.each func
              // grab the value selected by the user for mode of transport
              var travelMode = $('input[name="travelMode"]:checked').val();
              // set up request
              var request = {
                origin: start,
                destination: end,
                waypoints: waypoints,
                // optimizeWaypoints: true, // will create the most efficient route
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                travelMode: google.maps.DirectionsTravelMode[travelMode]
              };

              // if user doesn't enter a ending point then set to last poi, user enters starting point
            } else if ($("#routeEnd").val() == "" && $("#routeStart").val() !== "") {
              // set origin to the value of input for routeStart
              var start = $("#routeStart").val();
              // set destination to be the last point of interest
              var end = lastPoiLatLng;
              // init an empty waypoints array
              var waypoints = [];
              // iterate through all but last point of interest
              _.each(allButLastPoi, function (poi) {
                // set value of poiLat and poiLng
                allButLastPoiLat = poi.lat;
                allButLastPoiLng = poi.lng;
                // create a new google maps latlng object with all but last poi lat and lng
                allButLastPoiLatLng = new google.maps.LatLng(allButLastPoiLat, allButLastPoiLng);
                // add all but last poi obj coords into waypoint array
                waypoints.push({
                  location: allButLastPoiLatLng,
                  stopover: true
                });
              });// end of _.each func
              // grab the value selected by the user for mode of transport
              var travelMode = $('input[name="travelMode"]:checked').val();
              // set up request
              var request = {
                origin: start,
                destination: end,
                waypoints: waypoints,
                // optimizeWaypoints: true, // will create the most efficient route
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                travelMode: google.maps.DirectionsTravelMode[travelMode]
              };

              // if user doesn't enter a starting point and an ending point set as first and last pois
            } else if ($("#routeStart").val() == "" && $("#routeEnd").val() == "") {
              // set origin to be the first point of interest
              var start = firstPoiLatLng;
              // set destination to be the last point of interest
              var end = lastPoiLatLng;
              // init an empty waypoints array
              var waypoints = [];
              // iterate through all but first and last point of interest
              _.each(noFirstnoLastPoi, function (poi) {
                // set value of poiLat and poiLng
                noFirstnoLastPoiLat = poi.lat;
                noFirstnoLastPoiLng = poi.lng;
                // create a new google maps latlng object with all but first and last poi lat and lng
                noFirstnoLastPoiLatLng = new google.maps.LatLng(noFirstnoLastPoiLat, noFirstnoLastPoiLng);
                // add all but first and last poi obj coords into waypoint array
                waypoints.push({
                  location: noFirstnoLastPoiLatLng,
                  stopover: true
                });
              });// end of _.each func
              // grab the value selected by the user for mode of transport
              var travelMode = $('input[name="travelMode"]:checked').val();
              // set up request
              var request = {
                origin: start,
                destination: end,
                waypoints: waypoints,
                // optimizeWaypoints: true, // will create the most efficient route
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                travelMode: google.maps.DirectionsTravelMode[travelMode]
              };

              // if user enters both a starting point and ending point use these values and include all pois in waypoints
            } else {
              // set origin to the value of input for routeStart
              var start = $("#routeStart").val();
              // set destination to the value of input for routeEnd
              var end = $("#routeEnd").val();
              // init an empty waypoints array
              var waypoints = [];
              // iterate through all point of interest
              _.each(pois, function (poi) {
                // set value of poiLat and poiLng
                poiLat = poi.lat;
                poiLng = poi.lng;
                // create a new google maps latlng object with all poi lat and lng
                poiLatLng = new google.maps.LatLng(poiLat, poiLng);
                // add all poi obj coords into waypoint array
                waypoints.push({
                  location: poiLatLng,
                  stopover: true
                });
              });// end of _.each func
              // grab the value selected by the user for mode of transport
              var travelMode = $('input[name="travelMode"]:checked').val();
              // set up request
              var request = {
                origin: start,
                destination: end,
                waypoints: waypoints,
                // optimizeWaypoints: true, // will create the most efficient route
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                travelMode: google.maps.DirectionsTravelMode[travelMode]
              };
            }// end of conditional func
            // send the request to google api
            directionsService.route(request, function(response, status) {
              console.log(response);
              // check to make sure reuest was successful
              if (status == google.maps.DirectionsStatus.OK) {
                // clear the directions panel before adding new directions
                $('#directionsPanel').empty();
                // clear the totals panel before adding new totals
                $('#totals').empty();
                // generate directions
                directionsDisplay.setDirections(response);
                // set initial value for vars
                var totalDistance = 0;
                var totalDuration = 0;
                // set var to payload returned from google api
                var legs = response.routes[0].legs;
                // iterate through legs in payload
                for (var i = 0; i < legs.length; i++) {
                  // add up each distance value
                  totalDistance = totalDistance + legs[i].distance.value;
                  console.log(totalDistance);
                  // add up each duration value
                  totalDuration = totalDuration + legs[i].duration.value;
                  console.log(totalDuration);
                }
                // value to convert meters to miles
                var meters_to_miles = 0.000621371192;
                // display output with text miles
                $('#distance').text((Math.round( totalDistance * meters_to_miles * 10 ) / 10)+' miles');
                // display output with text minutes
                $('#duration').text(Math.round( totalDuration / 60 )+' minutes');

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

        }// end of getDirections func


        return {
          updateMaxPlanTime:   updateMaxPlanTime,
          updateAllottedTime:  updateAllottedTime,
          totalAllottedTime:   totalAllottedTime,
          mapPois:             mapPois,
          getDirections:       getDirections

        }

      }// end of factory func


  ]);// end of factory dependencies

}());// end of IIFE
