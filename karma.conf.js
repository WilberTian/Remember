// Karma configuration
// Generated on Mon Feb 01 2016 09:22:10 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // vendor script
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-resource/angular-resource.min.js",
        "./bower_components/angular-route/angular-route.min.js",
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/bootstrap/dist/js/bootstrap.min.js",
        "./bower_components/showdown/dist/showdown.min.js",
        "./bower_components/angular-xeditable/dist/js/xeditable.min.js",
        "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "./bower_components/underscore/underscore-min.js",
        "./bower_components/codemirror/lib/codemirror.js",
        "./bower_components/codemirror/mode/markdown/markdown.js",
        "./bower_components/codemirror/keymap/sublime.js",
        "./bower_components/angular-ui-codemirror/ui-codemirror.min.js",
        
        // angular mock
        './app/src/test/angular-mocks.js',
        
        // user scripts
        "./app/src/static/scripts/task/task-module.js",
        "./app/src/static/scripts/task/controllers/task-list-controller.js",
        "./app/src/static/scripts/task/controllers/task-create-controller.js",
        "./app/src/static/scripts/task/controllers/task-edit-controller.js",
        "./app/src/static/scripts/task/controllers/task-view-controller.js",
        "./app/src/static/scripts/task/services/task-data-service.js",
        "./app/src/static/scripts/task/services/task-loader-service.js",
        "./app/src/static/scripts/task/services/task-list-loader-service.js",
        "./app/src/static/scripts/task/filters/task-tag-filter.js",
        "./app/src/static/scripts/task/filters/task-category-filter.js",
        "./app/src/static/scripts/task/filters/task-status-filter.js",
        "./app/src/static/scripts/category/category-module.js",
        "./app/src/static/scripts/category/category-info-controller.js",
        "./app/src/static/scripts/category/category-data-service.js",
        "./app/src/static/scripts/category/category-list-loader-service.js",
        "./app/src/static/scripts/tag/tag-module.js",
        "./app/src/static/scripts/tag/tag-info-controller.js",
        "./app/src/static/scripts/tag/tag-data-service.js",
        "./app/src/static/scripts/tag/tag-list-loader-service.js",
        "./app/src/static/scripts/note/note-module.js",
        "./app/src/static/scripts/note/note-info-controller.js",
        "./app/src/static/scripts/note/note-data-service.js",
        "./app/src/static/scripts/note/note-list-loader-service.js",
        "./app/src/static/scripts/note/note-elastic-directive.js",
        "./app/src/static/scripts/attachment/attachment-module.js",
        "./app/src/static/scripts/attachment/attachment-controller.js",
        "./app/src/static/scripts/attachment/attachment-edit-modal-controller.js",
        "./app/src/static/scripts/attachment/attachment-select-directive.js",
        "./app/src/static/scripts/attachment/services/attachment-data-service.js",
        "./app/src/static/scripts/attachment/services/attachment-list-loader-service.js",
        "./app/src/static/scripts/attachment/services/attachment-uploader-service.js",
        "./app/src/static/scripts/attachment/filters/attachment-tag-filter.js",
        "./app/src/static/scripts/attachment/filters/attachment-name-filter.js",
        "./app/src/static/scripts/attachment/filters/attachment-type-filter.js",
        "./app/src/static/scripts/common/common-module.js",
        "./app/src/static/scripts/common/services/confirm-modal-service.js",
        "./app/src/static/scripts/common/services/alert-service.js",
        "./app/src/static/scripts/common/directives/auto-focus-directive.js",
        "./app/src/static/scripts/common/directives/markdown-convert-directive.js",
        "./app/src/static/scripts/common/directives/editor-fullscreen-directive.js",
        "./app/src/static/scripts/common/directives/preview-fullscreen-directive.js",
        "./app/src/static/scripts/app-module.js",
        "./app/src/static/scripts/app-config.js",
        "./app/src/static/scripts/constants.js",

        // specs
        './app/src/test/specs/tag/tag-data-service-spec.js',
        './app/src/test/specs/tag/tag-info-controller-spec.js'
        
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    
    /*
     * karma-coverage config
     */
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './app/src/static/scripts/**/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    
    coverageReporter:{
        type:'html',
        dir:'./TestFiles/coverage/'
    }

  })
}
