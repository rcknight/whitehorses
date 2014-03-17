module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		imageoptim: {
			options: {
				quitAfter: true
			},
			allPngs: {
				options: {
					imageAlpha: true,
					jpegMini: false
				},
				src: ['dist/images'],
			}
		},
		copy: {
			html: {
				expand: true,
				src: ['index.html'],
				dest: 'dist/'
			},
			json: {
				expand: true,
				src: ['horses.json'],
				dest: 'dist/'
			},
			scripts: {
				expand: true,
				src: ['scripts/**/*.js'],
				dest: 'dist/'
			},
			images: {
				expand: true,
				src: ['images/**/*'],
				dest: 'dist/'
			},
			cname: {
				expand: true,
				src: ['CNAME'],
				dest: 'dist/'
			}
		},
		jshint: {
			files: ['Gruntfile.js'],
			options: {
				globals: {
					document: true,
					module: true,
					console: true,
					jQuery: true
				}
			}
		},
        'gh-pages': {
            options: {
                base: 'dist',
                clone: 'deploy'
            },
            src: ['**/*']
        },
		connect: {
			server: {
				options: {
					port: 9001,
					livereload: true,
					base: 'dist'
				}
			}
		},
		open: {
			dev : {
				path: 'http://127.0.0.1:9001',
				app: 'Google Chrome'
			},
		},
		watch: {
			html: {
				files: 'index.html',
				tasks: ['copy']
			},
			json: {
				files: 'horses.json',
				tasks: ['copy']
			},
			js: {
				files: 'scripts/**/*',
				tasks: ['copy']
			},
			images: {
				files: 'images/**/*',
				tasks: ['imageoptim']
			},
			reload: {
				files: 'dist/**/*',
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-image-resize');

	grunt.registerTask('build', [ 'jshint',"copy:images", "imageoptim", "copy:html", "copy:json", "copy:scripts", "copy:cname"]);
    grunt.registerTask('deploy', ['build', 'gh-pages']);
	grunt.registerTask('serve', ['build', 'connect', 'open', 'watch']);

	grunt.registerTask('default',['dev']);
};
