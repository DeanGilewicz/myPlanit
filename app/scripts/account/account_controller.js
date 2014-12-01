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

        // $scope.logout = function () {
        //   AccountFactory.logout();
        // };

      }
    ]);

}());
