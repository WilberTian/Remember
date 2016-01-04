var filters = angular.module("remember.filters", []);

filters.filter("attachmentName", function(){
	return function(attachments, name){
		if(!name || name.trim() == ''){
			return attachments
		}
		
		return _.filter(attachments, function(attachment){
			return attachment.name.toLowerCase().indexOf(name) > -1;
		});
	}
});

filters.filter("attachmentType", function(){
	return function(attachments, type){
		if(!type || type.trim() == ''){
			return attachments
		}
		
		return _.filter(attachments, function(attachment){
			return attachment.type.toLowerCase().indexOf(type) > -1;
		});
	}
});

filters.filter("attachmentTags", function(){
	return function(attachments, tag){
		if(!tag || tag.trim() == ''){
			return attachments
		}
		
		return _.filter(attachments, function(attachment){
			var tags = attachment.tags;
			return _.some(tags, function(tagObj){
				return tagObj.name.toLowerCase().indexOf(tag) > -1;
			});
		});
	}
});

filters.filter("taskCategory", function(){
	return function(tasks, category){
		if(!category || category.trim() == ''){
			return tasks;
		}
		
		return _.filter(tasks, function(task){
			return task.category.name == category;
		});
	}
});

filters.filter("taskTag", function(){
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
});

filters.filter("taskStatus", function(){
	return function(tasks, status){
		if(status == "All"){
			return tasks;
		}
		
		return _.filter(tasks, function(task){
			if(status == "Complete"){
				return task.done;
			}
			else{
				return !task.done;
			}
			
		});
	}
});