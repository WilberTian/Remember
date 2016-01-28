angular
	.module("remember.common")
	.directive("remeAutoFocus", remeAutoFocus);

function remeAutoFocus(){
	var directive = {
        link: link,
        restrict: "A"
    };
	
    return directive;
    
    function link(scope, element, attrs){
        element[0].focus();
    }
}