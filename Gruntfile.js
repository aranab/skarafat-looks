// Loading Node Sass plugin
var sass = require('node-sass');
var jshintStylish = require('jshint-stylish');
var buildConfig = require('./BuildConfig')();

// The "wrapper" function
module.exports = function (grunt) {

    // Project and task configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),             

        /**
         * Grunt Contrib Clean
         * Clean or delete the distribute files
         * https://www.npmjs.com/package/grunt-contrib-clean
         */
        clean: [
            buildConfig.dist.basePath,
        ],

        /**
         * Grunt Contrib Copy
         * Copy files and folders
         * https://www.npmjs.com/package/grunt-contrib-copy
         */
        copy: {
            distFonts: {
                files: [{
                    expand: true,
                    cwd: buildConfig.src.fonts.cwd,
                    src: buildConfig.src.fonts.files,
                    dest: buildConfig.dist.fonts
                }]
            },
            distImages: {
                expand: true,
                cwd: buildConfig.src.images.cwd,
                src: buildConfig.src.images.files,
                dest: buildConfig.dist.images
            }
        },

        /**
         * Grunt Sass
         * Compile Sass to CSS using node-sass
         * https://www.npmjs.com/package/grunt-sass
         */
        sass: {            
            dist: {
                options: {
                    implementation: sass,
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                src: buildConfig.src.styles.files,
                dest: buildConfig.dist.styles
            }
        },

        /**
         * Grunt Webpack
         * Use Webpack with Grunt
         * https://www.npmjs.com/package/grunt-webpack
         */
        webpack: {
            options: {
                mode: 'production'
            },
            dist: require('./webpack.config')
        },

        /**
         * Grunt Contrib Htmlmin
         * Minify HTML
         * https://www.npmjs.com/package/grunt-contrib-htmlmin
         */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: buildConfig.src.html.files,
                    cwd: buildConfig.src.html.cwd,
                    dest: buildConfig.dist.html
                }]
            }
        },

        /**
         * Grunt Contrib Jshint
         * Validate files with JsHint
         * https://www.npmjs.com/package/grunt-contrib-jshint
         */
        jshint: {
            files: [
                'gruntfile.js',
                'BuildConfig.js',
                'webpack.config.js',
                buildConfig.src.scripts.files
            ],
            options: { 
                jshintrc: true,
                reporter: jshintStylish
            }
        },

        /**
         * Grunt Contrib Connect
         * Start a connect web server
         * https://www.npmjs.com/package/grunt-contrib-connect
         */
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: 'dist',
                    open: true,
                    livereload: true
                }
            }
        },

        /**
         * Grunt Contrib Watch
         * Monitor files and excute tasks
         * https://www.npmjs.com/package/grunt-contrib-watch
         */
        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'dist/**/*'
                ]
            },
            styles: {
                files: buildConfig.src.styles.watch,
                tasks: ['styles'],
                options: {
                    cwd: buildConfig.src.styles.cwd,
                }
            },
            scripts: {
                files: buildConfig.src.scripts.files,
                tasks: ['scripts'],
                options: {
                    cwd: buildConfig.src.scripts.cwd,
                    livereload: true
                }
            }, 
            htmlmin: {
                files: buildConfig.src.html.files,
                tasks: ['html'],
                options: {
                    cwd: buildConfig.src.html.cwd,
                },
            },           
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            }
        }
    });

    // Loading Grunt plugins and tasks
    require('load-grunt-tasks')(grunt);

    // friendly aliases
    grunt.registerTask('fonts', 'copy:distFonts');
    grunt.registerTask('images', 'copy:distImages');
    grunt.registerTask('styles', 'sass:dist');
    grunt.registerTask('scripts', 'webpack:dist');
    grunt.registerTask('html', 'htmlmin:dist');

    // Build tasks
    grunt.registerTask('build', [
        'clean',
        'styles',
        'scripts',
        'html',
        'fonts',
        'images'
    ]);

    // Default tasks
    grunt.registerTask('default', [
        'build',
        'connect',
        'watch'
    ]);
};
