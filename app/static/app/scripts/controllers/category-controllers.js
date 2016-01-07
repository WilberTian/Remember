angular
	.module("remember")
	.controller("CategoryInfoController", CategoryInfoController);


function CategoryInfoController($scope, confirmModalService, categoryDataService, categories){
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
        	
        	var modalOptions = {
                closeButtonText: "Cancel",
                actionButtonText: "Delete",
                headerText: "Delete category?",
                bodyText: "Are you sure you want to delete " + $scope.categories[index].name + "?"
            };

            confirmModalService.showModal({}, modalOptions).then(function () {
            	categoryDataService.delete({id: id}).$promise.then(
                    function(response){
                        $scope.categories.splice(index, 1);
                    },
                    function(){
                        alert("fail to delete category");
                    }
                );
            }, function(){
                console.log('Modal dismissed at: ' + new Date());
            });

        },
        "updateCategory": function(index){
            var category = $scope.categories[index];
            
            if(category.id == -1){
                // create a new category
                delete category["id"];
                categoryDataService.save(category).$promise.then(
                    function(response){
                        console.log(response);
                        $scope.categories[index] = response["category"]
                    },
                    function(){
                        alert("fail to create category");
                    }
                );
            }
            else{
                // update the category
            	categoryDataService.update({ id: category.id }, category).$promise.then(
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

   
}

