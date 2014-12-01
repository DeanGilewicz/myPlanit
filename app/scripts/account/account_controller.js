(function () {
  angular.module('myPlanit')
    .controller('AccountCtrl', ['AccountFactory', '$scope',
      function (AccountFactory, $scope) {

        $scope.signUp = function (user) {
          AccountFactory.signUp(user);
        };

        $scope.login = function (user) {
          AccountFactory.login(user);
        };

        // directive is being run for logout button, which is linked to factory
        // don't need this function but keeps it accessible should need to use later
        $scope.logout = function () {
          AccountFactory.logout();
        };

      }
    ]);

}());
