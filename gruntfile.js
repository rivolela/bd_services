module.exports = function(grunt){

	//require('jit-grunt')(grunt);
	require('jit-grunt')(grunt)({
  		pluginsRoot: '/node_modules/jit-grunt/'
	});

	grunt.initConfig({
		env:{
			dev:{
				NODE_ENV: 'development'
			},
			test:{
				NODE_ENV: 'test'
			}
		},
		nodemon:{
			dev:{
				script:'server.js',
				options:{
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js','public/**/*.html','public/css/**/*.less']
				}
			},
			debug:{
				script:'server.js',
				options:{
					nodeArgs:['--debug'],
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js']
				}
			}
		},
		mochaTest:{
			//src:'app/tests/controllers/reviews.server.controller.tests.js',
			src:'app/tests/**/*.js',
			options:{
				reporter:'spec'
			}
		},
		karma:{
			unit:{
				configFile:'karma.conf.js'
			}
		},
		protractor:{
			e2e:{
				options:{
					configFile:'protractor.conf.js'
				}
			}
		},
		jshint:{
			all:{
				src:['server.js',
					'config/**/*.js',
					'app/**/*.js',
					'public/js/*.js',
					'public/modules/**/*.js']
			}
		},
		csslint:{
			all:{
				src:'public/modules/**/*.css'
			}
		},
		less: {
      		dev: {
        		options: {
          			compress: true,
          			yuicompress: true,
          			optimization: 2
        		},
        		files: {
          			"public/css/custom_bootstrap.css": "public/css/custom_bootstrap.less" // destination file and source file,

        		}
      		}
   		},
		watch:{
			js:{
				files:['server.js',
					'config/**/*.js',
					'app/**/*.js',
					'public/modules/**/*.js'],
				tasks:['jshint']
			},
			css:{
				files:'public/modules/**/*.css',
				tasks:['csslint']
			},
			styles: {
        		files: ['public/css/**/*.less'], // which files to watch
        		tasks: ['less:dev'],
        		options: {
          			nospawn: true
        		}
      		}
		},
		concurrent:{
			dev:{
				tasks:['nodemon','watch'],
				options:{
					logConcurrentOutput:true
				}
			},
			debug:{
				tasks:['nodemon:debug','watch','node-inspector'],
				options:{
					logConcurrentOutput:true
				}
			}
		},
		'node-inspector':{
			debug:{}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default',['env:dev','lint','less:dev','concurrent:dev']);
	grunt.registerTask('debug',['env:dev','lint','concurrent:debug']);
	grunt.registerTask('lint',['jshint','csslint']);
	grunt.registerTask('test',['env:test','lint','mochaTest']);
};






