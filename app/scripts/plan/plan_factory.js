(function () {
  angular.module('myPlanit')
    .factory('PlanFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$rootScope', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $rootScope, $location) {

        var lat;
        var lng;

        navigator.geolocation.getCurrentPosition(getLocation);

        function getLocation(location) {
          lat = location.coords.latitude;
          lng = location.coords.longitude;
        }


        var doSearch = function () {

          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+$('#near').val()+'').success(function (data) {
              console.log(data);
            })
          } else if($('#near').val() == "") {
              return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&ll='+lat+','+lng+'&query='+$('#query').val()+'').success(function (data) {
                console.log(data);
              })
          } else {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+$('#near').val()+'&query='+$('#query').val()+'').success(function (data) {
              console.log(data);
            }).error(function(data) {
              console.log('error');
            });
          }
        }



        var doExplore = function () {

          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+$('#near').val()+'&section=topPicks').success(function (data) {
              console.log(data);
            })
          } else if($('#near').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&ll='+lat+','+lng+'&section=topPicks').success(function (data) {
              console.log(data);
            })
          } else {
            alert('please remove search term and try again');
          }
        }





        var getPois = function () {
          return $http.get(PARSE_URI + 'classes/PoiList', PARSE_HEADERS);
        }

        // add a poi to "plan" list
        var addPoi = function (poi) {
          $http.post(PARSE_URI + 'classes/PoiList', poi, PARSE_HEADERS).success( function (data) {
            console.log(data);
          });
          // .then( function () {
          //   // broadcast to the parent controller that the poi has been added
          //   $rootScope.$broadcast('poi:added');
          // });
        }

        var deletePoi = function (poiID) {
          return $http.delete(PARSE_URI + 'classes/PoiList/' + poiID, PARSE_HEADERS);
        };

        return {
          getPois:   getPois,
          addPoi:    addPoi,
          deletePoi: deletePoi,
          doSearch:  doSearch,
          doExplore: doExplore
        }

      }

    ]);

}());
