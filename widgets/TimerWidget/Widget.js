define(['dojo/_base/declare',
  'dojo/dom', 'dojo/on',
  'dojo/_base/lang',
  'dojo/topic',
  'dojo/cookie',
  'esri/map',
  'esri/SpatialReference',
  'esri/geometry/Extent',
  'esri/geometry/Point',
  'esri/geometry/webMercatorUtils',
  'jimu/BaseWidget',
  'jimu/PanelManager'],
function(declare, dom, on, lang, topic, cookie, map, SpatialReference, Extent, Point, webMercatorUtils, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'timer-widget',
    counter: null,
    timerWidget: null,
    userPaused: false,
    inEditMode: false,
    isChanged: false,
    refreshTime: null,
    count: null,
    firstThrough: true,
    //refreshTime: null,
    // this property is set by the framework when widget is loaded.
    // name: 'TimerWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      timerWidget = this;
      this._bindEvents();
      this.timer();

      console.log('TimerWidget::postCreate');
    },

    _bindEvents: function(){
      this.loadCookies();
      this.own(on(this.timerButton, 'click', lang.hitch(this.checkPause)));
      var handle = topic.subscribe("SettingsWidget", function (Settings) {
        timerWidget.refreshTime = Settings[0];
        console.log(Settings[0]);
        timerWidget.isChanged = true;
      });
      var handle = topic.subscribe("CustomerWidget", function (EditMode) {
        if (EditMode == "Edit Mode Entered")
        {
          if (isPaused == false)
          {
            timerWidget.checkPause();
            EditMode = "";
            timerWidget.userPaused = false;
          }
          else if (isPaused == true)
          {
            timerWidget.userPaused = true;
            EditMode = "";
          }
          timerWidget.inEditMode = true;
        }
        else if (EditMode == "Edit Mode Left")
        {
          timerWidget.inEditMode = false;
          if (timerWidget.userPaused == false)
          {
            timerWidget.checkPause();
          }
          EditMode = "";
        }
      });
      var handle = topic.subscribe("RefreshWidget", function (RefreshWidget) {
        if (RefreshWidget == "RefreshWidget") {
          timerWidget.isChanged = true;
          RefreshWidget = "";
        }
        console.log("Timer Refreshed");
      });
    },

    var: isPaused = false,
    var: refreshWidget = "RefreshWidget",


    checkPause: function(){
      if (timerWidget.inEditMode == false)
      {
        if (isPaused) {
          counter = setInterval(function () {
            if (timerWidget.isChanged == true)
            {
              timerWidget.count = 0;
              timerWidget.isChanged = false;
            }
            var seconds = (timerWidget.count % 60);
            var minutes = Math.floor(timerWidget.count / 60);
            if (timerWidget.count <= 0) {
              topic.publish("TimerWidget", (refreshWidget));
              console.log('Data Published');
              timerWidget.count = timerWidget.refreshTime;
              var seconds = (timerWidget.count % 60);
              var minutes = Math.floor(timerWidget.count / 60);
              if (seconds <= 9) {
                document.getElementById("timer").innerHTML = minutes.toString() + ":0" + seconds.toString();
                timerWidget.count = timerWidget.count - 1;
                return;
              }
              document.getElementById("timer").innerHTML = minutes.toString() + ":" + seconds.toString();
              timerWidget.count = timerWidget.count - 1;
              return;
            }
            if (seconds <= 9) {
              document.getElementById("timer").innerHTML = minutes.toString() + ":0" + seconds.toString();
              timerWidget.count = timerWidget.count - 1;
              return;
            }
            timerWidget.count = timerWidget.count - 1;
            document.getElementById("timer").innerHTML = minutes.toString() + ":" + seconds.toString();
          }, 1000); //1000 will  run it every 1 second
          isPaused = false;
          return;
        }
        clearInterval(counter);
        document.getElementById("timer").innerHTML = "||";
        isPaused = true;
      }
    },

    timer: function(){
      this.SetExtent();
      timerWidget.count = timerWidget.refreshTime;
      counter = setInterval(function(){
        if (timerWidget.isChanged == true)
        {
          timerWidget.count = 0;
          timerWidget.isChanged = false;
        }
        var seconds = (timerWidget.count % 60);
        var minutes = Math.floor(timerWidget.count/60);
        if (timerWidget.count <= 0)
        {
          topic.publish("TimerWidget", (refreshWidget));
          console.log('Data Published');
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
      }, 1000); //1000 will  run it every 1 second
    },

    SetExtent: function(){
      if (timerWidget.firstThrough == true)
      {
        timerWidget.firstThrough = false;

        var TLPLong;
        var TLPLat;
        var BRPLong;
        var BRPLat;
        var topLeftPoint;
        var bottomRightPoint;
        if (cookie("topLeftPointX") != null)
        {
          topLeftPoint = [cookie("topLeftPointX"), cookie("topLeftPointY")];
          bottomRightPoint = [cookie("bottomRightPointX"), cookie("bottomRightPointY")];
          console.log(topLeftPoint)
        }
        else
        {
          TLPLat = loginWidget.loginInfo.Y1;
          TLPLong = loginWidget.loginInfo.X1;
          BRPLat =loginWidget.loginInfo.Y2;
          BRPLong = loginWidget.loginInfo.X2;
          topLeftPoint = webMercatorUtils.xyToLngLat(TLPLong, TLPLat);
          bottomRightPoint = webMercatorUtils.xyToLngLat(BRPLong, BRPLat);
          console.log(topLeftPoint);
        }

        var newExtent = new Extent(topLeftPoint[0], topLeftPoint[1], bottomRightPoint[0], bottomRightPoint[1], new SpatialReference({wkid:4326}));
        console.log(newExtent);
        timerWidget.map.setExtent(newExtent, true);
      }
    },

    loadCookies: function(){
      if (cookie("ReloadTime") != null)
      {
        timerWidget.refreshTime = cookie("ReloadTime");
      }
      else
      {
        timerWidget.refreshTime = 300;
      }
    }

    //onOpen: function(){
    //  this.loadCookies();
    //}

    //onClose: function(){
    //  clearInterval(counter);
    //  document.getElementById("timer").innerHTML = "Paused";
    //  PanelManager.getInstance().openWidget(TimerWidget);
    //}

     //startup: function() {
     //  this.inherited(arguments);
     //  this.fetchDataByName("SettingsWidget");
     //  console.log(settingsWidget.Settings[0]);
     //  console.log('TimerWidget::startup');
     //}

    // onMinimize: function(){
    //   console.log('TimerWidget::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('TimerWidget::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('TimerWidget::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('TimerWidget::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('TimerWidget::onPositionChange');
    // },

    // resize: function(){
    //   console.log('TimerWidget::resize');
    // }

    //methods to communication between widgets:

  });

});
