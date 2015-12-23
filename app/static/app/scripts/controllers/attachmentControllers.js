app.controller("AttachmentController", function($scope, Attachment, AttachmentUploader, attachments, tags){
    $scope.attachments = attachments["attachments"];
    $scope.tags = tags["tags"];
    $scope.fileObjs = [];
    $scope.remveFileObj = function(index){
        $scope.fileObjs.splice(index, 1);
    }
    $scope.clearFileObjs = function(){
        $scope.fileObjs = [];
    }

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            var fileObj = {
                "file": args.file,
                "status": "Pending",
                "tagInfo": {
                    "selectedTags": [],
                    "toggleSelection": function(id){
                        var index = this.selectedTags.indexOf(id);
                        if(index > -1){
                            this.selectedTags.splice(index, 1)
                        }
                        else{
                            this.selectedTags.push(id);
                        }
                    }
                }
            };
            
            $scope.fileObjs.push(fileObj);
        });
    });
    
    $scope.attachmentOperations = {
        "createAttachment": function(index){
            $scope.fileObjs[index].status = "loading";
            AttachmentUploader($scope.fileObjs[index]).
                success(function(data){
                    $scope.attachments.push(data["attachment"]);
                    $scope.fileObjs[index].status = "success";
                }).
                error(function(){
                    $scope.fileObjs[index].status = "danger";
                });

        },
        "deleteAttachment": function(id, index){
            Attachment.delete({id: id}).$promise.then(
                function(response){
                    $scope.attachments.splice(index, 1);
                },
                function(){
                    alert("fail to delete attachment");
                }
            );
        },
        "updateAttachment": function(index){
            var attachment = $scope.attachments[index];
        
            if(attachment.id == -1){
                // create a new attachment
                delete attachment["id"];
                Attachment.save(attachment).$promise.then(
                    function(response){
                        console.log(response);
                        $scope.attachments[index] = response["attachment"];
                    },
                    function(){
                        alert("fail to create attachment");
                    }
                );
            }
            else{
                // update the attachment
                Attachment.update({ id: attachment.id }, attachment).$promise.then(
                    function(response){
                        console.log(response);

                    },
                    function(){
                        alert("fail to update attachment");
                    }
                );
                
                
            }
        },
        "removeUnusedRow": function(index, attachment){
            if(attachment.id == -1){
                $scope.attachments.splice(index, 1);
            }
        }
    };

    
});


