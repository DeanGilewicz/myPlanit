(function () {
  angular.module('myPlanit')
    .controller('ProfileCtrl', ['ProfileFactory', 'AccountFactory', '$scope',
      function (ProfileFactory, AccountFactory, $scope) {


        $scope.user.username = AccountFactory.user.username


      }

    ]);

}());
