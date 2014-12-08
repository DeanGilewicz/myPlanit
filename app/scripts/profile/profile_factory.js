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

        // function to update status of plan to either draft (personal) or publish (public)
        var updatePlanStatus = function (plan, userPlans) {
          // update status of plan
          if(plan.status === 'private') {
            plan.status = 'published';
            $('#statusText').text('published');
          } else if (plan.status === 'published') {
            plan.status = 'private';
            $('#statusText').text('private');
          }

          // update parse to reflect updated status
          return $http.put(PARSE_URI + 'classes/Plans/' + plan.objectId, plan, PARSE_HEADERS).success( function(data) {
            console.log(data);
          });

        }


        // function to delete a plan from user plans
        var deleteUserPlan = function (plan) {
          // delete plan from Parse
          return $http.delete(PARSE_URI + 'classes/Plans/' + plan.objectId, PARSE_HEADERS);

      }


        return {
          plansByUser:      plansByUser,
          updatePlanStatus: updatePlanStatus,
          deleteUserPlan:   deleteUserPlan
        }

      }

    ]);

}());
