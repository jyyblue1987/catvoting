'use strict';

/* Controllers */
  // signin controller
app.controller('ResultController', function($scope, $rootScope, $http, $state, $window, $stateParams, $httpParamSerializer, $timeout, CatService) {
    var MESSAGE_TITLE = 'Voting';

    $rootScope.page_title = 'Result Page';

    $scope.like_list = [];
    $scope.dislike_list = [];
    
    $scope.like_count = 0;
    $scope.dislike_count = 0;
    $scope.total_count = 0;

    var cat_image_list = [];

    // get cat image list
    function getCatImageList() {
        CatService.get(10)
            .then(function(response) {
                console.log(response);        
                cat_image_list = response.data.response.data.images.image;                                    
                getLikeList();
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    getCatImageList();


    function getLikeList() {
        CatService.getfavourites()
            .then(function(response) {
                setFavoriteInfo(response.data.response.data.images.image);
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    function setFavoriteInfo(favourite_list) {
        if( !favourite_list )
            return;

        var dislike_list = [];

        for(var i = 0; i < cat_image_list.length; i++) {
            var exist = false;
            for(var j = 0; j < favourite_list.length; j++) {
                if( cat_image_list[i].id == favourite_list[j].id ){
                    cat_image_list[i].favourite = 1;
                    exist = true;
                    break;
                }
            }

            if( exist == false )
            {                
                cat_image_list[i].favourite = 0;
                dislike_list.push(cat_image_list[i]);
            }
        }

        for(var i = 0; i < favourite_list.length; i++)
            favourite_list[i].favourite = 1;

        sortCatList($scope.like_list, favourite_list);
        sortCatList($scope.dislike_list, dislike_list);

        $scope.like_count = favourite_list.length;
        $scope.dislike_count = dislike_list.length;
        $scope.total_count = favourite_list.length + dislike_list.length;
    }

    function sortCatList(src, list) {
        var col = 3;
        var length = list.length;
        var total_row_count = (length - 1) / col + 1;
        var q = 0;
        for(var i = 0; i < total_row_count; i++) {
            var row = [];
            for(var j = 0; j < col; j++ )
            {
                if( q >= length )
                    break;

                list[q].score_is_open = false;    
                row.push(list[q]);
                q++;
            }

            src.push(row);
        }
    }
});
