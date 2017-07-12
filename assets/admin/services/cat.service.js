'use strict';
app.factory('CatService',

    function ($http, $rootScope, $timeout) {
        var service = {};

        var API_URL = 'http://thecatapi.com/api';
        var api_key = 'MjAyOTE0';
        var sub_id = '100';

        service.get = function(page) {
            return $http.get(API_URL + '/images/get?format=xml&results_per_page=' + page,
                {
                    transformResponse: function (cnv) {
                        var x2js = new X2JS();
                        var aftCnv = x2js.xml_str2json(cnv);
                        return aftCnv;
                    }
                });                
        };
     
        return service;
    });
