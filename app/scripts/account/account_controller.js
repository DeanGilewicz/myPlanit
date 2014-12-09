(function () {
  angular.module('myPlanit')
    .controller('AccountCtrl', ['AccountFactory', '$scope', '$cookieStore',
      function (AccountFactory, $scope, $cookieStore) {

        $scope.signUp = function (user) {
          AccountFactory.signUp(user);
        };

        $scope.login = function (user) {
          AccountFactory.login(user);
        };

        // directive is being run for logout button, which is linked to factory
        $scope.logout = function (user) {
          AccountFactory.logout(user);
        };

        // set current username so can be accessed
        var currentUser = $cookieStore.get('currentUser');
          if(currentUser) {
            $scope.currentUsername = currentUser.username;
          }
      }
    ]);

}());
