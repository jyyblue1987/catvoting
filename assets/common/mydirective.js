angular.module('app')
.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function(html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
})
// .directive('contenteditable', function() {
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ctrl) {
//             // view -> model
//             elm.bind('blur', function() {
//                 scope.$apply(function() {
//                     ctrl.$setViewValue(elm.html());
//                 });
//             });

//             // model -> view
//             ctrl.$render = function() {
//                 elm.html(ctrl.$viewValue);
//             };

//             // load init value from DOM
//             ctrl.$setViewValue(elm.html());
//         }
//     };
// })
.directive("quickEdit", function($parse) {
    return {
        restrict: 'A',
        require: "?ngModel", // require ngModel on the same HTML element as quickEdit      
        // scope: {
        //     onTextSelect:"&"
        //   },
        link: function(scope, element, attrs, ngModel) {
            ngModel.$render = function() {
                element.text(ngModel.$viewValue || '');
            };


            // add HTML5 "contentEditable" attribute with value "true" on double click
            // this will make field editable
            element.dblclick(function() {
                $(this).attr("contentEditable", "true");
                $(this).focus();
            });

            element.click(function() {                
                if( $(this).attr("contentEditable") == "true" )
                {
                    var html = "";
                    if (typeof window.getSelection != "undefined") {
                        var sel = window.getSelection();
                        if (sel.rangeCount) {
                            var container = document.createElement("div");
                            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                                container.appendChild(sel.getRangeAt(i).cloneContents());
                            }
                            html = container.innerHTML;
                        }
                    } else if (typeof document.selection != "undefined") {
                        if (document.selection.type == "Text") {
                            html = document.selection.createRange().htmlText;
                        }
                    }

                    if( !html || html.length < 1 )
                    {
                        event.preventDefault();
                        return; 
                    }

                    var onSelectCallback = $parse(attrs.onTextSelect);
                    onSelectCallback(scope, {$text: html});
                }                    
                
                event.preventDefault();
            });

            // handling "return/enter" and "escape" key press
            element.bind('keydown', function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                // on "enter" set "contentEditable" to "false" to make field not-editable again
                // and call "read" method which is responsible for setting new value to the object in ngModel
                if (keycode === 13) { // ENTER
                    $(this).attr("contentEditable", "false");
                    $(this).blur();
                    event.preventDefault();
                    read();
                }
                // on "escape"and set the text in the element back to the original value
                // and set "contentEditable" to "false" to make field not-editable again
                if (keycode === 27) { // ESCAPE
                    element.text(ngModel.$viewValue);
                    $(this).attr("contentEditable", "false");
                    $(this).blur();
                }
            });

            // this is called to update the value in the object after edit
            function read() {
                var text = element.text();
                ngModel.$setViewValue(text);
            }
        }
    };
})
.directive('fillHeight', ['$window', '$document', '$timeout', function ($window, $document, $timeout) {
        return {
            restrict: 'A',
            scope: {
                footerElementId: '@',
                additionalPadding: '@',
                debounceWait: '@'
            },
            link: function (scope, element, attrs) {
                if (scope.debounceWait === 0) {
                    angular.element($window).on('resize', windowResize);
                } else {
                    // allow debounce wait time to be passed in.
                    // if not passed in, default to a reasonable 250ms
                    angular.element($window).on('resize', debounce(onWindowResize, scope.debounceWait || 250));
                }
                
                onWindowResize();
                
                // returns a fn that will trigger 'time' amount after it stops getting called.
                function debounce(fn, time) {
                    $timeout(fn, time);
                    // var timeout;
                    // // every time this returned fn is called, it clears and re-sets the timeout
                    // return function() {
                    //     var context = this;
                    //     // set args so we can access it inside of inner function
                    //     var args = arguments;
                    //     var later = function() {
                    //         timeout = null;
                    //         fn.apply(context, args);
                    //     };
                    //     $timeout.cancel(timeout);
                    //     timeout = $timeout(later, time);
                    // };
                }
                
                function onWindowResize() {
                    var footerElement = angular.element($document[0].getElementById(scope.footerElementId));
                    var footerElementHeight;

                    if (footerElement.length === 1) {
                        footerElementHeight = footerElement[0].offsetHeight
                              + getTopMarginAndBorderHeight(footerElement)
                              + getBottomMarginAndBorderHeight(footerElement);
                    } else {
                        footerElementHeight = 0;
                    }

                    var elementOffsetTop = element[0].offsetTop;
                    var elementBottomMarginAndBorderHeight = getBottomMarginAndBorderHeight(element);

                    var additionalPadding = scope.additionalPadding || 0;

                    var elementHeight = $window.innerHeight
                                        - elementOffsetTop
                                        - elementBottomMarginAndBorderHeight
                                        - footerElementHeight
                                        - additionalPadding;
                    element.css('height', elementHeight + 'px');
                    element.css('overflow-y', 'auto');
                }

                function getTopMarginAndBorderHeight(element) {
                    var footerTopMarginHeight = getCssNumeric(element, 'margin-top');
                    var footerTopBorderHeight = getCssNumeric(element, 'border-top-width');
                    return footerTopMarginHeight + footerTopBorderHeight;
                }

                function getBottomMarginAndBorderHeight(element) {
                    var footerBottomMarginHeight = getCssNumeric(element, 'margin-bottom');
                    var footerBottomBorderHeight = getCssNumeric(element, 'border-bottom-width');
                    return footerBottomMarginHeight + footerBottomBorderHeight;
                }

                function getCssNumeric(element, propertyName) {
                    return parseInt(element.css(propertyName), 10) || 0;
                }
            }
        };
    }]);
