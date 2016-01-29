angular
	.module("remember.attachment")
	.controller("AttachmentEditModalController", AttachmentEditModalController);
   
AttachmentEditModalController.$inject =["$scope", "$uibModalInstance", "attachment", "tags"];

function AttachmentEditModalController($scope, $uibModalInstance, attachment, tags) {
    $scope.attachment = _.clone(attachment);

    var tagInfo = {
        "tags": tags,
        "selectedTags": [],
        "toggleSelection": function(id){
            var index = this.selectedTags.indexOf(id);
            if(index > -1){
                this.selectedTags.splice(index, 1);
            }
            else{
                this.selectedTags.push(id);
            }
        }
    };
    tagInfo.selectedTags = _.map(attachment.tags, function(tag){ return tag.id; });
    $scope.tagInfo = tagInfo;
    
    $scope.save = function () {
        $scope.attachment.tags = $scope.tagInfo.selectedTags;
        $uibModalInstance.close($scope.attachment);
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
} 
