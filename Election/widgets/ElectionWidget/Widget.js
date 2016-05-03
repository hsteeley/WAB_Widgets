define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'election-widget',
    // this property is set by the framework when widget is loaded.
    // name: 'ElectionWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('ElectionWidget::postCreate');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('ElectionWidget::startup');
    // },

    // onOpen: function(){
    //   console.log('ElectionWidget::onOpen');
    // },

    // onClose: function(){
    //   console.log('ElectionWidget::onClose');
    // },

    // onMinimize: function(){
    //   console.log('ElectionWidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('ElectionWidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('ElectionWidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('ElectionWidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('ElectionWidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('ElectionWidget::resize');
    // }

    //methods to communication between widgets:

  });

});
