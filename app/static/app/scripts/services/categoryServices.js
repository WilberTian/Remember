var categoryServices = angular.module("remember.categoryServices", ["ngResource"]);

categoryServices.factory("Category", function($resource){
    return $resource("/remember/api/v1.0/categories/:id", {id: "@id"}, { update: { method: "PUT" }});
});     

categoryServices.factory("CategoryListLoader", function(Category, $q){
    return function(){
        var delay = $q.defer();
        
        Category.get(function(categories){
            delay.resolve(categories);
        }, function(){
            delay.reject("Unable to fetch categories");
        });
        
        return delay.promise;
    }
});    

