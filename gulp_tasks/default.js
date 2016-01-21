var gulp = require("gulp");

gulp.task("default", ["clean"], function(){
    setTimeout(function(){
        gulp.start(["javascript", "css", "html", "images"]);
    }, 100);
});