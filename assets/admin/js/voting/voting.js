'use strict';

/* Controllers */
  // signin controller
app.controller('VotingController', function($scope, $rootScope, $http, $state, $window, $stateParams, $httpParamSerializer, $timeout, toaster, CatService) {
    var MESSAGE_TITLE = 'Voting';

    $rootScope.page_title = 'Voting Page';

    $scope.cat_list = [];

    $scope.score_list = [];

    $scope.voting = {};

    $scope.voting.score = 2;

    $scope.voting_score = 2;

    for(var i = 1; i < 11; i++) {
        $scope.score_list.push(i);
    }


    // get cat image list
    function getCatImageList() {
        CatService.get(10)
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

                list[q].score = 2;    
                list[q].score_is_open = false;    
                row.push(list[q]);
                q++;
            }

            $scope.cat_list.push(row);
        }
    }

    $scope.onChangeScore = function(item) {
        console.log(item);
        
        $timeout(function(){
            item.score_is_open = false;    
        }, 500);
    }
});
