(function () {
  angular.module('myPlanit')
    .factory('ProfileFactory', ['$scope',
      function ($scope) {

        // queries the student and compares to user
        // var planByUser = function (user) {
        //   var query = '?'+'where={"student":"'+user+'"}';
        //   return $http.get(PARSE_URI + 'classes/PoiList' + query, PARSE_HEADERS);
        // }
        //
        //
        // return {
        //   planByUser: planByUser
        // }

      }

    ]);

}());
