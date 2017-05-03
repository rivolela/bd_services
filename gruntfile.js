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
					watch:['server.js','config/**/*.js','app/**/*.js','public/**/*.html']
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
			// src:'app/tests/controllers/offers.server.controller.tests.js',
			src:'app/tests/**/*.js',
			options:{
				reporter:'spec'
			}
		},
		jshint:{
			all:{
				src:['server.js',
					'config/**/*.js',
					'app/**/*.js',
					'public/js/*.js']
			}
		},
		csslint:{
			all:{
				src:'public/modules/**/*.css'
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
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');

	grunt.registerTask('dev',['env:dev','lint','concurrent:dev']);
	grunt.registerTask('debug',['env:dev','lint','concurrent:debug']);
	grunt.registerTask('lint',['jshint','csslint']);
	grunt.registerTask('test',['env:test','lint','mochaTest']);
};






