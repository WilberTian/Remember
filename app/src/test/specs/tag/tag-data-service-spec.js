"use strict";

describe("tagDataService", function () {
	
	beforeEach(angular.mock.module("remember.tag"));
	
	var service, $httpBackend;
    
    beforeEach(angular.mock.inject(function ($injector) {
        $httpBackend = $injector.get("$httpBackend");
        service = $injector.get("tagDataService");
    }));

    describe("CRUD of tagDataService", function () {
    	var allTags = {
    		tags: [
       		    {id: 1, name: "JavaScript"},
       	        {id: 2, name: "Python"},
       	        {id: 3, name: "CSS"}
       	    ]
        };
    	
        it("get tag list", function () {
            $httpBackend.expectGET("/remember/api/v1.0/tags").respond(allTags);
            
            var tags = service.get();
            $httpBackend.flush();

            expect(tags["tags"].length).toEqual(3);
        });
        
        it("get a tag item", function () {
            $httpBackend.expectGET("/remember/api/v1.0/tags/1").respond({
            	tag: allTags["tags"][0]
	        });
            
            var tag = service.get({id: 1});
            $httpBackend.flush();

            expect(tag["tag"].id).toEqual(1);
            expect(tag["tag"].name).toEqual("JavaScript");
        });
        
        it("update a tag item", function () {
        	        	
        	allTags["tags"][0]["name"] = "AngularJS";
        	
            $httpBackend.expectPUT("/remember/api/v1.0/tags/1").respond({
            	tag: allTags["tags"][0]
	        });
            
            var tag = service.update({id: 1}, allTags["tags"][0]);
            $httpBackend.flush();

            expect(tag["tag"].id).toEqual(1);
            expect(tag["tag"].name).toEqual("AngularJS");
        });
        
        it("create a tag item", function () {
        	var createdTag = {
            	name: "HTML"	
        	};
        	
        	allTags["tags"].push({
        		id: 4,
        		name: "HTML"
        	});
        	
            $httpBackend.expectPOST("/remember/api/v1.0/tags").respond({
            	tag: allTags["tags"][3]
	        });
            
            var tag = service.save({ name: "HTML" });
            $httpBackend.flush();

            expect(tag["tag"].id).toEqual(4);
            expect(tag["tag"].name).toEqual("HTML");
            expect(allTags["tags"].length).toEqual(4);
        });
        
        it("delete a tag item", function () {
            $httpBackend.expectDELETE("/remember/api/v1.0/tags/1").respond({
            	tag: allTags["tags"].shift()
	        });
            
            var tag = service.delete({id: 1});
            $httpBackend.flush();

            expect(tag["tag"].name).toEqual("AngularJS");
            expect(allTags["tags"].length).toEqual(3);
        });

    });
});