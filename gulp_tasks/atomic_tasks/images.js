var gulp = require("gulp"),
    imagemin = require("gulp-imagemin");

/*
 * config
 */
var config = {
    images: {
        src: "./app/src/static/images/*",     
        dest: "./app/build/static/images"
    }
};
    
/*
 * tasks
 */
gulp.task("buildImages", function(){
    gulp.src(config.images.src)
    	.pipe(imagemin())
        .pipe(gulp.dest(config.images.dest));
});

