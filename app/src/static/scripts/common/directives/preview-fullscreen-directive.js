angular
	.module("remember.common")
	.directive("remePreviewFullscreen", remePreviewFullscreen);

function remePreviewFullscreen(){
	var directive = {
        link: link,
        restrict: "A"
    };
	
    return directive;
    
    function link(scope, element, attrs) {
        scope.$watch(attrs.remePreviewFullscreen, function(){
        	
        	if(scope.mdEditorconfig.fullscreenMode){
        		$(element[0]).addClass("CodeMirror-preview-fullscreen");
        	}
        	else {
        		$(element[0]).removeClass("CodeMirror-preview-fullscreen");
        	}
        	
        });
    }
}