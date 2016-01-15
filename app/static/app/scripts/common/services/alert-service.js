angular
    .module("remember.common")
    .factory("alertService", alertService);

alertService.$inject = ["$rootScope", "$timeout"];

function alertService($rootScope, $timeout) {
    $rootScope.alerts = [];
    
    return {
    	"addAlert": function(type, msg, timeout) {
    	    var self = this;
    	    
	     	$rootScope.alerts.push({
	            type: type,
	            msg: msg,
	            close: function() {
	                return self.closeAlert(this);
	            }
	        });

	        if (timeout) {
	            $timeout(function(){ 
	            	self.closeAlert(this); 
	            }, timeout); 
	        }
	    },
	    
	    "closeAlert": function(index) {
	        $rootScope.alerts.splice(index, 1);
	    }
    };

}