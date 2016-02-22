var gulp = require("gulp");

gulp.task("buildResource", ["cleanBuild"], function(){
	/*
	 * build js, css, html from src to build
	 * 
	 * Start tasks:
	 * 	buildVendorScript, buildUserScript from javascript.js
	 * 	buildVendorCSS, buildUserCSS from css.js
	 * 	buildHtml from html.js
	 * 
	 */

	return gulp.start(["buildVendorScript", "buildUserScript", 
	            "buildVendorCSS", "buildUserCSS", 
	            "buildVendorFonts",
	            "buildImages",
	            "modifyIndexHtml"]);

});

