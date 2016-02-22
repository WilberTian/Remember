var gulp = require("gulp");

gulp.task("importVendorLib", ["cleanImportedVendorLib"], function(){
	/*
	 * import vendor libs from bower_components
	 * 
	 * Start tasks:
	 * 	importVendorScript from javascript.js
	 * 	importVendorCSS from css.js
	 * 	importVendorFonts from fonts.js
	 * 
	 */
	return gulp.start(["importVendorScript", "importVendorCSS", "importVendorFonts"]);
	
});

