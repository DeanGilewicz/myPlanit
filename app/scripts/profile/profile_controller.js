(function () {
  angular.module('myPlanit')
    .controller('ProfileCtrl', ['AccountFactory', '$scope', '$cookieStore',
      function (AccountFactory, $scope, $cookieStore) {


        $scope.currentUsername = AccountFactory.$cookieStore.get('currentUser' + data);
        console.log($scope.currentUsername);

      }

    ]);

}());
