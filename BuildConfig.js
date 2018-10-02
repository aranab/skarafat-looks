var path = require('path');

module.exports = function() {
    // Root Paths
    var appBasePath = path.resolve(__dirname, 'src') + '/',
        distBasePath = path.resolve(__dirname, 'dist') + '/',
        distBaseAssetsPath = path.resolve(__dirname, 'dist/assets') + '/',
        //tempBasePath = path.resolve(__dirname, '.temp') + '/',
        nodeModulesBasePath = path.resolve(__dirname, 'node_modules') + '/';

    // Config
    var buildConfig = {
        'dependencies': {
            'jquery': {
                'script': {
                    'cwd': nodeModulesBasePath + 'jquery/dist/',
                    'files': [
                        nodeModulesBasePath + 'jquery/dist/jquery.min.js'
                    ]
                }
            }
        },
        'src': {
            'basePath': appBasePath,
            'fonts': {
                'cwd': appBasePath + 'fonts/',
                'files': [
                    '**.*'
                ]
            },
            'images': {
                'cwd': appBasePath + 'images/',
                'files': [
                    '**/*.{jpg,gif,png}'
                ]
            },
            'scripts': {
                'cwd': appBasePath + 'scripts/',
                'watch': '**/*.js',
                'files': [
                    appBasePath + 'scripts/**/*.js'
                ],
                'file': appBasePath + 'scripts/index.js'
            },
            'styles': {
                'cwd': appBasePath + 'scss/',
                'watch': '**/*.{css,sass,scss}',
                'files': appBasePath + 'scss/styles.scss'
            },
            'html': {
                'cwd': appBasePath,
                'files': [
                    '**/*.{html,htm}'
                ],
                'file': appBasePath + 'index.html'
            }
        },
        dist: {
            'basePath': distBasePath,
            'distBaseAssetsPath': distBaseAssetsPath,
            'fonts': distBaseAssetsPath + 'fonts/',
            'images': distBaseAssetsPath + 'images/',
            'scripts': 'bundle.min.js',
            'styles': distBaseAssetsPath + 'main.min.css',
            'html': distBasePath
        },
        'nodeModules': nodeModulesBasePath
    };

    return buildConfig;
};