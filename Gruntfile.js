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
                    sourceMap: false
                },
                src: buildConfig.src.scss.files,
                dest: buildConfig.dist.scss
            }
        },

        /**
         * Grunt PostCSS
         * Apply several post-processors to your CSS using PostCSS.
         * https://www.npmjs.com/package/grunt-postcss
         */
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'dist/assets/'
                },
                processors: [
                    require('autoprefixer')({ 
                        browsers: 'last 2 versions' 
                    }),
                    require('cssnano')({
                        preset: ['default', {
                            discardComments: {
                                removeAll: true,
                            }
                        }]
                    })
                ]
            },
            dist: {
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
         * Grunt Minjson
         * Minify and concat JSON files.
         * https://www.npmjs.com/package/grunt-minjson
         */
        minjson: {
            dist: {
                src: buildConfig.src.json.files,
                dest: buildConfig.dist.json
            }
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
                buildConfig.src.scripts.files,
                buildConfig.src.json.files
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
                files: buildConfig.src.scss.watch,
                tasks: [
                    'scss',
                    'styles'
                ],
                options: {
                    cwd: buildConfig.src.scss.cwd,
                }
            },
            scripts: {
                files: buildConfig.src.scripts.watch,
                tasks: ['scripts'],
                options: {
                    cwd: buildConfig.src.scripts.cwd,
                    livereload: true
                }
            }, 
            json: {
                files: buildConfig.src.json.watch,
                tasks: ['json'],
                options: {
                    cwd: buildConfig.src.json.cwd,
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
    grunt.registerTask('scripts', 'webpack:dist');
    grunt.registerTask('json', 'minjson:dist');
    grunt.registerTask('scss', 'sass:dist');
    grunt.registerTask('styles', 'postcss:dist');   
    grunt.registerTask('html', 'htmlmin:dist');

    // Build tasks
    grunt.registerTask('build', [
        'clean',
        'scss',
        'styles',
        'scripts',
        'json',
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
