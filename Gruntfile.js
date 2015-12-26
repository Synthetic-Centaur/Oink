module.exports = function(grunt) {

  grunt.initConfig({
    'docco-plus': {
      debug: {
        src: ['tableofcontents.js','server/**/*.js', '!server/env/envConfig.js', '!server/index.js', 'client/**/*js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-docco-plus');
  grunt.registerTask('default', ['docco-plus']);
};
