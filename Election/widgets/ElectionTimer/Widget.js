define(['dojo/_base/declare',
        'jimu/BaseWidget'],
function(declare, BaseWidget) {

  return declare([BaseWidget], {

    baseClass: 'election-timer',
    timerWidget: null,
    count: null,
    counter: null,
    refreshTime: 300,

    postCreate: function() {
      this.inherited(arguments);
      timerWidget = this;
      this.timer();
    },

    timer: function(){
      timerWidget.count = timerWidget.refreshTime;
      timerWidget.counter = setInterval(function(){
        if (timerWidget.isChanged == true)
        {
          timerWidget.count = 0;
          timerWidget.isChanged = false;
        }
        var seconds = (timerWidget.count % 60);
        var minutes = Math.floor(timerWidget.count/60);
        if (timerWidget.count <= 0)
        {
          timerWidget.count = timerWidget.refreshTime;
          var seconds = (timerWidget.count % 60);
          var minutes = Math.floor(timerWidget.count/60);
          if (seconds <= 9)
          {
            document.getElementById("timer").innerHTML = minutes.toString() + ":0" + seconds.toString();
            timerWidget.count = timerWidget.count-1;
            return;
          }
          document.getElementById("timer").innerHTML = minutes.toString() + ":" + seconds.toString();
          timerWidget.count = timerWidget.count-1;
          return;
        }
        if (seconds <= 9)
        {
          document.getElementById("timer").innerHTML = minutes.toString() + ":0" + seconds.toString();
          timerWidget.count = timerWidget.count-1;
          return;
        }
        timerWidget.count = timerWidget.count-1;
        document.getElementById("timer").innerHTML = minutes.toString() + ":" + seconds.toString();
      }, 1000);
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('ElectionTimer::startup');
    // },

    // onOpen: function(){
    //   console.log('ElectionTimer::onOpen');
    // },

    // onClose: function(){
    //   console.log('ElectionTimer::onClose');
    // },

    // onMinimize: function(){
    //   console.log('ElectionTimer::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('ElectionTimer::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('ElectionTimer::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('ElectionTimer::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('ElectionTimer::onPositionChange');
    // },

    // resize: function(){
    //   console.log('ElectionTimer::resize');
    // }

    //methods to communication between widgets:

  });

});
