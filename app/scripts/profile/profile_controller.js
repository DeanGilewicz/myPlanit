(function () {
  angular.module('myPlanit')
    .controller('ProfileCtrl', ['ProfileFactory', '$scope', '$cookieStore',
      function (ProfileFactory, $scope, $cookieStore) {

        // call fucntion to get plans by current user
        ProfileFactory.plansByUser().success( function (data) {
          console.log(data);
          // set scope so can be accessed
          $scope.userPlans = data.results;
        });

        // set current username so can be accessed
        $scope.currentUsername = $cookieStore.get('currentUser').username;
        console.log($scope.currentUsername);


        // call func to update status of the plan so will either show or won't show on homepage
        $scope.updatePlanStatus = function (plan, userPlans) {
          console.log(userPlans);
          // call func
          ProfileFactory.updatePlanStatus(plan, userPlans);
        }


        // call func to delete user plan - only on success visually update view to remove plan
        $scope.deleteUserPlan = function (plan) {
          console.log(plan);
          // call func delete user passing in the specific plan
          ProfileFactory.deleteUserPlan(plan).success( function () {
            // remove the poi based on it's obj id (list in view)
            $('li#' + plan.objectId).remove();
          });
        }
    }

  ]);

}());
