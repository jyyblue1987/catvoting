'use strict';

/* Controllers */
  // signin controller
app.controller('BookingController', function($scope, $rootScope, $http, $state, $window, $stateParams, $httpParamSerializer, AuthService, toaster) {
    var MESSAGE_TITLE = 'Classes';

    $rootScope.page_title = 'Booking Page';

    $scope.datePicker = {};

    var start_date = moment().add(-1, 'days').format('YYYY-MM-DD');
    var end_date = moment().add(7, 'days').format('YYYY-MM-DD');

    $scope.datePicker.date = {startDate: start_date, endDate: end_date};
    
    var class_id = $stateParams.class_id;
    $scope.class_id = class_id;

    $scope.options = {
        applyClass: 'btn-green',
        locale: {
          applyLabel: "Apply",
          fromLabel: "From",
          // format: "YYYY-MM-DD", //will give you 2017-01-06
          format: "D-MMM-YY", //will give you 6-Jan-17
          //format: "D-MMMM-YY", //will give you 6-January-17
          toLabel: "To",
          cancelLabel: 'Cancel',
          customRangeLabel: 'Custom range'
        },
        ranges: {
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Next 7 Days': [moment(), moment().subtract(6, 'days')],            
        }
    }

    function getClassList() {
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
                var alloption = {id: '0', name : 'All Classes'};
                $scope.class_list.unshift(alloption);
            }).catch(function(response) {

            })
            .finally(function() {
            });
            
    } 

    function getBookingList() {
        var profile = AuthService.getCredentials();

        var request = {};
        request.class_id = $scope.class_id;
        request.start_date = $scope.datePicker.date.startDate;
        request.end_date = $scope.datePicker.date.endDate;

        $http({
            method: 'POST',
            url: 'booking/allbyclass',
            data: request,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(function(response) {
                $scope.booking_list = response.data;
            }).catch(function(response) {

            })
            .finally(function() {
            });
            
    }  

    getClassList();
    getBookingList();

    $scope.onChangeClass = function() {
        getBookingList();
    }

    $scope.$watch('datePicker.date', function(newValue, oldValue) {
        if( newValue == oldValue )
            return;

        getBookingList();
    });

    $scope.onFinishBooking = function(row) {

        bootbox.confirm({ 
            size: "medium",
            message: "Are you sure?", 
            callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
                if( result )
                {
                    finishBooking(row);
                }
            }
        });  

       
    }

    function finishBooking(row) {
        var profile = AuthService.getCredentials();

        var request = {};
        request.id = row.id;
        
        $http({
            method: 'POST',
            url: 'booking/finish',
            data: request,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(function(response) {
                row.done_flag = 1;
            }).catch(function(response) {

            })
            .finally(function() {
            });
    }

    $scope.onDownloadPDF = function(){
        var request = {};
        request.class_id = $scope.class_id;
        request.start_date = $scope.datePicker.date.startDate;
        request.end_date = $scope.datePicker.date.endDate;

        $window.location.href = 'booking/pdf?' + $httpParamSerializer(request);
    }
});