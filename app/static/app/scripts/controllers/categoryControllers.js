app.controller("CategoryInfoController", function($scope, Category, categories){
    $scope.categories = categories["categories"];
    
    $scope.categoryOperations = {
        "createCategory": function(){
            $scope.inserted = {
                "id": -1,
                "name": "Not set",
                "description": "Not set"
            };
            $scope.categories.push($scope.inserted);
            
        },
        "deleteCategory": function(id, index){
            Category.delete({id: id}).$promise.then(
                function(response){
                    $scope.categories.splice(index, 1);
                },
                function(){
                    alert("fail to delete category");
                }
            );
        },
        "updateCategory": function(id, category){
            console.log(id, category);
            if(id == -1){
                // create a new category
                Category.save(category).$promise.then(
                    function(response){
                        console.log(response);
                        
                    },
                    function(){
                        alert("fail to create category");
                    }
                );
            }
            else{
                // update the category
                Category.update({ id: id }, category).$promise.then(
                    function(response){
                        console.log(response);

                    },
                    function(){
                        alert("fail to update category");
                    }
                );
                
                
            }
        },
        "removeUnusedRow": function(index, category){
            if(category.id == -1){
                $scope.categories.splice(index, 1);
            }
        }
    };

   
});

