var gulp = require("gulp");

/*
 * config
 */
var config = {
    vendorFonts: {
        fromVendor: "./bower_components/bootstrap/dist/fonts/*",     
        toSrc: "./app/src/static/vendor/fonts",
        src: "./app/src/static/vendor/fonts/*",
        dest: "./app/build/static/vendor/fonts"
    }
};
    
/*
 * tasks
 */
gulp.task("importVendorFonts", function(){
    gulp.src(config.vendorFonts.fromVendor)
        .pipe(gulp.dest(config.vendorFonts.toSrc));
});

gulp.task("buildVendorFonts", function(){
    gulp.src(config.vendorFonts.src)
        .pipe(gulp.dest(config.vendorFonts.dest));
});