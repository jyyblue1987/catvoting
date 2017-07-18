'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
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
                    .state('app.voting', {
                        url: '/voting',                        
                        templateUrl: 'assets/admin/tpl/voting/voting.html',
                        resolve: load( [                            
                            'assets/admin/js/voting/voting.js',
                        ] )
                    })    
                    .state('app.results', {
                        url: '/results',                        
                        templateUrl: 'assets/admin/tpl/voting/results.html',
                        resolve: load( [                            
                            'assets/admin/js/voting/results.js',
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