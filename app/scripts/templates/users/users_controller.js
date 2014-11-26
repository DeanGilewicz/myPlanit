(function () {
  angular
  .module('myApp')
  .controller('UserCtrl', ['UserFactory', '$scope',
    function (UserFactory, $scope) {

      $scope.addUser = function (user) {
        UserFactory.register(user);
      };
      
      $scope.login = function (user) {
        UserFactory.login(user);
      };

      $scope.logout = function () {
        UserFactory.logout();
      };

      // Check User on App Load
      UserFactory.checkUser();

    }
    ]);

}());
