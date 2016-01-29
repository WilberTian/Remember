angular
	.module("remember.attachment")
	.factory("attachmentUploader", attachmentUploader);

attachmentUploader.$inject = ["$http"];

function attachmentUploader($http) {
    return function(attachment){
        var fd = new FormData();
        fd.append("file", attachment.file);
        fd.append("tags", attachment.tagInfo.selectedTags);
        
        return $http.post("/remember/api/v1.0/attachments", fd, {
            transformRequest: angular.identity,
            headers: {"Content-Type": undefined}
        });
    };
}