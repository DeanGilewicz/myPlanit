(function () {
  angular.module('myPlanit')
    .factory('PlanFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $location) {

        // add a poi to "plan" list
        var addPoi = function (poi) {
          $http.post(PARSE_URI + 'classes/PoiList', poi, PARSE_HEADERS).success( function (data) {
            console.log(data);
          });
          //   .then( function () {
          //   // broadcast to the parent controller that the poi has been added
          //   $rootScope.$broadcast('appt:added');
          // });
        }

        var getPois = function (poi) {
          return $http.get(PARSE_URI + 'classes/PoiList', PARSE_HEADERS);
        }

        return {
          addPoi: addPoi,
          getPois: getPois
        }

      }

    ]);

}());
