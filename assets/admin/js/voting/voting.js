'use strict';

/* Controllers */
  // signin controller
app.controller('VotingController', function($scope, $rootScope, $http, $state, $window, $stateParams, $httpParamSerializer, toaster, CatService) {
    var MESSAGE_TITLE = 'Voting';

    $rootScope.page_title = 'Voting Page';

    // get cat image list
    function getCatImageList() {
        CatService.get(100)
            .then(function(response) {
                console.log(response);
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    getCatImageList();

    function parseXML() {
        
    }
});