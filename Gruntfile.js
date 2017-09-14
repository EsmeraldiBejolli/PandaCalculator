module.exports = function (grunt) {
    grunt.initConfig({
        typescript: {
            options: {
                target: 'es5',
                removeComments: true,
                module: 'amd'
            },
            commonjs: {
                options: {
                    basePath: 'ts/'
                },
                src: ['!ts/modules/**/*.ts', 'ts/**/*.ts'],
                dest: 'js/'
            }
        },
        uglify: {
            amd: {
                files: [{
                    expand: true,
                    cwd: 'js/modules/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'js/modules/',
                    ext: '.min.js'
                }]
            }
        },
        less: {
            options: {
                compress: true,
                syncImport: true
            },
            all: {
                src: 'less/all.less',
                dest: 'css/all.css'
            }
        },
        copy: {
            jslibs: {
                options: {
                    filter: ['js'],
                },
                src: 'ts/libs',
                dest: 'js/libs/'
            }
        },
        watch: {
            files: ['**/*.ts', '**/*.less', '**/*.html'],
            tasks: ['typescript', 'less'],
            options: { livereload: true }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-copy-files');
    grunt.loadNpmTasks('grunt-contrib-watch');;

    grunt.file.setBase(__dirname);
    grunt.registerTask('default', ['typescript', 'watch', 'uglify', 'less']);
}