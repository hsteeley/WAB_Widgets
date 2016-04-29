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
  return declare([BaseWidget], {

    baseClass: 'timer-widget',
    counter: null,
    timerWidget: null,
    userPaused: false,
    inEditMode: false,
    isChanged: false,
    refreshTime: null,
    count: null,
    firstThrough: true,

    postCreate: function() {
      this.inherited(arguments);
      timerWidget = this;
      this._bindEvents();
      this.timer();
    },

    _bindEvents: function(){
      this.loadCookies();
      this.own(on(this.timerButton, 'click', lang.hitch(this.checkPause)));
      var handle = topic.subscribe("SettingsWidget", function (Settings) {
        timerWidget.refreshTime = Settings[0];
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
          }, 1000);
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
        }
        else
        {
          TLPLat = loginWidget.loginInfo.Y1;
          TLPLong = loginWidget.loginInfo.X1;
          BRPLat =loginWidget.loginInfo.Y2;
          BRPLong = loginWidget.loginInfo.X2;
          topLeftPoint = webMercatorUtils.xyToLngLat(TLPLong, TLPLat);
          bottomRightPoint = webMercatorUtils.xyToLngLat(BRPLong, BRPLat);
        }

        var newExtent = new Extent(topLeftPoint[0], topLeftPoint[1], bottomRightPoint[0], bottomRightPoint[1], new SpatialReference({wkid:4326}));
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
  });
});
