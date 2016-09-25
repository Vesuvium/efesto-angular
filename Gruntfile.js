module.exports = function(grunt){
    grunt.initConfig({
        jshint: {
          all: [
            'efesto-angular.js'
          ]
        },
        
        uglify: {
          my_target: {
            files: {
              'dist/efesto-angular.min.js': ['efesto-angular.js']
            }
          }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['lint', 'uglify']);
};
