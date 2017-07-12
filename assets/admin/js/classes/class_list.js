'use strict';

/* Controllers */
  // signin controller
app.controller('ClassListController', function($scope, $rootScope, $http, $state, AuthService, Upload, toaster) {
    var MESSAGE_TITLE = 'Classes';

    $rootScope.page_title = 'Welcome';
    $scope.classes = {};

    $scope.year_group_list = ['1', '2', '3', '4', '5', '6'];
    $scope.classes.year_group = '1';
  
  	function getClassesList() {
  		var profile = AuthService.getCredentials();

  		var request = {};
  		request.year_group = 0;

	    $http({
	        method: 'POST',
	        url: 'classes/all',
	        data: request,
	        headers: {'Content-Type': 'application/json; charset=utf-8'}
	    })
	        .then(function(response) {
	            $scope.class_list = response.data;
	        }).catch(function(response) {

	        })
	        .finally(function() {
	        });

    }    

    function clearInputFields() {
        $scope.classes = {};
        $scope.classes.id = 0;
        $scope.classes.year_group = '1';
        $scope.classes.name = '';                 
    }

    getClassesList();
    clearInputFields();

    $scope.onSetPassword = function(row) {
    	bootbox.prompt({ 
			size: "medium",
			title: "Please input password.", 
			callback: function(result){ 
				if(result == "" || result == null)
					return;
				setPassword(row, result);
			}
		});
    }

    function setPassword(row, password) {
    	var request = {};
  		request.year_group = row.year_group;
  		request.password = password;

	    $http({
	        method: 'POST',
	        url: 'classes/setpassword',
	        data: request,
	        headers: {'Content-Type': 'application/json; charset=utf-8'}
	    })
	        .then(function(response) {
                row.password = password;
                bootbox.alert("Password is changed successfully"); 
	        }).catch(function(response) {

	        })
	        .finally(function() {
	        });

    }

    $scope.uploadFile = function (file, row) {
    	if(file == null || file.length < 1)
    		return;
        Upload.upload({
                url: '/classes/importchildrens',
                data: {
                    class_id: row.id,
                    myfile: file[0]
                }
            }).then(function (response) {
                console.log(response.data);
                if( response.data.code == 200 )
                {
                    row.cnt = response.data.child_list.length;
                    bootbox.alert("Children List is imported successfully");    
                }
                else
                {
                    bootbox.alert(response.data.error.error);
                }
                
            }, function (response) {
                $scope.progress = 0;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
    };

    $scope.onEditClasses = function(row) {
        $scope.classes = angular.copy(row);
    }

    $scope.onDeleteClasses = function(row) {
        bootbox.confirm({ 
            size: "medium",
            message: "Are you sure?", 
            callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
                if( result )
                {
                    deleteClasses(row)
                }
            }
        });     
    }

    function deleteClasses(row) {
        var profile = AuthService.getCredentials();

        var request = {};
        request.id = row.id;
        request.year_group = 0;

        $http({
            method: 'POST',
            url: 'classes/delete',
            data: request,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(function(response) {
                $scope.class_list = response.data;
            }).catch(function(response) {

            })
            .finally(function() {
            });
    }
    
    $scope.onAddClass = function() {
    	bootbox.confirm({ 
            size: "medium",
            message: "Are you sure?", 
            callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
                if( result )
                {
                    addClasses()
                }
            }
        });     
    }

    function addClasses(name) {
        var request = $scope.classes;
        
        var url = 'classes/add';
        if( $scope.classes.id > 0 ) 
            url = 'classes/update';

        $http({
            method: 'POST',
            url: url,
            data: request,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(function(response) {
                if( response.data.code == 200 )
                {
                    getClassesList();
                    clearInputFields();    
                    toaster.pop('success', response.data.message);
                }
                else
                    toaster.pop('error', response.data.message);
            }).catch(function(response) {

            })
            .finally(function() {
            });

    }

    $scope.onCancelClasses = function() {
        clearInputFields();
    }

    $scope.onGoTimeSlot = function(row) {
        $state.go('app.timeslot', {class_id: row.id});     
    }

    $scope.onGoBooking = function(row) {
        $state.go('app.booking', {class_id: row.id});     
    }

});