'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', function($scope, $rootScope, $http, $state, AuthService, toaster) {
    var MESSAGE_TITLE = 'Authentifcation';

    $rootScope.page_title = 'Admin Panel';
  
    $scope.login = function() {
      // Try to login
      AuthService.login($scope.email, $scope.password, function (response) {
          if (response.data.code == '200') {
              AuthService.setCredentials(response.data.user);
              console.log(response.data);
              $state.go('app.classes');
              $rootScope.$broadcast('success-login', response.data);
          } else {
              toaster.pop('error', MESSAGE_TITLE, response.data.message);             
          }
      });
    };   

});