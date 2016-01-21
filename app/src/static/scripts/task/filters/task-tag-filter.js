angular
	.module("remember.task")
	.filter("taskTag", taskTag);

function taskTag(){
	return function(tasks, tag){
		if(!tag || tag.trim() == ''){
			return tasks;
		}
		
		return _.filter(tasks, function(task){
			var tags = task.tags;
			return _.some(tags, function(tagObj){
				return tagObj.name == tag;
			});
		});
	}
}
