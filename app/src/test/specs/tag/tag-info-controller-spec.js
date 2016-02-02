"use strict";
	
describe("TagInfoController", function() {

    beforeEach(angular.mock.module("remember.tag"));
    
    var $controller;
    
    beforeEach(angular.mock.inject(function($injector){
    	$controller = $injector.get("$controller");;
    }));
    
    describe("Test CRUD of tag", function() {
	    var $scope, controller;
	    
	    beforeEach(function() {
	        $scope = {};
	        
	        controller = $controller("TagInfoController", { 
	        	$scope: $scope, 
	        	confirmModalService: null,
	        	tagDataService: null, 
	        	alertService: null, 
	        	tags: {
	        		tags: [
	        		    {id: 1, name: "JavaScript"},
	        	        {id: 2, name: "Python"},
	        	        {id: 3, name: "CSS"}
	        	    ]
	        	}
	        });
	    });
	    
	    it("should have defination of TagInfoController", function() {
	        expect(controller).toBeDefined();
	    });
	    
	    it("should have three tag items", function() {
	        expect($scope.tags.length).toEqual(3);
	    });
	    
	    it("create tag operation", function() {
	    	$scope.tagOperations.createTag();
	    	
	    	expect($scope.tags.length).toEqual(4);
	    	expect($scope.tags[$scope.tags.length - 1]["id"]).toEqual(-1);
	    });
	    
	    
    });
}); 