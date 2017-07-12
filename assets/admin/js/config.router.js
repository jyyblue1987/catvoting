'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        [          '$rootScope', '$state', '$stateParams', 'AuthService',
            function ($rootScope,   $state,   $stateParams, AuthService) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {
                });

            }
        ]
    )
    .config(
        [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
            function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {

                var layout = "assets/admin/tpl/layout/app.layout.html";
                $urlRouterProvider
                    .otherwise('/app/voting');

                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: layout
                    })             
                    .state('access', {
                        url: '/access',
                        templateUrl: layout
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'assets/admin/tpl/signin/page_signin.html',
                        resolve: load( [
                            'toaster',
                            'assets/admin/js/signin/signin.js',
                        ] )
                    })                    
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/page_404.html'
                    })  
                    .state('app.classes', {
                        url: '/classes',
                        templateUrl: 'assets/admin/tpl/classes/class_list.html',
                        resolve: load( [
                            'toaster', 'ngFileUpload',
                            'assets/admin/js/classes/class_list.js',
                        ] )
                    })  
                    .state('app.timeslot', {
                        url: '/timeslot/:class_id',                        
                        templateUrl: 'assets/admin/tpl/timeslot/timeslot.html',
                        resolve: load( [
                            'toaster', 'moment', 'rzModule',
                            'assets/admin/js/timeslot/timeslot.js',
                        ] )
                    })            
                    .state('app.booking', {
                        url: '/booking/:class_id',                        
                        templateUrl: 'assets/admin/tpl/booking/booking.html',
                        resolve: load( [
                            'toaster', 'moment', 'daterangepicker',
                            'assets/admin/js/booking/booking.js',
                        ] )
                    })      
                    .state('app.voting', {
                        url: '/voting',                        
                        templateUrl: 'assets/admin/tpl/voting/voting.html',
                        resolve: load( [
                            'toaster', 'moment', 'daterangepicker',
                            'assets/admin/js/voting/voting.js',
                        ] )
                    })         
                    ;                    
                    

                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function( $ocLazyLoad, $q ){
                                var deferred = $q.defer();
                                var promise  = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if(!promise){
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function(src) {
                                    promise = promise.then( function(){
                                        if(JQ_CONFIG[src]){
                                            return $ocLazyLoad.load(JQ_CONFIG[src]);
                                        }
                                        angular.forEach(MODULE_CONFIG, function(module) {
                                            if( module.name == src){
                                                name = module.name;
                                            }else{
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    } );
                                });
                                deferred.resolve();
                                return callback ? promise.then(function(){ return callback(); }) : promise;
                            }]
                    }
                }


            }
        ]
    );