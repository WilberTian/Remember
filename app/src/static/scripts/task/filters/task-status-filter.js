angular
	.module("remember.task")
	.filter("taskStatus", taskStatus);

function taskStatus(){
	return function(tasks, status){
		if(status === "All"){
			return tasks;
		}
		
		return _.filter(tasks, function(task){
			if(status === "Complete"){
				return task.done;
			}
			else{
				return !task.done;
			}
			
		});
	};
}