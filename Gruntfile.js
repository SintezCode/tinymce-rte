module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        modx: grunt.file.readJSON('_build/config.json'),
        copy: {
            /* move files */
            tinymce: {
                files: [{
                    src: ['**/*.min.js', '**/*.gif', '**/*.png', '**/*.css'],
                    cwd: 'node_modules/tinymce/plugins/',
                    dest: 'assets/components/tinymcerte/js/vendor/tinymce/plugins/',
                    expand: true,
                    nonull: true
                }, {
                    src: ['tinymce.min.js', 'license.txt'],
                    cwd: 'node_modules/tinymce/',
                    dest: 'assets/components/tinymcerte/js/vendor/tinymce/',
                    expand: true,
                    nonull: true
                }, {
                    src: ['**/*.css', '**/*.gif', '**/tinymce*.*'],
                    cwd: 'node_modules/tinymce/skins/',
                    dest: 'assets/components/tinymcerte/js/vendor/tinymce/skins/',
                    noProcess: 'bower.json',
                    expand: true,
                    nonull: true
                }, {
                    src: '**/*.min.js',
                    cwd: 'node_modules/tinymce/themes/',
                    dest: 'assets/components/tinymcerte/js/vendor/tinymce/themes/',
                    expand: true,
                    nonull: true
                }]
            }
        },
        curl: {
            i18n: {
                src: {
                    url: 'https://www.tiny.cloud/tinymce-services-azure/1/i18n/download?langs=ar,be,bg_BG,cs,da,de,el,es,et,fa,fi,fr_FR,he_IL,id,it,ja,nl,pl,pt_BR,ro,ru,sk,sv_SE,th_TH,uk,zh_CN',
                    method: 'GET'
                },
                dest: 'node_modules/tinymce/langs/tinymce_languages.zip'
            }
        },
        unzip: {
            i18n: {
                src: 'node_modules/tinymce/langs/tinymce_languages.zip',
                dest: 'assets/components/tinymcerte/js/vendor/tinymce/'
            }
        },
        watch: {
            config: {
                files: [
                    '_build/config.json'
                ],
                tasks: ['default']
            }
        },
        bump: {
            version: {
                files: [{
                    src: 'core/components/tinymcerte/model/tinymcerte/tinymcerte.class.php',
                    dest: 'core/components/tinymcerte/model/tinymcerte/tinymcerte.class.php'
                }],
                options: {
                    replacements: [{
                        pattern: /version = '\d+.\d+.\d+[-a-z0-9]*'/ig,
                        replacement: 'version = \'' + '<%= modx.version %>' + '\''
                    }]
                }
            }
        }
    });

    //load the packages
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-zip');
    grunt.renameTask('string-replace', 'bump');

    //register the task
    grunt.registerTask('default', ['bump', 'curl', 'unzip', 'copy']);
};
