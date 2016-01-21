var gulp = require("gulp"),
  	htmlmin = require("gulp-htmlmin"),
  	modify = require("gulp-modify");

/*
 * config
 */
var config = {
	html: {
		src: "./app/src/templates/*.html",     
        dest: "./app/build/templates"
	}
};

/*
 * tasks
 */
gulp.task("buildHtml", function(){
    gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
        .pipe(gulp.dest(config.html.dest));
});

