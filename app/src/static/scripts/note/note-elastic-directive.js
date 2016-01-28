angular
	.module("remember.note")
	.directive("remeNoteElastic", remeNoteElastic);

remeNoteElastic.$inject = ["$timeout"];

function remeNoteElastic($timeout){
	var directive = {
        link: link,
        restrict: "A"
    };
	
    return directive;
    
    function link(scope, element) {
        
        scope.initialHeight = scope.initialHeight || element[0].style.height;
        var resize = function() {
            element[0].style.height = scope.initialHeight;
            element[0].style.height = "" + (element[0].scrollHeight + 10) +  "px";

        };
        element.on("input change", resize);

        $timeout(resize, 0);
    }
}