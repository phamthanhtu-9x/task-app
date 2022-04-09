'use strict';
const sass = require('node-sass');
module.exports = function (grunt) {

  grunt.config.set('src', '');
  grunt.config.set('dist', '../');
  grunt.config.set('useRootPath', false);

  grunt.initConfig({

    conf: {
      src: grunt.config.get('src'),
      dist: grunt.config.get('dist')
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          unixNewlines: true
        },
        files: [{
          expand: true,
          cwd: '../sass/',
          src: ['**/*.sass'],
          dest: '../css/',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        map: true,
        browsers: ['last 4 version']
      },
      dist: {
        src: '../css/*.css'
      }
    },

    watch: {
      sass: {
        files: ['../sass/**/*.sass'],
        tasks: ['sass','autoprefixer']
      }
    },

  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'watch'
  ]);

  grunt.registerTask('quick', [
    'sass',
    'autoprefixer',
    'watch'
  ]);


};