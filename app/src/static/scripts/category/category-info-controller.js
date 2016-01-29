angular
	.module("remember.category")
	.controller("CategoryInfoController", CategoryInfoController);

CategoryInfoController.$inject = ["$scope", "confirmModalService", "alertService", "categoryDataService", "categories"];

function CategoryInfoController($scope, confirmModalService, alertService, categoryDataService, categories){
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
                        alertService.addAlert("success", "Success: category deleted!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to delete category!", 3000);
                    }
                );
            }, function(){
                console.log('Modal dismissed at: ' + new Date());
            });

        },
        "updateCategory": function(index){
            var category = $scope.categories[index];
            
            if(category.id === -1){
                // create a new category
                delete category["id"];
                categoryDataService.save(category).$promise.then(
                    function(response){
                        $scope.categories[index] = response["category"];
                        alertService.addAlert("success", "Success: category created!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to create category!", 3000);
                    }
                );
            }
            else{
                // update the category
            	categoryDataService.update({ id: category.id }, category).$promise.then(
                    function(response){
                    	alertService.addAlert("success", "Success: category updated!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to update category!", 3000);
                    }
                );
                
                
            }
        },
        "removeUnusedRow": function(index, category){
            if(category.id === -1){
                $scope.categories.splice(index, 1);
            }
        }
    };

   
}

