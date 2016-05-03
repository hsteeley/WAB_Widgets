module.exports = function(grunt) {

  // replace these with your own paths

  var app4Dir = 'C:\\Users\\hsteeley\\Downloads\\arcgis-web-appbuilder-1.3\\arcgis-web-appbuilder-1.3\\server\\apps\\4\\widgets';
  var stemappDir = 'C:\\Users\\hsteeley\\Downloads\\arcgis-web-appbuilder-1.3\\arcgis-web-appbuilder-1.3\\client\\stemapp\\widgets';

  grunt.initConfig({
    watch: {
      main: {
        files: ['widgets/**'],
        tasks: ['sync'],
        options: {
          spawn: false
        }
      }
    },
    sync: {
      main: {
        files: [{
          cwd: 'widgets',
           src: ['**'],
          dest: app4Dir
        },{
          cwd: 'widgets',
           src: ['**'],
          dest: stemappDir
        }],
        verbose: true // Display log messages when copying files
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', ['sync', 'watch']);
};