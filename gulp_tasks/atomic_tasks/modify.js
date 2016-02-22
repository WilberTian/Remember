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
gulp.task("modifyIndexHtml", ["buildHtml"], function(){

    gulp.src(config.indexHtml.src)
    .pipe(modify({
        fileModifier: function(file, contents) {
            return contents.replace(/<!-- src scripts -->[\W\w]+<!-- end src scripts -->/g, "")
            			   .replace(/<!-- src css -->[\W\w]+<!-- end src css -->/g, "")
            			   .replace(/<!-- dest scripts -->[\W\w]*<!-- end dest scripts -->/g, "<script src=\"vendor/scripts/lib.min.js\"></script><script src=\"scripts/remember.min.js\"></script>")
            			   .replace(/<!-- dest css -->[\W\w]*<!-- end dest css -->/g, "<link rel=\"stylesheet\" href=\"vendor/css/lib.min.css\"></link><link rel=\"stylesheet\" href=\"css/remember.min.css\"></link>");
        }
    }))
    .pipe(gulp.dest(config.indexHtml.dext));

    
});
