'use strict';
app.factory('AuthService',
    ['Base64', '$http', '$rootScope', '$timeout', '$localStorage',
        function (Base64, $http, $rootScope, $timeout, $localStorage) {
            var service = {};
            service.login = function(email, password, callback) {

                /* Use this for real authentication
                 ----------------------------------------------*/
                $http.post('auth/adminlogin', { 'email': email, 'password': password })
                    .then(function (response) {
                        callback(response);
                    }).catch(function(response) {
                        callback(response);
                    })
                    .finally(function() {

                    });
            };
         
            service.setCredentials = function (user) {
                var authdata = Base64.encode(user.id + ':' + user.access_token);

                $rootScope.globals = {
                    currentUser: user
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                //$cookieStore.put('globals', $rootScope.globals);

                $localStorage.globals = $rootScope.globals;
            };

            service.clearCredentials = function () {
                $rootScope.globals = {};
                
                delete $localStorage.globals;

                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            service.isAuthenticated = function() {
                if( $rootScope.globals && $rootScope.globals.currentUser )
                    return true;

                $rootScope.globals = $localStorage.globals;
                if( $rootScope.globals && $rootScope.globals.currentUser )
                    return true;

                return false;
            }
           
            service.getCredentials = function() {
                return $rootScope.globals.currentUser;
            }

            $rootScope.globals = $localStorage.globals;
            if( $rootScope.globals == undefined ) {
                $rootScope.globals = {};
                //alert('session is expired');
            }

            if( service.isAuthenticated() )
            {
                var user = $rootScope.globals.currentUser;
                var authdata = Base64.encode(user.id + ':' + user.access_token);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            }
            return service;
        }]);

app.factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                // window.alert("There were invalid base64 characters in the input text.\n" +
                //     "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                //     "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

    /* jshint ignore:end */
});