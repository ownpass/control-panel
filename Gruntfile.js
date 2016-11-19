module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [
                'assets/js/ownpass.js',
                'assets/js/ownpass.min.js',
                'build/'
            ]
        },
        concat: {
            dist: {
                dest: 'assets/js/ownpass.js',
                src: [
                    'build/ownpass-browserify.js',
                    'node_modules/core-js/client/shim.min.js',
                    'node_modules/zone.js/dist/zone.js',
                    'node_modules/reflect-metadata/Reflect.js',
                    'node_modules/systemjs/dist/system.src.js',
                    'assets/js/systemjs.config.js'
                ]
            },
            options: {
                separator: ";\n"
            }
        },
        exec: {
            browserify: 'browserify -s build/compiled-ts/main.js > build/ownpass-browserify.js',
            deploy: './deploy.sh'
        },
        jshint: {
            options: grunt.file.readJSON('jshint.json'),
            all: {
                src: [
                    'config.json.dist',
                    'Gruntfile.js',
                    'jshint.json',
                    'manifest.json',
                    'package.json',
                    'tsconfig.json',
                    'typings.json'
                ]
            }
        },
        ts: {
            build: {
                tsconfig: true
            }
        },
        typings: {
            install: {}
        },
        uglify: {
            build: {
                files: {
                    'assets/js/ownpass.min.js': [
                        'assets/js/ownpass.js'
                    ]
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-typings');

    grunt.registerTask('deploy', [
        'exec:deploy'
    ]);

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'typings',
        'ts',
        'exec:browserify',
        'concat',
        'uglify'
    ]);
};
