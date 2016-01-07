angular
	.module("remember")
	.controller("TagInfoController", TagInfoController);

function TagInfoController($scope, confirmModalService, tagDataService, tags){
    $scope.tags = tags["tags"];
    
    $scope.tagOperations = {
        "createTag": function(){
            $scope.inserted = {
                "id": -1,
                "name": "Not set",
                "description": "Not set"
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
                    },
                    function(){
                        alert("fail to delete tag");
                    }
                );
            }, function(){
                console.log('Modal dismissed at: ' + new Date());
            });
                
        },
        "updateTag": function(index){
            var tag = $scope.tags[index];
        
            if(tag.id == -1){
                // create a new tag
                delete tag["id"];
                tagDataService.save(tag).$promise.then(
                    function(response){
                        console.log(response);
                        $scope.tags[index] = response["tag"];
                    },
                    function(){
                        alert("fail to create tag");
                    }
                );
            }
            else{
                // update the tag
            	tagDataService.update({ id: tag.id }, tag).$promise.then(
                    function(response){
                        console.log(response);

                    },
                    function(){
                        alert("fail to update tag");
                    }
                );
                
                
            }
        },
        "removeUnusedRow": function(index, tag){
            if(tag.id == -1){
                $scope.tags.splice(index, 1);
            }
        }
    };

    
}


