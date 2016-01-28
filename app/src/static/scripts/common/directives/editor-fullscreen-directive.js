angular
	.module("remember.common")
	.directive("remeEditorFullscreen", remeEditorFullscreen);

function remeEditorFullscreen(){
	var directive = {
        link: link,
        restrict: "A"
    };
	
    return directive;
    
    function link(scope, element, attrs) {
        scope.$watch(attrs.remeEditorFullscreen, function(){

        	if(scope.mdEditorconfig.fullscreenMode){
        		$(element[0].firstChild).addClass("CodeMirror-fullscreen");
        		scope.mdEditorconfig.refreshEditor = true;            		
        	}
        	else {
        		$(element[0].firstChild).removeClass("CodeMirror-fullscreen");
        	}
        	
        });
    }
}