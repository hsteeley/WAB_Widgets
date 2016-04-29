define(['dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/on',
        'dojo/parser',
        'dojo/dom',
        'dojo/topic',
        'dojo/_base/array',
        'dojo/query',
        'dojo/cookie',
        'jimu/BaseWidget',
        'jimu/utils',
        'esri/geometry/webMercatorUtils',
        'esri/map',
        'jimu/loaderplugins/jquery-loader!./widgets/DeviceWidget/Resources/libraries/jquery-2.1.0.min.js',
        './widgets/SettingsWidget/Resources/wijmo/wijmo.min.js',
        './widgets/SettingsWidget/Resources/wijmo/wijmo.input.min.js',
        'xstyle/css!./Resources/wijmo/wijmo.min.css'
],
function(declare, lang, on, parser, dom, topic, arrayUtils, query, cookie, BaseWidget, jimuUtils, webMercatorUtils, Map, $) {
  return declare([BaseWidget], {

    baseClass: 'settings-widget',
    //settingsWidget: null,
    //reloadTime: null,
    map1: null,
    devSettingsShown: false,
    settingsWidget: null,
    devicesArraySet: null,
    minLat: null,
    maxLat: null,
    minLong: null,
    maxLong: null,
    topLeftPoint: null,
    bottomRightPoint: null,

    postCreate: function() {
      this.inherited(arguments);
      settingsWidget = this;
      this.map1 = this.map;
      this._bindEvents();
    },

    _bindEvents: function(){
      this.own(on(this.SaveChanges, 'click', lang.hitch(this.SaveSettings)));
      this.own(on(this.SaveChanges, 'click', lang.hitch(this.refreshTimer)));
      this.own(on(this.search, 'click', lang.hitch(this.showDeviceSettings)));
      this.own(on(this.ViewExtentCheck, 'click', lang.hitch(this.showNewExtent)));
    },

    showNewExtent: function(){
      if (document.getElementById("setExtent").checked == true)
      {
        settingsWidget.topLeftPoint = webMercatorUtils.xyToLngLat(settingsWidget.map.extent.xmin, settingsWidget.map.extent.ymin);
        settingsWidget.bottomRightPoint = webMercatorUtils.xyToLngLat(settingsWidget.map.extent.xmax, settingsWidget.map.extent.ymax);
        settingsWidget.minLat = settingsWidget.topLeftPoint[1];
        settingsWidget.maxLat = settingsWidget.bottomRightPoint[1];
        settingsWidget.minLong = settingsWidget.topLeftPoint[0];
        settingsWidget.maxLong = settingsWidget.bottomRightPoint[0];

        document.getElementById("viewExtentMessage").innerHTML = "Your view extent will be set at " + settingsWidget.topLeftPoint + " " + settingsWidget.bottomRightPoint;
      }
      else
      {
        document.getElementById("viewExtentMessage").innerHTML = "";
      }
    },

    showDeviceSettings: function(){
      if (settingsWidget.devSettingsShown == false)
      {
        document.getElementById('deviceSettingsDiv').style.display = "block";
        settingsWidget.devSettingsShown = true;
        settingsWidget.loadDevSettings();
      }
      else if (settingsWidget.devSettingsShown == true)
      {
        document.getElementById('deviceSettingsDiv').style.display = "none";
        settingsWidget.devSettingsShown = false;
      }
    },

    loadDevSettings: function(){
      document.getElementById('theDeviceSettings').innerHTML = "";
      var RMID = loginWidget.loginInfo.RMID;
      var inputs = query(".list_itemSet");
      var DevID = null;
      var devIndex = 0;
      var count = 0;
      arrayUtils.forEach(inputs, function(input) {
        if (input.checked)
        {
          DevID = input.value;
          devIndex = count;
          return false;
        }
        count = count + 1;
      });

      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetDeviceSettings",
        data: {"RMID": RMID, "DevID": DevID},
        contentType: "application/json; charset=utf-8",
        success: GetDevSettingsSucceeded,
        error: ServiceFailed
      });

      function GetDevSettingsSucceeded(result){
        var str = settingsWidget.devicesArraySet[devIndex].LastDownload;
        var TimeStamp = str.substring(6, 16);
        var d = new Date(TimeStamp * 1000);
        var format = 'M/d/yy hh:mm:ss tt';
        var lastDL = wijmo.Globalize.format(d, format);

        str = settingsWidget.devicesArraySet[devIndex].LastUpload;
        TimeStamp = str.substring(6, 16);
        d = new Date(TimeStamp * 1000);
        format = 'M/d/yy hh:mm:ss tt';
        var lastUp = wijmo.Globalize.format(d, format);

        str = settingsWidget.devicesArraySet[devIndex].LastConfigured;
        TimeStamp = str.substring(6, 16);
        d = new Date(TimeStamp * 1000);
        format = 'M/d/yy hh:mm:ss tt';
        var lastCon = wijmo.Globalize.format(d, format);

        var lastVers = settingsWidget.devicesArraySet[devIndex].LastVersionExecuted;

        $("#theDeviceSettings").append("Device Name: " + settingsWidget.devicesArraySet[devIndex].DeviceDescription);
        document.getElementById('theDeviceSettings').appendChild(document.createElement('br'));
        $("#theDeviceSettings").append("As of: " + lastCon);
        document.getElementById('theDeviceSettings').appendChild(document.createElement('br'));
        $("#theDeviceSettings").append("Current Version: " + lastVers);
        document.getElementById('theDeviceSettings').appendChild(document.createElement('br'));
        $("#theDeviceSettings").append("Last Full Sync: " + lastDL);
        document.getElementById('theDeviceSettings').appendChild(document.createElement('br'));
        $("#theDeviceSettings").append("Last Upload: " + lastUp);
        document.getElementById('theDeviceSettings').appendChild(document.createElement('br'));

        var index = 0;
        result.GetDeviceSettingsResult.forEach(displaySetting);

        function displaySetting(){
          var name = result.GetDeviceSettingsResult[index].SettingName;
          var value = result.GetDeviceSettingsResult[index].SettingValue;

          $("#theDeviceSettings").append(name + " " + value);
          document.getElementById('theDeviceSettings').appendChild(document.createElement('br'));
          index = index + 1;
        }
      }

      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }
    },

    loadDevices: function(){
      document.getElementById('devSettings').innerHTML = '';

      var RMID = loginWidget.loginInfo.RMID;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetDevices",
        data: {"RMID": RMID},
        contentType: "application/json; charset=utf-8",
        success: GetSetDevicesSucceeded,
        error: ServiceFailed
      });

      function GetSetDevicesSucceeded(result) {
        var index = 0;
        settingsWidget.devicesArraySet = result.GetDevicesResult;
        settingsWidget.devicesArraySet.forEach(createCheckboxSet);

        function createCheckboxSet(){
          var devID = settingsWidget.devicesArraySet[index].DeviceID;
          var devDesc = settingsWidget.devicesArraySet[index].DeviceDescription;

          var label = document.createElement("div");
          label.id = "newRadio" + index;
          var description = document.createTextNode(devDesc);
          var Radio = document.createElement("input");

          Radio.type = "radio";
          Radio.name = "radioB";
          Radio.value = devID;
          Radio.id = "CB" + index;
          if (index == 0)
          {
            Radio.checked = true;
          }
          else if (index > 0)
          {
            Radio.checked = false;
          }
          Radio.className = "list_itemSet";

          label.appendChild(Radio);
          label.appendChild(description);

          var devContainer = document.getElementById('devSettings');
          devContainer.appendChild(label);

          document.getElementById(label.id).onclick = settingsWidget.hideDevSettings;

          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }
    },

    hideDevSettings: function(){
      document.getElementById('deviceSettingsDiv').style.display = "none";
      settingsWidget.devSettingsShown = false;
    },

    SaveSettings: function() {
      document.getElementById("changesSaved").style.display = "none";
      document.getElementById("changesSaved").style.display = "block";

      if (document.getElementById("setExtent").checked == true)
      {
        _saveTLPXViewExtentCookie(settingsWidget.minLong);
        _saveTLPYViewExtentCookie(settingsWidget.minLat);
        _saveBRPXViewExtentCookie(settingsWidget.maxLong);
        _saveBRPYViewExtentCookie(settingsWidget.maxLat);
      }

      document.getElementById("viewExtentMessage").innerHTML = "";
      document.getElementById("setExtent").checked = false;

      setTimeout(function() {
        $(document.getElementById("changesSaved")).fadeOut(750);
      }, 3000);

      var r = document.getElementById("refreshTime");
      var ReloadTime = r.options[r.selectedIndex].value;

      //var colorFrom = document.getElementById("BCTFromColorPicker");
      //var fromColor = colorFrom.options[colorFrom.selectedIndex].value;
      //var colorTo = document.getElementById("BCTToColorPicker");
      //var toColor = colorTo.options[colorTo.selectedIndex].value;

      var BCSize = document.getElementById("BCTSize").value;

      topic.publish("SettingsWidget", [ReloadTime, BCSize]);

      _saveReloadTimeCookie(ReloadTime);
      //_saveFromColorCookie(fromColor);
      //_saveToColorCookie(toColor);
      _saveBCSizeCookie(BCSize);

      function  _saveReloadTimeCookie  (ReloadTime) {
        var cookieName = "ReloadTime";
        removeCookie(ReloadTime);
        cookie(cookieName, ReloadTime, {
          path: '/'
        });
      }
      //function  _saveFromColorCookie  (fromColor) {
      //  var cookieName = "fromColor";
      //  removeCookie(fromColor);
      //  cookie(cookieName, fromColor, {
      //    path: '/'
      //  });
      //  console.log(cookie(cookieName));
      //}
      //function  _saveToColorCookie  (toColor) {
      //  var cookieName = "toColor";
      //  removeCookie(toColor);
      //  cookie(cookieName, toColor, {
      //    path: '/'
      //  });
      //  console.log(cookie(cookieName));
      //}
      function  _saveTLPXViewExtentCookie  (topLeftPointX) {
        var cookieName = "topLeftPointX";
        removeCookie(topLeftPointX);
        cookie(cookieName, topLeftPointX, {
          path: '/'
        });
      }
      function  _saveTLPYViewExtentCookie  (topLeftPointY) {
        var cookieName = "topLeftPointY";
        removeCookie(topLeftPointY);
        cookie(cookieName, topLeftPointY, {
          path: '/'
        });
      }
      function  _saveBRPXViewExtentCookie  (bottomRightPointX) {
        var cookieName = "bottomRightPointX";
        removeCookie(bottomRightPointX);
        cookie(cookieName, bottomRightPointX, {
          path: '/'
        });
      }
      function  _saveBRPYViewExtentCookie  (bottomRightPointY) {
        var cookieName = "bottomRightPointY";
        removeCookie(bottomRightPointY);
        cookie(cookieName, bottomRightPointY, {
          path: '/'
        });
      }
      function  _saveBCSizeCookie  (BCSize) {
        var cookieName = "BCSize";
        removeCookie(BCSize);
        cookie(cookieName, BCSize, {
          path: '/'
        });
      }
      function  removeCookie  (cookieName) {
        var path = '/';
        jimuUtils.removeCookie(cookieName, path);
      }
    },

    loadCookies: function(){
      if (cookie("ReloadTime") != null)
      {
        document.getElementById('refreshTime').value = cookie("ReloadTime");
      }
      //if (cookie("fromColor") != null)
      //{
      //  document.getElementById('BCTFromColorPicker').value = cookie("fromColor");
      //}
      //if (cookie("toColor") != null)
      //{
      //  document.getElementById('BCTToColorPicker').value = cookie("toColor");
      //}
      if (cookie("BCSize") != null)
      {
        document.getElementById('BCTSize').value = cookie("BCSize");
      }
    },

    onClose: function(){
       document.getElementById("changesSaved").style.display = "none";
     },

    onOpen: function(){
      this.loadDevices();
      this.loadCookies();
    }
  });
});
