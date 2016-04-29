define(['dojo/_base/declare',
      'dojo/dom', 'dojo/on',
      'dojo/_base/lang',
      'dojo/topic',
      'jimu/BaseWidget'],
function(declare, dom, on, lang, topic, BaseWidget) {
  return declare([BaseWidget], {

    baseClass: 'refresh-widget',

    postCreate: function() {
      this.inherited(arguments);
      this._bindEvents();
    },

    _bindEvents: function(){
      this.own(on(this.refreshButton, 'click', lang.hitch(this.refreshData)));
    },

    var: refreshWidget = "RefreshWidget",

    refreshData: function(){
      topic.publish("RefreshWidget", (refreshWidget));
    }
  });
});
