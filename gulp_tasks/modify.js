var gulp = require("gulp"),
	modify = require("gulp-modify");   
      
gulp.task("modify", function(){
    setTimeout(function(){
        gulp.src(config.dest + "/index.html")
        .pipe(modify({
            fileModifier: function(file, contents) {
                return contents.replace(/app\/css\/main.css/g, "app/build/static/css/remember.min.css")
                			   .replace(/app\/lib\/bower_components\/([\w-]+\/)+/g, "app/build/static/css/")
                			   .replace(/app\/images\/+/g, "app/build/static/images/");
            }
        }))
        .pipe(gulp.dest(config.dest));
    }, 1000);
    
});
