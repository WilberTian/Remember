angular
	.module("remember.attachment")
	.factory("attachmentDataService", attachmentDataService);

attachmentDataService.$inject = ["$resource"];

function attachmentDataService($resource){
    return $resource("/remember/api/v1.0/attachments/:id", {id: "@id"}, { update: { method: "PUT" }});
}