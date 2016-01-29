angular
	.module("remember.attachment")
	.factory("attachmentListLoader", attachmentListLoader);

attachmentListLoader.$inject = ["attachmentDataService", "$q"];

function attachmentListLoader(attachmentDataService, $q){
    return function(){
        var delay = $q.defer();
        
        attachmentDataService.get(function(attachments){
            delay.resolve(attachments);
        }, function(){
            delay.reject("Unable to fetch attachments");
        });
        
        return delay.promise;
    };
}