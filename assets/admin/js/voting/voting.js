'use strict';

/* Controllers */
  // signin controller
app.controller('VotingController', function($scope, $rootScope, $http, $state, $window, $stateParams, $httpParamSerializer, toaster, CatService) {
    var MESSAGE_TITLE = 'Voting';

    $rootScope.page_title = 'Voting Page';

    $scope.cat_list = [];

    // get cat image list
    function getCatImageList() {
        CatService.get(100)
            .then(function(response) {
                console.log(response);                
                sortCatList(response.data.response.data.images.image);
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    getCatImageList();

    function sortCatList(list) {
        var col = 4;
        var length = list.length;
        var total_row_count = (length - 1) / col + 1;
        var q = 0;
        for(var i = 0; i < total_row_count; i++) {
            var row = [];
            for(var j = 0; j < col; j++ )
            {
                if( q >= length )
                    break;

                row.push(list[q]);
                q++;
            }

            $scope.cat_list.push(row);
        }
    }

});