// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      moment:         [   'assets/libs/moment/moment.js'],
    }
  )
  .constant('MODULE_CONFIG', [      
      {
          name: 'toaster',
          files: [
              'assets/libs/angularJS-Toaster/toaster.min.js',
              'assets/libs/angularJS-Toaster/toaster.min.css'              
          ]
      },
      {
          name: 'rzModule',
          files: [
              'assets/libs/angularjs-slider/dist/rzslider.min.css',
              'assets/libs/angularjs-slider/dist/rzslider.min.js',
          ]
      },
      {
          name: 'ngFileUpload',
          files: [
              'assets/libs/ng-file-upload-shim/ng-file-upload-shim.js',
              'assets/libs/ng-file-upload/ng-file-upload.js',
          ]
      },
      {
          name: 'daterangepicker',
          files: [
              'assets/libs/bootstrap-daterangepicker/daterangepicker.js',
              'assets/libs/angular-daterangepicker/js/angular-daterangepicker.js',
              'assets/libs/bootstrap-daterangepicker/daterangepicker-bs3.css',
          ]
      },
      {
          name: 'ngBootstrap',
          files: [
              'assets/libs/bootstrap-daterangepicker/daterangepicker.js',
              'assets/libs/angular-daterangepicker/js/angular-daterangepicker.js',
              'assets/libs/bootstrap-daterangepicker/daterangepicker-bs3.css',
          ]
      },
      {
          name: 'angular-highlight',
          files: [                            
              '../libs/angular/angular-highlight/angular-highlight.js',              
          ]
      },
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }]);
