(function () {
  angular.module('myPlanit')
    .factory('SingleTimelineFactory', ['PARSE_URI', '$http', 'PARSE_HEADERS',
      function (PARSE_URI, $http, PARSE_HEADERS) {

        // function to begin the code to generate the map
        // var genMap = function () {
        //
        //   var map;
        //   // var service;
        //
        //   navigator.geolocation.getCurrentPosition(function (location) {
        //
        //     var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        //
        //     var mapOptions = {
        //       center: currentLocation,
        //       zoom: 12,
        //       mapTypeId: google.maps.MapTypeId.ROADMAP
        //     };
        //
        //     map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        //
        //     var marker = new google.maps.Marker({
        //       position: currentLocation,
        //       map: map
        //     });
        //
        //     // draw circle on map
        //     var circleOptions = {
        //       strokeColor: '#FF0000',
        //       strokeOpacity: 0.8,
        //       strokeWeight: 1.5,
        //       fillColor: '#FF0000',
        //       fillOpacity: 0.35,
        //       map: map,
        //       center: currentLocation,
        //       radius: 2000
        //     };
        //
        //     // Add the circle for this city to the map.
        //     var circle = new google.maps.Circle(circleOptions);
        //
        //     // traffic
        //     var trafficLayer = new google.maps.TrafficLayer();
        //
        //     // allows toggle to show traffic when button clicked
        //     $('#toggle_traffic').click( function () {
        //
        //       if(trafficLayer.getMap()) {
        //         trafficLayer.setMap(null);
        //       } else {
        //         trafficLayer.setMap(map);
        //       }
        //
        //     });
        //
        //   });
        //
        // }

        //
        //   }); // end of navigator function
        //
        // }; // end of genMap function
        var poiLat;
        var poiLng;
        var poiLatLng;

        var mapPois = function (pois) {
          console.log(pois);
          var firstPoi = new google.maps.LatLng(pois[0].lat, pois[0].lng);

          var mapOptions = {
            center: firstPoi,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          var poiMap = new google.maps.Map(document.getElementById('map-pois'), mapOptions);

            _.each(pois, function (poi) {
              console.log(poi);
              console.log(poi.name);

              poiLat = poi.lat;
              console.log(poiLat);
              poiLng = poi.lng;
              console.log(poiLng);
              // console.log(poiLat);
              // console.log(poiLng);
              poiLatLng = new google.maps.LatLng(poiLat, poiLng);
              // console.log(poiLatLng);
              //
              new google.maps.Marker({
                position: poiLatLng,
                map: poiMap
              });

            });

          }


        return {
          mapPois: mapPois
        }

      }


  ]);

}());
