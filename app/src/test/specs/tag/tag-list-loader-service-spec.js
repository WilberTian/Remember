"use strict";

describe("tagListLoaderService", function () {
	
	beforeEach(angular.mock.module("remember.tag"));
	
	var $httpBackend, tagListLoader;
    
    beforeEach(angular.mock.inject(function ($injector) {
        $httpBackend = $injector.get("$httpBackend");
        tagListLoader = $injector.get("tagListLoader");
    }));

    describe("Test task list loader", function () {

    	var allTags = {
    		tags: [
       		    {id: 1, name: "JavaScript"},
       	        {id: 2, name: "Python"},
       	        {id: 3, name: "CSS"}
       	    ]
        };
    	
        it("success to get tag list", function () {
            $httpBackend.expectGET("/remember/api/v1.0/tags").respond(allTags);
            
            var tags = tagListLoader().then(function(tags){
            	expect(tags["tags"].length).toEqual(3);
            });
            
            $httpBackend.flush();

        });
        
        it("fail to get tag list", function () {
            $httpBackend.expectGET("/remember/api/v1.0/tags").respond(500);
            
            var tags = tagListLoader().catch(function(data){
            	expect(data).toEqual("Unable to fetch tags");
            });
            
            $httpBackend.flush();
        });

    });
});