(function () {
  angular.module('myPlanit')
    .factory('ProfileFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http', '$cookieStore',
      function (PARSE_URI, PARSE_HEADERS, $http, $cookieStore) {

        // get all plans for specific user
        var plansByUser = function () {

          var currentUser = $cookieStore.get('currentUser');
          console.log(currentUser);

          var params = '?where={"user":{"__type":"Pointer","className":"_User","objectId":"'+ currentUser.objectId +'"}}';

          return $http.get(PARSE_URI + 'classes/Plans/' + params, PARSE_HEADERS);


          // var currentUser = $cookieStore.get('currentUser');
          // var userPlans = $cookieStore.get('Plans.user');
          // console.log(currentUser);
          // console.log(userPlans);
          // queries the plan id and compares to user
          // var query = '?'+'where={"currentUser":"'userPlans.objectId+'"}';
          // return $http.get(PARSE_URI + 'classes/Plans' + query, PARSE_HEADERS);

            // return $http.get(PARSE_URI + 'classes/Plans', PARSE_HEADERS);
        }


        return {
          plansByUser: plansByUser
        }

      }

    ]);

}());
