var gulp = require("gulp");

/*
 * config
 */
var config = {
	html: {
		src: "./app/src/templates/*.html"
	},
	
	javascript: {
		src: "./app/src/static/**/*.js"
	},
	
	css: {
		src: "./app/src/static/**/*.css"
	}
};

/*
 * tasks
 */
gulp.task("watch", function(){
	gulp.watch(config.html.src, ["buildHtml", "modifyIndexHtml"]);
	gulp.watch(config.javascript.src, ["buildUserScript"]);
	gulp.watch(config.css.src, ["buildUserCSS"]);
});