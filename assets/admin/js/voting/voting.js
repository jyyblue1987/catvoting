'use strict';

/* Controllers */
  // signin controller
app.controller('VotingController', function($scope, $rootScope, $http, $state, $window, $stateParams, $httpParamSerializer, $timeout, CatService) {
    var MESSAGE_TITLE = 'Voting';

    $rootScope.page_title = 'Voting Page';

    $scope.cat_list = [];
    $scope.score_list = [];

    var cat_image_list = [];

    
    for(var i = 1; i < 11; i++) {
        $scope.score_list.push(i);
    }


    // get cat image list
    function getCatImageList() {
        CatService.get(10)
            .then(function(response) {
                console.log(response);        
                cat_image_list = response.data.response.data.images.image;        
                sortCatList(cat_image_list);
                getVotedList();
                getFavoriteList();
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    getCatImageList();

    function getVotedList() {
        CatService.getvotes()
            .then(function(response) {
                console.log(response);        
                setVoteInfo(response.data.response.data.images.image);                
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    function getFavoriteList() {
        CatService.getfavourites()
            .then(function(response) {
                setFavoriteInfo(response.data.response.data.images.image);
            }).catch(function(response) {

            })
            .finally(function() {
            }); 
    }

    function setVoteInfo(vote_list) {
        if( !vote_list )
            return;

        for(var i = 0; i < cat_image_list.length; i++) {
            var exist = false;
            for(var j = 0; j < vote_list.length; j++) {
                if( cat_image_list[i].id == vote_list[j].id ){
                    cat_image_list[i].score = vote_list[j].score;
                    exist = true;
                    break;
                }
            }

            if( exist == false )
            {
                cat_image_list[i].score = 1;
            }
        }
    }

    function setFavoriteInfo(favourite_list) {
        if( !favourite_list )
            return;

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
            }
        }
    }

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

            CatService.vote(item)
                .then(function(response) {
                    console.log(response);                                    
                }).catch(function(response) {

                })
                .finally(function() {
                });    
        }, 500);
    }

    $scope.onFavorite = function(item) {
        CatService.favourite(item)
            .then(function(response) {
                console.log(response);
                item.favourite = 1 - item.favourite;                                     
            }).catch(function(response) {

            })
            .finally(function() {
            });    
    }
});
