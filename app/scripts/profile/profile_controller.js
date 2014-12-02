(function () {
  angular.module('myPlanit')
    .controller('ProfileCtrl', ['$scope', '$cookieStore',
      function ($scope, $cookieStore) {

        $scope.currentUsername = $cookieStore.get('currentUser').username;
        console.log($scope.currentUsername);

      }

    ]);

}());
