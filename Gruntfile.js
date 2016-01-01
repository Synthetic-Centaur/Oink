module.exports = function(grunt) {

  grunt.initConfig({
    'docco-plus': {
      debug: {
        src: ['tableofcontents.js','server/**/*.js', '!server/env/envConfig.js', '!server/index.js', 'client/**/*js'],
        options: {
          output: 'docs/'
        }
      }
    },
    autoprefixer: {
      options: {
          browsers: ['last 2 versions']
      },
      dist: {
          files: {
              'public/css/main.min.css': 'public/css/styles.min.css'
          }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/css/styles.min.css': [
            'public/css/normalize.css', 'public/css/skeleton.css',
            'public/css/splash.css', 'public/css/sidenav.css',
            'public/css/dashboard.css', 'public/css/budget.css',
            'public/css/goals.css', 'public/css/animate.css'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-docco-plus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default', ['docco-plus']);
  grunt.registerTask('mincss', ['cssmin', 'autoprefixer']);

};
