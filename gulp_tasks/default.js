var gulp = require("gulp");

gulp.task("default",  ["importVendorLib"], function(){
	/*
	 * 1. clean build data and imported vendor lib
	 * 2. import vendor lib
	 * 3. then build js, css, html from src to build
	 * 
	 * Start tasks:
	 * 	importVendorLib from importVendorLib.js
	 * 	buildResource from buildResource.js
	 * 
	 */
	gulp.start(["buildResource"]);
	
});