(function () {
  angular.module('myPlanit')
    .controller('MainCtrl', ['MainFactory', '$rootScope', '$scope',
      function (MainFactory, $rootScope, $scope) {

        // call fucntion to get plans by current user
        MainFactory.allPublishedPlans().success( function (data) {
          // set scope so can be accessed
          $scope.allPublishedPlans = data.results;
        });

      }

    ]);

}());
