module.exports = function(grunt) {

  // replace these with your own paths
 
   var app3Dir = 'C:\\Users\\hsteeley\\Downloads\\arcgis-web-appbuilder-1.3\\arcgis-web-appbuilder-1.3\\server\\apps\\3\\kcsWidgets';
 

  grunt.initConfig({
    watch: {
      main: {
        files: ['kcsWidgets/**'],
        tasks: ['sync'],
        options: {
          spawn: false
        }
      }
    },

    sync: {
      main: {
        files: [ {
          cwd: 'kcsWidgets',
          src: ['**'],
          dest: app3Dir
        }],
        verbose: true // Display log messages when copying files
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', ['sync', 'watch']);
};