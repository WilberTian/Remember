angular
	.module("remember.tag")
	.controller("TagInfoController", TagInfoController);

TagInfoController.$inject = ["$scope", "confirmModalService", "tagDataService", "alertService", "tags"];

function TagInfoController($scope, confirmModalService, tagDataService, alertService, tags){
    $scope.tags = tags["tags"];
    
    $scope.tagOperations = {
        "createTag": function(){
            $scope.inserted = {
                "id": -1,
                "name": "Not set"
            };
            $scope.tags.push($scope.inserted);
            
        },
        "deleteTag": function(id, index){
        	
        	var modalOptions = {
                closeButtonText: "Cancel",
                actionButtonText: "Delete",
                headerText: "Delete tag?",
                bodyText: "Are you sure you want to delete " + $scope.tags[index].name + "?"
            };

            confirmModalService.showModal({}, modalOptions).then(function () {
            	tagDataService.delete({id: id}).$promise.then(
                    function(response){
                        $scope.tags.splice(index, 1);
                        alertService.addAlert("success", "Success: tag deleted!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to delete tag!", 3000);
                    }
                );
            }, function(){
                console.log('Modal dismissed at: ' + new Date());
            });
                
        },
        "updateTag": function(index){
            var tag = $scope.tags[index];
        
            if(tag.id === -1){
                // create a new tag
                delete tag["id"];
                tagDataService.save(tag).$promise.then(
                    function(response){
                        console.log(response);
                        $scope.tags[index] = response["tag"];
                        alertService.addAlert("success", "Success: tag created!", 3000);
                    },
                    function(){
                    	alertService.addAlert("danger", "Error: fail to create tag!", 3000);
                    }
                );
            }
            else{
                // update the tag
            	tagDataService.update({ id: tag.id }, tag).$promise.then(
                    function(response){
                    	alertService.addAlert("success", "Success: tag updated!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to update tag!", 3000);
                    }
                );
                
                
            }
        },
        "removeUnusedRow": function(index, tag){
            if(tag.id === -1){
                $scope.tags.splice(index, 1);
            }
        }
    };
}


