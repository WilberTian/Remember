var gulp = require("gulp"),
	jshint = require("gulp-jshint");    

/*
 * config
 */
var config = {
	userScript: {
	    src: "./app/src/static/scripts/**/*.js",
	    jshintrc: "./.jshintrc"
	}
};

/*
 * tasks
 */
gulp.task("jshint", function () {
    gulp.src(config.userScript.src)
    	.pipe(jshint(config.userScript.jshintrc))
    	.pipe(jshint.reporter("default"));
});
