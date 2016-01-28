angular
	.module("remember.common")
	.directive("remeMarkdownConvert", remeMarkdownConvert);

function remeMarkdownConvert(){
	var converter = new showdown.Converter();
	
	var directive = {
        link: link,
        restrict: "A"
    };
	
    return directive;
    
    function link(scope, element, attrs) {
        function renderMarkdown() {
            var htmlText = converter.makeHtml(scope.$eval(attrs.remeMarkdownConvert)  || "");
            element.html(htmlText);
        }
        scope.$watch(attrs.remeMarkdownConvert, renderMarkdown);
        renderMarkdown();
    }
}