var directives = angular.module("remember.directives", []);

directives.directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            function renderMarkdown() {
                var htmlText = converter.makeHtml(scope.$eval(attrs.markdown)  || '');
                element.html(htmlText);
            }
            scope.$watch(attrs.markdown, renderMarkdown);
            renderMarkdown();
        }
    };
});

          
directives.directive("autofocus", function(){
    return{
        link: function(scope, element, attrs){
            element[0].focus();
        }
    };
});          


directives.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + (element[0].scrollHeight + 10) +  "px";
                };
                element.on("input change", resize);

                $timeout(resize, 0);
            }
        };
    }
]);