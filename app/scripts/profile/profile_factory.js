(function () {
  angular.module('myPlanit')
    .factory('ProfileFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http',
      function (PARSE_URI, PARSE_HEADERS, $http) {

        // get all plans for specific user
        var plansByUser = function () {
          // queries the plan id and compares to user
          // var query = '?'+'where={"User": {"$select": {"query": {"className": "Plans", "where": {"pois": {"user"}';
          // return $http.get(PARSE_URI + 'classes/Plans' + query, PARSE_HEADERS);

            return $http.get(PARSE_URI + 'classes/Plans', PARSE_HEADERS);
        }


        return {
          plansByUser: plansByUser
        }

      }

    ]);

}());
