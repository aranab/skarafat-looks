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
            'styles': {
                'cwd': appBasePath + 'scss/',
                'watch': '**/*.{css,sass,scss}',
                'files': appBasePath + 'scss/styles.scss'
            },
            'scripts': {
                'cwd': appBasePath + 'scripts/',
                'watch': '**/*.js',
                'files': [
                    appBasePath + 'scripts/**/*.js'
                ],
                'file': appBasePath + 'scripts/index.js'
            },
            'json': {
                'cwd': appBasePath + 'scripts/',
                'watch': '**/*.json',
                'files': [
                    appBasePath + 'scripts/**/*.json'
                ]
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
            'styles': distBaseAssetsPath + 'main.min.css',
            'scripts': 'bundle.min.js',
            'json': distBaseAssetsPath + 'all.min.json',            
            'html': distBasePath
        },
        'nodeModules': nodeModulesBasePath
    };

    return buildConfig;
};