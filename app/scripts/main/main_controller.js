(function () {
  angular.module('myPlanit')
    .controller('MainCtrl', ['MainFactory', '$rootScope', '$scope',
      function (MainFactory, $rootScope, $scope) {

        MainFactory.getPlans().success( function (data) {
          $scope.plans = data;
        });

      }

    ]);

}());
