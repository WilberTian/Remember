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
	setTimeout(function(){
		gulp.start(["importVendorScript", "importVendorCSS", "importVendorFonts"]);
	}, 100);
	
});

