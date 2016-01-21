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
	setTimeout(function(){
		gulp.start(["buildVendorScript", "buildUserScript", 
		            "buildVendorCSS", "buildUserCSS", 
		            "buildHtml",
		            "buildVendorFonts",
		            "buildImages",
		            "modifyIndexHtml"]);
	}, 100);	
});

