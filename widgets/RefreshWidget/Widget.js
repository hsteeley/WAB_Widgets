define(['dojo/_base/declare',
      'dojo/dom', 'dojo/on',
      'dojo/_base/lang',
      'dojo/topic',
      'jimu/BaseWidget',
      'jimu/PanelManager'],
function(declare, dom, on, lang, topic, BaseWidget, PanelManager) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'refresh-widget',
    // this property is set by the framework when widget is loaded.
    // name: 'RefreshWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      this._bindEvents();
      console.log('RefreshWidget::postCreate');
    },

    _bindEvents: function(){
      this.own(on(this.refreshButton, 'click', lang.hitch(this.refreshData)));
    },

    var: refreshWidget = "RefreshWidget",

    refreshData: function(){
      topic.publish("RefreshWidget", (refreshWidget));
      console.log('Data Published');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('RefreshWidget::startup');
    // },

    // onOpen: function(){
    //   console.log('RefreshWidget::onOpen');
    // },

    // onClose: function(){
    //   console.log('RefreshWidget::onClose');
    // },

    // onMinimize: function(){
    //   console.log('RefreshWidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('RefreshWidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('RefreshWidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('RefreshWidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('RefreshWidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('RefreshWidget::resize');
    // }

    //methods to communication between widgets:

  });

});
