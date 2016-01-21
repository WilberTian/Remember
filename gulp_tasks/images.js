var gulp = require("gulp"),
    imagemin = require("gulp-imagemin");

gulp.task("images", function(){
    gulp.src(config.src)
    	.pipe(imagemin())
        .pipe(gulp.dest(config.dest));
});

