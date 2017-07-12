'use strict';

/* Controllers */
  // signin controller
app.controller('TimeslotController', function($scope, $rootScope, $http, $state, $stateParams, AuthService, toaster) {
    var MESSAGE_TITLE = 'Classes';

    $rootScope.page_title = 'Welcome';
    

    var class_id = $stateParams.class_id;

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
	            setDefaultClasses();	           
	        }).catch(function(response) {

	        })
	        .finally(function() {
	        });
    }    

    function setDefaultClasses() {
    	$scope.timeslot = {};

    	$scope.timeslot.id = 0;

    	$scope.timeslot.options = {
		    translate: function(value) {
		      	return moment("2015-01-01").startOf('day')
						    .minutes(value)
						    .format('hh:mm A');
		    }
	  	}

	    $scope.timeslot.minValue = 60 * 16;
	    $scope.timeslot.maxValue = 60 * 20;
	    $scope.timeslot.slot_length = 20;

	    $scope.timeslot.start_time = moment().startOf('day')
						    .minutes($scope.timeslot.minValue);
		$scope.timeslot.end_time = moment().startOf('day')
						    .minutes($scope.timeslot.maxValue);				    
						    

	    $scope.timeslot.date = moment().toDate();
	    $scope.class_info = {};

        for(var i = 0; i < $scope.class_list.length; i++) 
        {
        	if( $scope.class_list[i].id == class_id)
        	{
        		$scope.timeslot.class_id = class_id;
        		$scope.timeslot.class_name = $scope.class_list[i].name;
        		$scope.class_info = $scope.class_list[i];
        		break;
        	}
        }
    }

    function getTimeslotList() {
  		var profile = AuthService.getCredentials();

  		var request = {};
  		request.year_group = 0;

	    $http({
	        method: 'POST',
	        url: 'timeslot/all',
	        data: request,
	        headers: {'Content-Type': 'application/json; charset=utf-8'}
	    })
	        .then(function(response) {
	            $scope.timeslot_list = response.data;
	        }).catch(function(response) {

	        })
	        .finally(function() {
	        });
	        
    }  

    getClassesList();
    getTimeslotList();


    $scope.onSelectClass = function($item, $model, $label) {  
    	$scope.class_info = $item;
    }

     $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        dateDisabled: disabled,
        class: 'datepicker'
    };

    function disabled(data) {
	    var date = data.date,
	    mode = data.mode;

	    var sel_date = moment(date).format('YYYY-MM-DD');
	    var disabled = true;

	    if( moment().format('YYYY-MM-DD') <= sel_date )
            disabled = false;
        else
            disabled = true;

	    return mode === 'day' && disabled;
	}

	$scope.onCancelTimeSlot = function() {
		setDefaultClasses();
	}

	$scope.onAddTimeSlot = function() {
		bootbox.confirm({ 
            size: "medium",
            message: "Are you sure?", 
            callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
                if( result )
                {
                    addTimeSlot();
                }
            }
        });     
	}

	function addTimeSlot() {
		var profile = AuthService.getCredentials();

  		var request = {};

  		var url = 'timeslot/add';
        if( $scope.timeslot.id > 0 ) 
        {
        	request.id = $scope.timeslot.id;
            url = 'timeslot/update';
        }

  		request.year_group = $scope.class_info.year_group;
  		request.class_id = $scope.class_info.id;
  		request.slot_length = $scope.timeslot.slot_length;
  		request.start_time = moment($scope.timeslot.date).format('YYYY-MM-DD') + " " + moment($scope.timeslot.start_time).format('HH:mm:ss');
  		request.end_time = moment($scope.timeslot.date).format('YYYY-MM-DD') + " " + moment($scope.timeslot.end_time).format('HH:mm:ss');

	    $http({
	        method: 'POST',
	        url: url,
	        data: request,
	        headers: {'Content-Type': 'application/json; charset=utf-8'}
	    })
	        .then(function(response) {
	            if( response.data.code == 200 )
                {
                	getTimeslotList();
                    toaster.pop('success', response.data.message);
                    
                    setDefaultClasses();
                }
                else
                    toaster.pop('error', response.data.message);

	        }).catch(function(response) {

	        })
	        .finally(function() {
	        });
	}

    $scope.onEditTimeSlot = function(row) {
    	$scope.timeslot.id = row.id;
    	$scope.timeslot.date = moment(row.start_time).toDate();
    	$scope.timeslot.slot_length = Number(row.slot_length);

    	var start_time = moment(row.start_time);    	
    	var end_time = moment(row.end_time);    	
        $scope.timeslot.start_time = start_time;
	    $scope.timeslot.end_time = end_time;
	    $scope.class_info = {};

        for(var i = 0; i < $scope.class_list.length; i++) 
        {
        	if( $scope.class_list[i].id == row.class_id)
        	{
        		$scope.timeslot.class_id = class_id;
        		$scope.timeslot.class_name = $scope.class_list[i].name;
        		$scope.class_info = $scope.class_list[i];
        		break;
        	}
        }
    }

	$scope.onDeleteTimeSlot = function(row) {
		bootbox.confirm({ 
		  	size: "medium",
		  	message: "Are you sure?", 
		  	callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
		  		if( result )
		  		{
		  			deleteTimeSlot(row)
		  		}
			}
		});		
	}

	function deleteTimeSlot(row) {
		var profile = AuthService.getCredentials();

  		var request = {};
  		request.id = row.id;

	    $http({
	        method: 'POST',
	        url: 'timeslot/delete',
	        data: request,
	        headers: {'Content-Type': 'application/json; charset=utf-8'}
	    })
	        .then(function(response) {
	            $scope.timeslot_list = response.data;
	        }).catch(function(response) {

	        })
	        .finally(function() {
	        });
	}
});