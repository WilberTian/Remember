app.controller("TagInfoController", function($scope, Tag, tags){
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
            Tag.delete({id: id}).$promise.then(
                function(response){
                    $scope.tags.splice(index, 1);
                },
                function(){
                    alert("fail to delete tag");
                }
            );
        },
        "updateTag": function(id, tag){
            if(id == -1){
                // create a new tag
                Tag.save(tag).$promise.then(
                    function(response){
                        console.log(response);
                        
                    },
                    function(){
                        alert("fail to create tag");
                    }
                );
            }
            else{
                // update the tag
                Tag.update({ id: id }, tag).$promise.then(
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

    
});


