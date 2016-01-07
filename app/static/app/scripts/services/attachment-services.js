var attachmentServices = angular.module("remember.attachmentServices", ["ngResource"]);

attachmentServices.factory("attachmentDataService", function($resource){
    return $resource("/remember/api/v1.0/attachments/:id", {id: "@id"}, { update: { method: "PUT" }});
});     

attachmentServices.factory("attachmentListLoader", function(attachmentDataService, $q){
    return function(){
        var delay = $q.defer();
        
        attachmentDataService.get(function(attachments){
            delay.resolve(attachments);
        }, function(){
            delay.reject("Unable to fetch attachments");
        });
        
        return delay.promise;
    }
});    

attachmentServices.factory('attachmentUploader', function ($http) {
    return function(attachment){
        var fd = new FormData();
        fd.append("file", attachment.file);
        fd.append("tags", attachment.tagInfo.selectedTags);
        
        return $http.post("/remember/api/v1.0/attachments", fd, {
            transformRequest: angular.identity,
            headers: {"Content-Type": undefined}
        })
    }
});
