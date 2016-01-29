angular
	.module("remember.category")
	.factory("categoryListLoader", categoryListLoader);

categoryListLoader.$inject = ["categoryDataService", "$q"];

function categoryListLoader(categoryDataService, $q){
    return function(){
        var delay = $q.defer();
        
        categoryDataService.get(function(categories){
            delay.resolve(categories);
        }, function(){
            delay.reject("Unable to fetch categories");
        });
        
        return delay.promise;
    };
}