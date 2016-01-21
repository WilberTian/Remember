var gulp = require("gulp");

var config = {
    vendorFonts: {
        src: "./bower_components/bootstrap/dist/fonts/*",     
        dest: "./app/src/static/vendor/fonts"
    }
};
    
gulp.task("vendorFonts", function(){
    gulp.src(config.vendorFonts.src)
        .pipe(gulp.dest(config.vendorFonts.dest));
});