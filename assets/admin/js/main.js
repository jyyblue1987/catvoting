'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl',
        function(  $rootScope, $scope,   $localStorage, $window, $state, $http, $interval, $timeout, AuthService, Base64) {
            $scope.auth_svc = AuthService;

            $rootScope.page_title = '';

            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            if(isIE){ angular.element($window.document.body).addClass('ie');}
            if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};
                         

            function isSmartDevice( $window )
            {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

            //====== Authentifcation ====================================================
            if( AuthService.isAuthenticated() )
            {
                $rootScope.profile = AuthService.getCredentials();
            }

            $scope.logout = function () {
                var profile = AuthService.getCredentials();

                var request = {};
                request.user_id = profile.id;
                $http({
                    method: 'POST',
                    url: '/frontend/logout',
                    data: request,
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                }).then(function(response) {

                });
                
                AuthService.ClearCredentials();

                $state.go('access.signin');
            }

            $scope.server_param = {};
            $scope.init = function(server_param) {
                if( !server_param )
                    return;

                server_param = Base64.decode(server_param);
                $scope.server_param = JSON.parse(server_param);
            }
            //==============================================================================
            

            // ============= after login action ============================
            $scope.$on('success-login', function(event, args) {
                console.log(args);

                onLoginSuccess(args);
            });     

            function onLoginSuccess(data) {
               
            }
     

            $window.onfocus = function() {
                console.log('enter');
            }
        });
