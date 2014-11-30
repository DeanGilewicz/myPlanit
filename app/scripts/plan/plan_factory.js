(function () {
  angular.module('myPlanit')
    .factory('PlanFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$rootScope', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $rootScope, $location) {

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
