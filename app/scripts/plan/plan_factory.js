(function () {
  angular.module('myPlanit')
    .factory('PlanFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$rootScope', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $rootScope, $location) {

        // function getLocation(location) {
        //   lat = location.coords.latitude;
        //   lng = location.coords.longitude;
        //   doSearch();
        // }

        var doSearch = function () {
          $.getJSON('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&near=Atlanta&query='+$('#query').val()+'').success(function (data) {
            console.log(data);
          }).error(function(data) {
            console.log('error');
          });
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
          getPois: getPois,
          addPoi: addPoi,
          deletePoi: deletePoi
        }

      }

    ]);

}());
