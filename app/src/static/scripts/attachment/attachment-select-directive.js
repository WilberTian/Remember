angular
	.module("remember.attachment")
	.directive("remeAttachmentSelect", remeAttachmentSelect);

function remeAttachmentSelect(){
	var directive = {
		scope: true,  
        link: link,
        restrict: "A"
    };
	
    return directive;
    
    function link(scope, element, attrs) {
        element.bind("change", function (event) {
            var files = event.target.files;
            //iterate files since "multiple" may be specified on the element
            for (var i = 0; i < files.length; i++) {
                //emit event upward
                scope.$emit("fileSelected", { file: files[i] });
            }                                       
        });
    }
}