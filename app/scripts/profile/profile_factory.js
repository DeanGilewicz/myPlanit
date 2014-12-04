(function () {
  angular.module('myPlanit')
    .factory('ProfileFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http', '$cookieStore',
      function (PARSE_URI, PARSE_HEADERS, $http, $cookieStore) {

        // get all plans for specific user
        var plansByUser = function () {
          // set var for current user
          var currentUser = $cookieStore.get('currentUser');
          console.log(currentUser);
          // query Parse to look up user column (which is a type pointer in _User with matching id)
          var params = '?where={"user":{"__type":"Pointer","className":"_User","objectId":"'+ currentUser.objectId +'"}}';
          // return Plans for current user
          return $http.get(PARSE_URI + 'classes/Plans/' + params, PARSE_HEADERS);

        }

        // function to delete a plan from user plans
        var deleteUserPlan = function (plan) {
          // delete plan from Parse
          return $http.delete(PARSE_URI + 'classes/Plans/' + plan.objectId, PARSE_HEADERS);

      }


        return {
          plansByUser:    plansByUser,
          deleteUserPlan: deleteUserPlan
        }

      }

    ]);

}());
