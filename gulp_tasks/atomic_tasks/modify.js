var gulp = require("gulp"),
	modify = require("gulp-modify");   
  
/*
 * config
 */
var config = {
	indexHtml: {
		src: "./app/build/templates/index.html",
		dext: "./app/build/templates"
	}
};


/*
 * tasks
 */
gulp.task("modifyIndexHtml", function(){
    setTimeout(function(){
        gulp.src(config.indexHtml.src)
        .pipe(modify({
            fileModifier: function(file, contents) {
                return contents.replace(/css\/main.css/g, "css/remember.min.css")
                			   .replace(/<script src="scripts\/[\W\w]+"><\/script>/g, "")
                			   .replace(/<\/body>/g, "<script src=\"scripts/remember.min.js\"></script></body>");
            }
        }))
        .pipe(gulp.dest(config.indexHtml.dext));
    }, 10000);
    
});
