(function () {
  angular.module('myPlanit')
    .controller('MainCtrl', ['$scope', 'MainFactory', '$rootScope',
      function ($scope, MainFactory, $rootScope) {

        MainFactory.getPlans().success( function (data) {
          $scope.plans = data;
        });

      }

    ]);

}());
