(function () {
  angular.module('myPlanit')
    .controller('AccountCtrl', ['AccountFactory', '$scope',
      function (AccountFactory, $scope) {

        $scope.addUser = function (user) {
          AccountFactory.register(user);
        };

        $scope.login = function (user) {
          AccountFactory.login(user);
        };

        $scope.logout = function () {
          AccountFactory.logout();
        };

      }
    ]);

}());
