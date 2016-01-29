angular
	.module("remember.note")
	.factory("noteListLoader", noteListLoader);

noteListLoader.$inject = ["noteDataService", "$q"];

function noteListLoader(noteDataService, $q){
    return function(){
        var delay = $q.defer();
        
        noteDataService.get(function(notes){
            delay.resolve(notes);
        }, function(){
            delay.reject("Unable to fetch notes");
        });
        
        return delay.promise;
    };
}

