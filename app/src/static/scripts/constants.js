var globalVar = {};
globalVar.remember = {};

globalVar.remember.dimensions = [
	{"id": 1, "name": "Important and Urgent"},
	{"id": 2, "name": "Important but not Urgent"},
	{"id": 3, "name": "Not Important but Urgent"},
	{"id": 4, "name": "Not Important and not Urgent"}
];

globalVar.remember.taskStatusArray = ["All", "Complete", "Incomplete"];

globalVar.remember.noteColors = ["#a4bdfc",
		          "#46d6db",
		          "#7ae7bf",
		          "#51b749",
		          "#fbd75b",
		          "#ffb878",
		          "#ff887c",
		          "#dbadff",
		          "#e1e1e1",
		          "#bfeac7"];

globalVar.remember.mdEditorOptions = {
    lineNumbers: true, 
    theme:"twilight", 
    lineWrapping : true, 
    mode: "markdown", 
    keyMap: "sublime", 
    smartIndent: true, 
    showCursorWhenSelecting: true
};