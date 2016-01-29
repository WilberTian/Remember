angular
	.module("remember.task")
	.filter("taskCategory", taskCategory);

function taskCategory(){
	return function(tasks, category){
		if(!category || category.trim() === ""){
			return tasks;
		}
		
		return _.filter(tasks, function(task){
			return task.category.name === category;
		});
	};
}