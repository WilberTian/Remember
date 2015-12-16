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