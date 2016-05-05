define(['dojo/_base/declare', 'jimu/BaseWidget', 'dojo/dom', 'dojo/on',
      'jimu/utils',
      'jimu/loaderplugins/jquery-loader!./widgets/DeviceWidget/Resources/libraries/jquery-2.1.0.min.js',
      'dojo/parser',
      'dojo/_base/lang',
      'dojo/query',
      "dojo/_base/array",
      'dojo/topic',
      'dojo/dom-class',
      'dojo/cookie',
      'esri/map',
      'esri/dijit/BasemapGallery',
      'esri/arcgis/utils',
      'esri/dijit/Search',
      'esri/symbols/PictureMarkerSymbol',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/graphic',
      'esri/Color',
      'esri/geometry/Point',
      'esri/SpatialReference',
      'esri/layers/GraphicsLayer',
      'esri/dijit/OpacitySlider',
      'esri/InfoTemplate',
      'esri/toolbars/edit',
      'esri/geometry/Extent',
      'esri/graphicsUtils',
      'esri/symbols/TextSymbol',
      'esri/symbols/Font',
      'dijit/layout/BorderContainer',
      'dijit/layout/ContentPane',
      'dijit/TitlePane',
      './widgets/DeviceWidget/Resources/libraries/prototype.js',
      './widgets/DeviceWidget/Resources/wijmo/wijmo.min.js',
      './widgets/DeviceWidget/Resources/wijmo/wijmo.input.min.js',
      './widgets/DeviceWidget/Resources/RainbowVis-JS-master/rainbowvis.js',
      'xstyle/css!./Resources/wijmo/wijmo.min.css'
      ],
function(declare, BaseWidget, dom, on, jimuUtils, $, parser, lang,  query, arrayUtils, topic, domClass, cookie, Map, BasemapGallery, arcgisUtils, Search, PictureMarkerSymbol, SimpleMarkerSymbol, Graphic, Color, Point,
         SpatialReference, GraphicsLayer, OpacitySlider, InfoTemplate, Edit, Extent, graphicsUtils, TextSymbol, Font) {
  return declare([BaseWidget], {
    baseClass: 'device-widget',
    deviceGraphicsLayer: null,
    wDevices: null,
    theStartDate: null,
    theEndDate: null,
    theStartDateInv: null,
    theEndDateInv: null,
    inputStartDate: null,
    inputEndDate: null,
    inputStartDateInv: null,
    inputEndDateInv: null,
    editGraphicsLayer: null,
    devicesArray: null,
    fromColor: "white",
    toColor: "blue",
    graphicSize: null,
    counter: null,
    playRouteObject: null,
    routeDevice: null,
    routeCounter: null,
    isChecked: false,
    lastTime: null,
    firstLoad: false,
    currentVersion: null,
    devCheckedArray: [],
    startDate: null,
    endDate: null,
    startDateInv: null,
    endDateInv: null,
    namesLayerOn: true,
    invoiceIndex: null,
    indexInvoice: null,
    plotInvoiceIndex: null,
    totalInvoices: null,

    postCreate: function() {
      this.inherited(arguments);
      wDevices = this;
      this._addGraphicsLayers();
      this._bindEvents();
    },

    _addGraphicsLayers: function(){
      devTextGraphicsLayer = new GraphicsLayer({
        id: 'devTextGraphicsLayer',
        title: 'webServiceGraphics'
      });
      this.map.addLayer(devTextGraphicsLayer, 7);

      deviceGraphicsLayer = new GraphicsLayer({
        id: 'deviceGraphicsLayer',
        title: 'webServiceGraphics'
      });
      this.map.addLayer(deviceGraphicsLayer, 0);

      playRouteGraphicsLayer = new GraphicsLayer({
        id: 'playRouteGraphicsLayer',
        title: 'webServiceGraphics'
      });
      this.map.addLayer(playRouteGraphicsLayer, 10);

      invoicesGraphicsLayer = new GraphicsLayer({
        id: 'invoicesGraphicsLayer',
        title: 'webServiceGraphics'
      });
      this.map.addLayer(invoicesGraphicsLayer, 1);
    },

    _bindEvents: function(){
      this.loadDevCookies();
      this.own(on(this.ShowMe, 'click', lang.hitch(this.RunDevices)));
      this.own(on(this.BCTRadio, 'click', lang.hitch(this.showBCT)));
      this.own(on(this.LKLRadio, 'click', lang.hitch(this.hideBCT)));
      this.own(on(this.LICRadio, 'click', lang.hitch(this.hideBCT)));
      this.own(on(this.InvRadio, 'click', lang.hitch(this.hideBCT)));
      this.own(on(this.LICRadio, 'click', lang.hitch(this.hideInv)));
      this.own(on(this.InvRadio, 'click', lang.hitch(this.hideInv)));
      this.own(on(this.BCTRadio, 'click', lang.hitch(this.hideInv)));
      this.own(on(this.LKLRadio, 'click', lang.hitch(this.hideRouteAnimation)));
      this.own(on(this.LICRadio, 'click', lang.hitch(this.hideRouteAnimation)));
      this.own(on(this.InvRadio, 'click', lang.hitch(this.hideRouteAnimation)));
      this.own(on(this.InvRadio, 'click', lang.hitch(this.showInv)));
      this.own(on(this.DeviceLayerCheck, 'click', lang.hitch(this.toggleDevLayer)));
      this.own(on(this.DeviceSlider, 'input', lang.hitch(this.onChange)));
      this.own(on(this.BCTSingleDate, 'click', lang.hitch(this.hideBCTDateRange)));
      this.own(on(this.BCTRangeDate, 'click', lang.hitch(this.showBCTDateRange)));
      this.own(on(this.InvSingleDate, 'click', lang.hitch(this.hideInvDateRange)));
      this.own(on(this.InvRangeDate, 'click', lang.hitch(this.showInvDateRange)));
      this.own(on(this.UncheckAll, 'click', lang.hitch(this.toggleCheckDevices)));
      this.own(on(this.speedOverTog, 'click', lang.hitch(this.toggleSpeedOver)));
      this.own(on(this.PlayRoute, 'click', lang.hitch(this.routeTimer)));
      this.own(on(this.StopRoute, 'click', lang.hitch(this.stopTimer)));
      this.own(on(this.DevTextLayerCheck, 'click', lang.hitch(this.toggleDevNames)));
      this.own(on(this.lastReportCheck, 'click', lang.hitch(this.toggleLastReport)));
      this.own(on(this.stoppedOverTog, 'click', lang.hitch(this.toggleStoppedOver)));
      var handle = topic.subscribe("TimerWidget", function (RefreshWidget) {
        if (RefreshWidget == "RefreshWidget")
        {
          wDevices.RunDevices();
          RefreshWidget = "";
        }
      });
      var handle = topic.subscribe("RefreshWidget", function (RefreshWidget) {
        if (RefreshWidget == "RefreshWidget")
        {
          wDevices.RunDevices();
          RefreshWidget = "";
        }
      });
      var handle = topic.subscribe("SettingsWidget", function (Settings) {
        wDevices.graphicSize = Settings[1];
      });
    },

    showInvDateRange: function(){
      document.getElementById("InvDateRange").style.display = "block";
      document.getElementById("PickStartInv").innerHTML = "Pick Start Date";
    },

    hideInvDateRange: function(){
      document.getElementById("InvDateRange").style.display = "none";
      document.getElementById("PickStartInv").innerHTML = "Pick Date";
    },

    showInv: function(){
      document.getElementById("InvoiceQuery").style.display = "block";
    },

    hideInv: function(){
      document.getElementById("InvoiceQuery").style.display = "none";
    },

    loadDevCookies: function(){
      //if (cookie("fromColor") != null)
      //{
      //  wDevices.fromColor = cookie("fromColor");
      //}
      //else
      //{
      //  wDevices.fromColor = 'white';
      //}
      //if (cookie("toColor") != null)
      //{
      //  wDevices.toColor = cookie("toColor");
      //}
      //else
      //{
      //  wDevices.toColor = 'blue';
      //}
      if (cookie("BCSize") != null)
      {
        wDevices.graphicSize = cookie("BCSize");
      }
      else
      {
        wDevices.graphicSize = 14;
      }
    },

    toggleStoppedOver: function(){
      if (document.getElementById("stoppedOver").checked == true)
      {
        document.getElementById("stoppedOverDiv").style.display = "block";
      }
      else if (document.getElementById("stoppedOver").checked == false)
      {
        document.getElementById("stoppedOverDiv").style.display = "none";
      }
    },

    toggleLastReport: function(){
      if (document.getElementById("lastReport").checked == true)
      {
        document.getElementById("reportSinceTime").style.display = "block";
      }
      else if (document.getElementById("lastReport").checked == false)
      {
        document.getElementById("reportSinceTime").style.display = "none";
      }
    },

    toggleDevNames: function(){
      if (document.getElementById("toggleDevTextLayer").checked == true)
      {
        devTextGraphicsLayer.show();
        wDevices.namesLayerOn = true;
      }
      else if (document.getElementById("toggleDevTextLayer").checked == false)
      {
        devTextGraphicsLayer.hide();
        wDevices.namesLayerOn = false;
      }
    },

    playRouteAnimation: function(){
      var c = document.getElementById('routeSeconds');
      var count = c.options[c.selectedIndex].value;

      var milliCount = count * 1000;
      var pointsToRoute = wDevices.playRouteObject.length;
      var routeInterval = milliCount / pointsToRoute;

      var index = pointsToRoute - 1;

      wDevices.routeCounter = setInterval(function(){
        playRouteGraphicsLayer.clear();
        var long = wDevices.playRouteObject[index].Longitude;
        var lat = wDevices.playRouteObject[index].Latitude;

        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));

        var bearing = wDevices.playRouteObject[index].Bearing;


        if (bearing > 180)
        {
          var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/TransitTruckThickHaloReversed.png", 40, 40);
          sms.setAngle(bearing - 90);
        }
        else if (bearing <= 180)
        {
          var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/TransitTruckThickHalo.png", 40, 40);
          sms.setAngle(bearing - 90);
        }

        var BCTText = new TextSymbol(wDevices.playRouteObject[index].DeviceDescription);
        BCTText.setHaloColor(new Color([0, 0, 0]));
        BCTText.setHaloSize(2);
        BCTText.setOffset(16, 6);
        var font  = new Font();
        font.setSize("16pt");
        font.setWeight(Font.WEIGHT_BOLD);
        BCTText.setFont(font);
        BCTText.setColor(new Color([255, 255, 0]));
        BCTText.setAngle(345);
        BCTText.setHorizontalAlignment("left");

        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var BCTGraphic = new Graphic(wDevices.pt, BCTText);
        playRouteGraphicsLayer.add(BCTGraphic);

        var graphic = new Graphic(wDevices.pt, sms);

        playRouteGraphicsLayer.add(graphic);

        var str = wDevices.playRouteObject[index].GPSTimeStamp;
        var TimeStamp = str.substring(6, 16);
        var d = new Date(TimeStamp * 1000);
        var format = 'M/d/yy hh:mm:ss tt';
        var GTimeStamp = wijmo.Globalize.format(d, format);

        document.getElementById('routeTime').innerHTML = GTimeStamp;

        index = index - 1;
      }, routeInterval);
    },

    showRouteAnimation: function(resultObject){
      document.getElementById("routeAnimation").style.display = "block";
      wDevices.playRouteObject = resultObject;
    },

    hideRouteAnimation: function(){
      document.getElementById("routeAnimation").style.display = "none";
    },

    stopTimer: function(){
      playRouteGraphicsLayer.clear();
      clearInterval(wDevices.counter);
      clearInterval(wDevices.routeCounter);
      document.getElementById("timerRoute").innerHTML = "";
      document.getElementById("playRouteText").style.display = "none";
    },

    routeTimer: function(){
      wDevices.stopTimer();
      var c = document.getElementById('routeSeconds');
      var count = c.options[c.selectedIndex].value;
      var startAnimation = count;

      wDevices.counter = setInterval(function(){
        var seconds = (count % 60);
        var minutes = Math.floor(count/60);
        if (count == startAnimation)
        {
          wDevices.playRouteAnimation();
          document.getElementById("playRouteText").style.display = "block";
        }
        if (count <= 0)
        {
          wDevices.stopTimer();
        }
        if (seconds <= 9)
        {
          document.getElementById("timerRoute").innerHTML = minutes.toString() + ":0" + seconds.toString();
          count = count-1;
          return;
        }
        count = count-1;
        document.getElementById("timerRoute").innerHTML = minutes.toString() + ":" + seconds.toString();
      }, 1000);


    },

    toggleSpeedOver: function(){
      if (document.getElementById("speedOver").checked == true)
      {
        document.getElementById("speedOverDiv").style.display = "block";
      }
      else if (document.getElementById("speedOver").checked == false)
      {
        document.getElementById("speedOverDiv").style.display = "none";
      }
    },

    toggleCheckDevices: function(){
      var index = 0;
      var inputs = query(".list_item");
      if  (wDevices.isChecked == false)
      {
        wDevices.isChecked = true;
        document.getElementById('CheckAll').src = "./widgets/DeviceWidget/images/uncheckedBox.png";
        arrayUtils.forEach(inputs, function(input) {
          input.checked = false;
          index = index + 1;
        });
      }
      else if  (wDevices.isChecked == true)
      {
        wDevices.isChecked = false;
        document.getElementById('CheckAll').src = "./widgets/DeviceWidget/images/checkedBox.png";
        arrayUtils.forEach(inputs, function(input) {
          input.checked = true;
          index = index + 1;
        });
      }
    },

    onChange: function(){
      var o = document.getElementById('devOpacity_control').value;
      deviceGraphicsLayer.setOpacity(o / 100);
      devTextGraphicsLayer.setOpacity(o / 100);
      invoicesGraphicsLayer.setOpacity(o / 100);
    },

    toggleDevLayer: function(){
      if (document.getElementById("toggleDeviceLayer").checked == true)
      {
        deviceGraphicsLayer.show();
        invoicesGraphicsLayer.show();
        if (wDevices.namesLayerOn == true)
        {
          devTextGraphicsLayer.show();
          document.getElementById("toggleDevTextLayer").checked = true;
        }
      }
      else if (document.getElementById("toggleDeviceLayer").checked == false)
      {
        deviceGraphicsLayer.hide();
        devTextGraphicsLayer.hide();
        invoicesGraphicsLayer.hide();
        document.getElementById("toggleDevTextLayer").checked = false;
      }
    },

    showBCT: function(){
      document.getElementById("BCTDiv").style.display = "block";
    },

    hideBCT: function(){
      document.getElementById("BCTDiv").style.display = "none";
    },

    showBCTDateRange: function(){
      document.getElementById("BCTDateRange").style.display = "block";
      document.getElementById("PickStart").innerHTML = "Pick Start Date";
    },

    hideBCTDateRange: function(){
      document.getElementById("BCTDateRange").style.display = "none";
      document.getElementById("PickStart").innerHTML = "Pick Date";
    },

    _getVersion: function(){
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetVersion",
        data: {},
        contentType: "application/json; charset=utf-8",
        success: GetVersionSucceeded,
        error: ServiceFailed
      });
      function GetVersionSucceeded(result){
        wDevices.currentVersion = result.GetVersionResult;
        wDevices._loadDevices();
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }
    },

    _loadDevices: function(){
      document.getElementById('DeviceChecks').innerHTML = '';

      var RMID = loginWidget.loginInfo.RMID;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetDevices",
        data: {"RMID": RMID},
        contentType: "application/json; charset=utf-8",
        success: GetDevicesSucceeded,
        error: ServiceFailed
      });
      function GetDevicesSucceeded(result) {
        wDevices.devicesArray = result.GetDevicesResult;
        var index = 0;

        wDevices.devicesArray.forEach(createCheckbox);

        function createCheckbox(){
          var devID = wDevices.devicesArray[index].DeviceID;
          var devDesc = wDevices.devicesArray[index].DeviceDescription;

          var label = document.createElement("div");
          label.id = "newCheck" + index;
          var description = document.createTextNode(devDesc);
          var checkbox = document.createElement("input");

          checkbox.type = "checkbox";
          checkbox.name = "  " + devDesc;
          checkbox.value = devID;
          checkbox.id = "CB" + index;
          checkbox.checked = true;
          checkbox.className = "list_item";

          label.appendChild(checkbox);
          label.appendChild(description);

          document.getElementById('DeviceChecks').appendChild(label);

          var devIndex = 0;

          while (devIndex < loginWidget.loginInfo.AllDevices.length)
          {
            if (loginWidget.loginInfo.AllDevices[devIndex].DeviceID == devID)
            {
              if (loginWidget.loginInfo.AllDevices[devIndex].LastVersionExecuted < wDevices.currentVersion)
              {
                domClass.add(document.getElementById(label.id), "outdatedVersion");
              }
              else if (loginWidget.loginInfo.AllDevices[devIndex].LastVersionExecuted > wDevices.currentVersion)
              {
                domClass.add(document.getElementById(label.id), "futureVersion");
              }
              else
              {
                domClass.add(document.getElementById(label.id), "currentVersion");
              }
            }
            devIndex = devIndex + 1;
          }

          index = index + 1;
          }
        if (wDevices.firstLoad)
        {
          wDevices.RunDevices();
          wDevices.firstLoad = false;
        }

        index = 0;
        wDevices.devicesArray.forEach(loadDropDown);

        function loadDropDown(){
          var option = document.createElement("option");
          option.text = wDevices.devicesArray[index].DeviceDescription;
          option.value = wDevices.devicesArray[index].DeviceID;
          document.getElementById("deviceSelection").appendChild(option);
          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }
    },

    onRevieceData: function(name) {
      if(name !== 'GetData'){
        return;
      }
    },

    RunDevices: function() {
      document.body.style.cursor = 'default';
      document.getElementById("DevicesDiv").style.display = "block";
      var RMID = loginWidget.loginInfo.RMID;
      var format = 'M/d/yy ';
      wDevices.startDate = wijmo.Globalize.format(wDevices.inputStartDate.value, format);
      wDevices.startDateInv = wijmo.Globalize.format(wDevices.inputStartDateInv.value, format);
      var DevIDs = "";
      wDevices.devCheckedArray = [];

      var inputs = query(".list_item");
      var index = 0;
      var numDevChecked = 0;

      arrayUtils.forEach(inputs, function(input) {
        if (input.checked) {
          numDevChecked = numDevChecked + 1;
        }
      });

      arrayUtils.forEach(inputs, function(input) {
        if (numDevChecked == 1)
        {
          if (input.checked)
          {
            DevIDs = input.value;
            wDevices.devCheckedArray.push(input.value)
          }
        }
        else
        {
          if (input.checked) {
            if (DevIDs == "")
            {
              DevIDs = input.value;
            }
            else
            {
              DevIDs = DevIDs + ", " + input.value;
            }
            wDevices.devCheckedArray.push(input.value)
          }
        }

          index = index + 1;
      });

      if (document.getElementById("SingleDateSelect").checked)
      {
        wDevices.endDate = wDevices.startDate;
      }
      if (document.getElementById("DateRangeSelect").checked)
      {
        wDevices.endDate = wijmo.Globalize.format(wDevices.inputEndDate.value, format);
      }
      if (document.getElementById("SingleDateSelectInv").checked)
      {
        wDevices.endDateInv = wDevices.startDateInv;
      }
      if (document.getElementById("DateRangeSelectInv").checked)
      {
        wDevices.endDateInv = wijmo.Globalize.format(wDevices.inputEndDateInv.value, format);
      }

      if (document.getElementById("LastKnownLocation").checked)
      {
        document.body.style.cursor = 'progress';
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetDevicesLastLocation",
          data: {"RMID": RMID, "ids": DevIDs, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wDevices.GetDevicesLastLocationSucceeded,
          error: wDevices.ServiceFailed
        });
      }
      if (document.getElementById("LastInvoiceCreated").checked)
      {
        document.body.style.cursor = 'progress';
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetDevicesLastInvoice",
          data: {"RMID": RMID, "ids": DevIDs, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wDevices.GetDevicesLastInvoiceSucceeded,
          error: wDevices.ServiceFailed
        });
      }
      if (document.getElementById("BreadCrumbTrail").checked)
      {
        document.body.style.cursor = 'progress';
        invoicesGraphicsLayer.clear();
        deviceGraphicsLayer.clear();
        devTextGraphicsLayer.clear();
        var BCTDev = document.getElementById("deviceSelection");
        var BreadDevice = BCTDev.options[BCTDev.selectedIndex].value;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetDevicesBreadCrumbTrail",
          data: {"RMID": RMID, "DevIDs": BreadDevice, "startDate": wDevices.startDate, "endDate": wDevices.endDate, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wDevices.GetDevicesBreadCrumbTrailSucceeded,
          error: wDevices.ServiceFailed
        });
      }
      if (document.getElementById("Invoices").checked)
      {
        document.body.style.cursor = 'progress';
        wDevices.invoiceIndex = 0;
        wDevices.indexInvoice = 0;
        invoicesGraphicsLayer.clear();
        deviceGraphicsLayer.clear();
        devTextGraphicsLayer.clear();
        wDevices.totalInvoices = 0;
        while (wDevices.invoiceIndex < wDevices.devCheckedArray.length)
        {
          document.body.style.cursor = 'progress';
          document.getElementById("DevicesDiv").style.display = "block";
          $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetBCTInvoices",
            data: {"RMID": RMID, "devID": wDevices.devCheckedArray[wDevices.invoiceIndex], "startDate": wDevices.startDateInv, "endDate": wDevices.endDateInv, "username": loginWidget.loginInfo.UserName},
            contentType: "application/json; charset=utf-8",
            success: wDevices.GetInvoicesSucceeded,
            error: wDevices.ServiceFailed
          });
          wDevices.invoiceIndex = wDevices.invoiceIndex + 1;
        }
      }
    },

    GetDevicesLastLocationSucceeded: function(result) {
    if (result.GetDevicesLastLocationResult === null)
    {
      alert("No locations available");
      document.body.style.cursor = 'default';
      document.getElementById("DevicesDiv").style.display = "none";
      return;
    }
    if (result.GetDevicesLastLocationResult[0].ValidUserName == false)
    {
      location.reload();
    }
    deviceGraphicsLayer.clear();
    devTextGraphicsLayer.clear();
    invoicesGraphicsLayer.clear();
    var resultObject = result.GetDevicesLastLocationResult;
    wDevices._PlotPointsLKL(resultObject);
    document.body.style.cursor = 'default';
    document.getElementById("DevicesDiv").style.display = "none";
  },

    ServiceFailed: function(result) {
    console.log('Service call failed: ' + result.status + '  ' + result.statusText);
    document.body.style.cursor = 'default';
    document.getElementById("DevicesDiv").style.display = "none";
  },

    GetDevicesLastInvoiceSucceeded: function(result) {
    if (result.GetDevicesLastInvoiceResult === null)
    {
      alert("No Invoices available");
      document.body.style.cursor = 'default';
      document.getElementById("DevicesDiv").style.display = "none";
      return;
    }
    if (result.GetDevicesLastInvoiceResult[0].ValidUserName == false)
    {
      location.reload();
    }
    deviceGraphicsLayer.clear();
    devTextGraphicsLayer.clear();
    invoicesGraphicsLayer.clear();
    var resultObject = result.GetDevicesLastInvoiceResult;
    wDevices._PlotPointsInvoice(resultObject);
    document.body.style.cursor = 'default';
    document.getElementById("DevicesDiv").style.display = "none";
  },

    GetDevicesBreadCrumbTrailSucceeded: function(result) {
    if (result.GetDevicesBreadCrumbTrailResult === null)
    {
      alert("No bread crumbs available");
      document.body.style.cursor = 'default';
      document.getElementById("DevicesDiv").style.display = "none";
      return;
    }
    if (result.GetDevicesBreadCrumbTrailResult[0].ValidUserName == false)
    {
      location.reload();
    }
    deviceGraphicsLayer.clear();
    devTextGraphicsLayer.clear();
    invoicesGraphicsLayer.clear();
    var resultObject = result.GetDevicesBreadCrumbTrailResult;

    var colorNumber = 0;
    var rainbow = new Rainbow();
    var maxNumber = resultObject.length;
    rainbow.setSpectrum(wDevices.toColor, wDevices.fromColor);
    rainbow.setNumberRange(0, maxNumber);

    var BCTDev = document.getElementById("deviceSelection");
    var BreadDevice = BCTDev.options[BCTDev.selectedIndex].value;

    wDevices._PlotPointsBreadInv(wDevices.startDate, wDevices.endDate, BreadDevice);

    wDevices._PlotPointsBCT(resultObject, colorNumber, rainbow);

    var truck = deviceGraphicsLayer.graphics[0];
    deviceGraphicsLayer.remove(truck);
    deviceGraphicsLayer.add(truck);

    document.body.style.cursor = 'default';
    document.getElementById("DevicesDiv").style.display = "none";
  },

    _PlotPointsLKL: function(resultObject){
      wDevices.hideRouteAnimation();
      var index = 0;
      var pt = [];
      resultObject.forEach(PlotPoints);
      function PlotPoints() {
        var long = resultObject[index].Longitude;
        var lat = resultObject[index].Latitude;

        var m = document.getElementById("reportSinceTime");
        var mins = m.options[m.selectedIndex].value;
        var newDateObj = new Date().getTime() - (mins*60000);
        newDateObj = newDateObj / 1000;
        var str = resultObject[index].GPSTimeStamp;
        var TimeStamp = str.substring(6, 16);

        if (document.getElementById('lastReport').checked == true)
        {
          if (newDateObj > TimeStamp)
          {
            var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/RedTruckHalo.png", 40, 40);
          }
          else if (newDateObj <= TimeStamp)
          {
            var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/TransitTruckThickHalo.png", 40, 40);
          }
        }
        else
        {
          var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/TransitTruckThickHalo.png", 40, 40);
        }

        var LKLText = new TextSymbol(resultObject[index].DeviceDescription);
        LKLText.setHaloColor(new Color([0, 0, 0]));
        LKLText.setHaloSize(2);
        LKLText.setOffset(16, 6);
        var font  = new Font();
        font.setSize("16pt");
        font.setWeight(Font.WEIGHT_BOLD);
        LKLText.setFont(font);
        LKLText.setColor(new Color([255, 255, 0]));
        LKLText.setAngle(345);
        LKLText.setHorizontalAlignment("left");

        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var LKLGraphic = new Graphic(wDevices.pt, LKLText);
        devTextGraphicsLayer.add(LKLGraphic);

        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var graphic = new Graphic(wDevices.pt, sms);

        var str = resultObject[index].GPSTimeStamp;
        var TimeStamp = str.substring(6, 16);
        var d = new Date(TimeStamp * 1000);
        var format = 'M/d/yy hh:mm:ss tt';
        var GTimeStamp = wijmo.Globalize.format(d, format);

        var attributes = {
          "Accuracy": resultObject[index].Accuracy,
          "AssignedGraphic": resultObject[index].AssignedGraphic,
          "Bearing": resultObject[index].Bearing,
          "CompanyName": resultObject[index].CompanyName,
          "DeviceDescription": resultObject[index].DeviceDescription,
          "DeviceID": resultObject[index].DeviceID,
          "GPSTimeStamp": GTimeStamp,
          "InvoiceNo": resultObject[index].InvoiceNo,
          "Latitude": resultObject[index].Latitude,
          "Longitude": resultObject[index].Longitude,
          "Speed": resultObject[index].Speed
        };
        graphic.setAttributes(attributes);
        var template = new InfoTemplate();
        var content = "<b>Device ID</b>: ${DeviceID}" +
            "<br/><b>GPS Time Stamp</b>: ${GPSTimeStamp}"+
            "<br/><b>Longitude</b>: ${Longitude}" +
            "<br/><b>Latitude</b>: ${Latitude}" +
            "<br/><b>Accuracy</b>: ${Accuracy}" +
            "<br/><b>Bearing</b>: ${Bearing}" +
            "<br/><b>Speed</b>: ${Speed}" +
            "<br/><hr><b>Company Name</b>: ${CompanyName}" +
            "<br/><b>Invoice Number</b>: ${InvoiceNo}";
        template.setTitle("<b>${DeviceDescription}</b>");
        template.setContent(content);
        graphic.infoTemplate = template;

        deviceGraphicsLayer.add(graphic);

        index = index + 1;
      }
      if (document.getElementById("showAndZoom").checked == true)
      {
        if (deviceGraphicsLayer.graphics.length == 1)
        {
          wDevices.map.centerAndZoom(wDevices.pt, 16);
        }
        else if (deviceGraphicsLayer.graphics.length >= 2)
        {
          var newExtent = graphicsUtils.graphicsExtent(deviceGraphicsLayer.graphics);
          wDevices.map.setExtent(newExtent, true);
        }
      }
    },

    _PlotPointsInvoice: function(resultObject){
      wDevices.hideRouteAnimation();
      var index = 0;
      var pt = [];
      resultObject.forEach(PlotPoints);
      function PlotPoints() {
        var long = resultObject[index].Longitude;
        var lat = resultObject[index].Latitude;

        var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/CashYellowHalo.png", 40, 40);

        var LICText = new TextSymbol(resultObject[index].DeviceDescription);
        LICText.setHaloColor(new Color([0, 0, 0]));
        LICText.setHaloSize(2);
        LICText.setOffset(16, 6);
        var font  = new Font();
        font.setSize("16pt");
        font.setWeight(Font.WEIGHT_BOLD);
        LICText.setFont(font);
        LICText.setColor(new Color([255, 255, 0]));
        LICText.setAngle(345);
        LICText.setHorizontalAlignment("left");

        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var LICGraphic = new Graphic(wDevices.pt, LICText);
        devTextGraphicsLayer.add(LICGraphic);

        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var graphic = new Graphic(wDevices.pt, sms);

        var str = resultObject[index].GPSTimeStamp;
        var TimeStamp = str.substring(6, 16);
        var d = new Date(TimeStamp * 1000);
        var format = 'M/d/yy hh:mm:ss tt';
        var GTimeStamp = wijmo.Globalize.format(d, format);

        var attributes = {
          "Accuracy": resultObject[index].Accuracy,
          "AssignedGraphic": resultObject[index].AssignedGraphic,
          "Bearing": resultObject[index].Bearing,
          "CompanyName": resultObject[index].CompanyName,
          "DeviceDescription": resultObject[index].DeviceDescription,
          "DeviceID": resultObject[index].DeviceID,
          "GPSTimeStamp": GTimeStamp,
          "InvoiceNo": resultObject[index].InvoiceNo,
          "Latitude": resultObject[index].Latitude,
          "Longitude": resultObject[index].Longitude,
          "Speed": resultObject[index].Speed
        };
        graphic.setAttributes(attributes);
        var template = new InfoTemplate();
        var content = "<b>Device ID</b>: ${DeviceID}" +
            "<br/><b>GPS Time Stamp</b>: ${GPSTimeStamp}"+
            "<br/><b>Longitude</b>: ${Longitude}" +
            "<br/><b>Latitude</b>: ${Latitude}" +
            "<br/><b>Accuracy</b>: ${Accuracy}" +
            "<br/><b>Bearing</b>: ${Bearing}" +
            "<br/><b>Speed</b>: ${Speed}" +
            "<br/><hr><b>Company Name</b>: ${CompanyName}" +
            "<br/><b>Invoice Number</b>: ${InvoiceNo}";
        template.setTitle("<b>${DeviceDescription}</b>");
        template.setContent(content);
        graphic.infoTemplate = template;

        deviceGraphicsLayer.add(graphic);

        index = index + 1;
      }
      if (document.getElementById("showAndZoom").checked == true)
      {
        if (deviceGraphicsLayer.graphics.length == 1)
        {
          wDevices.map.centerAndZoom(wDevices.pt, 16);
        }
        else if (deviceGraphicsLayer.graphics.length >= 2)
        {
          var newExtent = graphicsUtils.graphicsExtent(deviceGraphicsLayer.graphics);
          wDevices.map.setExtent(newExtent, true);
        }
      }
    },

    _PlotPointsBreadInv: function(startDate, endDate, BreadDevice){
      var RMID = loginWidget.loginInfo.RMID;
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetBCTInvoices",
        data: {"RMID": RMID, "devID": BreadDevice, "startDate": startDate, "endDate": endDate, "username": loginWidget.loginInfo.UserName},
        contentType: "application/json; charset=utf-8",
        success: wDevices.GetBCTInvoicesSucceeded,
        error: wDevices.ServiceFailed
      });
      document.body.style.cursor = 'default';
      document.getElementById("DevicesDiv").style.display = "none";
    },

    GetBCTInvoicesSucceeded: function(result){
      if (result.GetBCTInvoicesResult === null)
      {
        if (wDevices.indexInvoice == (wDevices.devCheckedArray.length - 1))
        {
          document.body.style.cursor = 'default';
          document.getElementById("DevicesDiv").style.display = "none";
        }
        wDevices.indexInvoice = wDevices.indexInvoice + 1;
        return;
      }
      if (result.GetBCTInvoicesResult[0].ValidUserName == false)
      {
        location.reload();
      }
      var resultInvObject = result.GetBCTInvoicesResult;

      wDevices.PlotBreadInvoices(resultInvObject);

      if (wDevices.indexInvoice == (wDevices.devCheckedArray.length - 1))
      {
        document.body.style.cursor = 'default';
        document.getElementById("DevicesDiv").style.display = "none";
      }
      wDevices.indexInvoice = wDevices.indexInvoice + 1;
    },

    PlotBreadInvoices: function(resultInvObject){
      if (resultInvObject != "") {
        wDevices.plotInvoiceIndex = 0;

        while (wDevices.plotInvoiceIndex < resultInvObject.length)
        {
          var long = resultInvObject[wDevices.plotInvoiceIndex].Longitude;
          var lat = resultInvObject[wDevices.plotInvoiceIndex].Latitude;

          var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/CashYellowHalo.png", 40, 40);

          var BCTInvText = new TextSymbol(wDevices.plotInvoiceIndex + 1);
          BCTInvText.setHaloColor(new Color([0, 0, 0]));
          BCTInvText.setHaloSize(2);
          BCTInvText.setOffset(-14, -16);
          var font  = new Font();
          font.setSize("16pt");
          font.setWeight(Font.WEIGHT_BOLD);
          BCTInvText.setFont(font);
          BCTInvText.setColor(new Color([0, 255, 0]));

          wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));

          var str = resultInvObject[wDevices.plotInvoiceIndex].GPSTimeStamp;
          var TimeStamp = str.substring(6, 16);
          var d = new Date(TimeStamp * 1000);
          var format = 'M/d/yy hh:mm:ss tt';
          var GTimeStamp = wijmo.Globalize.format(d, format);

          var invGraphic = new Graphic(wDevices.pt, sms);
          var attributes = {
            "CompanyName": resultInvObject[wDevices.plotInvoiceIndex].CompanyName,
            "GPSTimeStamp": GTimeStamp,
            "InvoiceNo": resultInvObject[wDevices.plotInvoiceIndex].InvoiceNo,
            "Latitude": resultInvObject[wDevices.plotInvoiceIndex].Latitude,
            "Longitude": resultInvObject[wDevices.plotInvoiceIndex].Longitude,
            "Accuracy": resultInvObject[wDevices.plotInvoiceIndex].Accuracy,
            "Bearing": resultInvObject[wDevices.plotInvoiceIndex].Bearing,
            "Speed": resultInvObject[wDevices.plotInvoiceIndex].Speed,
            "DeviceDescription": resultInvObject[wDevices.plotInvoiceIndex].DeviceDescription,
            "DeviceID": resultInvObject[wDevices.plotInvoiceIndex].DeviceID
          };
          invGraphic.setAttributes(attributes);
          var template = new InfoTemplate();
          var content = "<b>Device ID</b>: ${DeviceID}" +
              "<br><b>GPS Time Stamp</b>: ${GPSTimeStamp}" +
              "<br/><b>Longitude</b>: ${Longitude}" +
              "<br/><b>Latitude</b>: ${Latitude}" +
              "<br/><b>Accuracy</b>: ${Accuracy}" +
              "<br/><b>Bearing</b>: ${Bearing}" +
              "<br/><b>Speed</b>: ${Speed}" +
              "<hr/><b>Company Name</b>: ${CompanyName}" +
              "<br/><b>Invoice Number</b>: ${InvoiceNo}";
          template.setTitle("<b>${DeviceDescription}</b>");
          template.setContent(content);
          invGraphic.infoTemplate = template;

          invoicesGraphicsLayer.add(invGraphic);

          var BCTInvGraphic = new Graphic(wDevices.pt, BCTInvText);
          invoicesGraphicsLayer.add(BCTInvGraphic);

          wDevices.plotInvoiceIndex = wDevices.plotInvoiceIndex + 1;
        }
      }
    },

    GetInvoicesSucceeded: function(result){
      if (result.GetBCTInvoicesResult === null)
      {
        if (wDevices.indexInvoice == (wDevices.devCheckedArray.length - 1))
        {
          document.body.style.cursor = 'default';
          document.getElementById("DevicesDiv").style.display = "none";
        }
        wDevices.indexInvoice = wDevices.indexInvoice + 1;
        return;
      }
      if (result.GetBCTInvoicesResult[0].ValidUserName == false)
      {
        location.reload();
      }
      var resultInvObject = result.GetBCTInvoicesResult;

      wDevices.totalInvoices = wDevices.totalInvoices + resultInvObject.length;
      document.getElementById("totalInvoices").innerHTML = wDevices.totalInvoices;
      wDevices.PlotInvoices(resultInvObject);

      if (wDevices.indexInvoice == (wDevices.devCheckedArray.length - 1))
      {
        document.body.style.cursor = 'default';
        document.getElementById("DevicesDiv").style.display = "none";
      }
      wDevices.indexInvoice = wDevices.indexInvoice + 1;

      if (document.getElementById("showAndZoom").checked == true)
      {
        if (invoicesGraphicsLayer.graphics.length == 1)
        {
          wDevices.map.centerAndZoom(wDevices.pt, 16);
        }
        else if (invoicesGraphicsLayer.graphics.length >= 2)
        {
          var newExtent = graphicsUtils.graphicsExtent(invoicesGraphicsLayer.graphics);
          wDevices.map.setExtent(newExtent, true);
        }
      }
  },

    PlotInvoices: function(resultInvObject){
        if (resultInvObject != "") {
          wDevices.plotInvoiceIndex = 0;

          while (wDevices.plotInvoiceIndex < resultInvObject.length)
          {
            var long = resultInvObject[wDevices.plotInvoiceIndex].Longitude;
            var lat = resultInvObject[wDevices.plotInvoiceIndex].Latitude;

            var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/CashYellowHalo.png", 40, 40);

            wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));

            var str = resultInvObject[wDevices.plotInvoiceIndex].GPSTimeStamp;
            var TimeStamp = str.substring(6, 16);
            var d = new Date(TimeStamp * 1000);
            var format = 'M/d/yy hh:mm:ss tt';
            var GTimeStamp = wijmo.Globalize.format(d, format);

            var invGraphic = new Graphic(wDevices.pt, sms);
            var attributes = {
              "CompanyName": resultInvObject[wDevices.plotInvoiceIndex].CompanyName,
              "GPSTimeStamp": GTimeStamp,
              "InvoiceNo": resultInvObject[wDevices.plotInvoiceIndex].InvoiceNo,
              "Latitude": resultInvObject[wDevices.plotInvoiceIndex].Latitude,
              "Longitude": resultInvObject[wDevices.plotInvoiceIndex].Longitude,
              "Accuracy": resultInvObject[wDevices.plotInvoiceIndex].Accuracy,
              "Bearing": resultInvObject[wDevices.plotInvoiceIndex].Bearing,
              "Speed": resultInvObject[wDevices.plotInvoiceIndex].Speed,
              "DeviceDescription": resultInvObject[wDevices.plotInvoiceIndex].DeviceDescription,
              "DeviceID": resultInvObject[wDevices.plotInvoiceIndex].DeviceID
            };
            invGraphic.setAttributes(attributes);
            var template = new InfoTemplate();
            var content = "<b>Device ID</b>: ${DeviceID}" +
                "<br><b>GPS Time Stamp</b>: ${GPSTimeStamp}" +
                "<br/><b>Longitude</b>: ${Longitude}" +
                "<br/><b>Latitude</b>: ${Latitude}" +
                "<br/><b>Accuracy</b>: ${Accuracy}" +
                "<br/><b>Bearing</b>: ${Bearing}" +
                "<br/><b>Speed</b>: ${Speed}" +
                "<hr/><b>Company Name</b>: ${CompanyName}" +
                "<br/><b>Invoice Number</b>: ${InvoiceNo}";
            template.setTitle("<b>${DeviceDescription}</b>");
            template.setContent(content);
            invGraphic.infoTemplate = template;

            invoicesGraphicsLayer.add(invGraphic);

            wDevices.plotInvoiceIndex = wDevices.plotInvoiceIndex + 1;
          }
        }
      },

    _PlotPointsBCT: function(resultObject, colorNumber, rainbow){
      var index = 0;
      wDevices.showRouteAnimation(resultObject);
      var pt = [];
      colorNumber = 0;

      while (index < resultObject.length)
      {
        var long = resultObject[index].Longitude;
        var lat = resultObject[index].Latitude;
        var StopText;
        var SOText;
        if (index == 0)
        {
          var sms = new PictureMarkerSymbol("./widgets/DeviceWidget/images/TransitTruckThickHalo.png", 40, 40);
          var BCTText = new TextSymbol(resultObject[index].DeviceDescription);
          BCTText.setHaloColor(new Color([0, 0, 0]));
          BCTText.setHaloSize(2);
          BCTText.setOffset(16, 6);
          var font  = new Font();
          font.setSize("16pt");
          font.setWeight(Font.WEIGHT_BOLD);
          BCTText.setFont(font);
          BCTText.setColor(new Color([255, 255, 0]));
          BCTText.setAngle(345);
          BCTText.setHorizontalAlignment("left");

          wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
          var BCTGraphic = new Graphic(wDevices.pt, BCTText);
          devTextGraphicsLayer.add(BCTGraphic);
        }
        else
        {
          if (document.getElementById("stoppedOver").checked == true)
          {
            var str = resultObject[index].GPSTimeStamp;
            var TimeStamp = str.substring(6, 16);
            var stopTime = (document.getElementById('stoppedForSO').value * 60000);
            var timedifference = wDevices.lastTime - TimeStamp;
            if ((timedifference * 1000) > stopTime)
            {
              var sms = new SimpleMarkerSymbol();
              sms.setStyle(SimpleMarkerSymbol.STYLE_PATH);
              sms.setPath("M150 0 L75 200 L225 200 Z");
              sms.setColor(new Color([255, 0, 0]));
              sms.setSize(45);

              var stopMin = Math.floor((timedifference/60) % 60);
              var stopHours = Math.floor(stopMin/60);
              var stopSec = Math.floor(timedifference % 60);

              if (stopSec <= 9)
              {
                if (stopMin <= 9)
                {
                  StopText = new TextSymbol(stopHours + ":0" + stopMin + ":0" + stopSec);
                }
                else
                {
                  StopText = new TextSymbol(stopHours + ":" + stopMin + ":0" + stopSec);
                }
              }
              else if (stopMin <= 9)
              {
                StopText = new TextSymbol(stopHours + ":0" + stopMin + ":" + stopSec);
              }
              else
              {
                StopText = new TextSymbol(stopMin + ":" + stopSec);
              }
              StopText.setHaloColor(new Color([0, 0, 0]));
              StopText.setHaloSize(1);
              var font  = new Font();
              font.setSize("12pt");
              font.setWeight(Font.WEIGHT_BOLD);
              StopText.setFont(font);
              StopText.setColor(new Color([255, 255, 255]));
            }
            else
            {
              var sms = new SimpleMarkerSymbol();
              var bearing = resultObject[index].Bearing;
              sms.setStyle(SimpleMarkerSymbol.STYLE_PATH);
              sms.setPath("M150 0 L75 200 L225 200 Z");
              sms.setColor(new Color(rainbow.colourAt(colorNumber)));
              sms.setAngle(bearing);
              sms.setSize(wDevices.graphicSize);
            }
            wDevices.lastTime = TimeStamp;
          }
          else
          {
            var sms = new SimpleMarkerSymbol();
            var bearing = resultObject[index].Bearing;
            sms.setStyle(SimpleMarkerSymbol.STYLE_PATH);
            sms.setPath("M150 0 L75 200 L225 200 Z");
            sms.setColor(new Color(rainbow.colourAt(colorNumber)));
            sms.setAngle(bearing);
            sms.setSize(wDevices.graphicSize);
          }
        }
        if (document.getElementById("speedOver").checked == true)
        {
          if (resultObject[index].Speed >= document.getElementById('speedForSO').value)
          {
            SOText = new TextSymbol(resultObject[index].Speed);
            SOText.setHaloColor(new Color([0, 0, 0]));
            SOText.setHaloSize(1);
            SOText.setOffset(14, 4);
            var font  = new Font();
            font.setSize("14pt");
            font.setWeight(Font.WEIGHT_BOLD);
            SOText.setFont(font);
            SOText.setColor(new Color([255, 0, 0]));
          }
        }
        wDevices.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var graphic = new Graphic(wDevices.pt, sms);
        var textGraphic = new Graphic(wDevices.pt, SOText);
        var stopGraphic = new Graphic(wDevices.pt, StopText);

        var str = resultObject[index].GPSTimeStamp;
        var TimeStamp = str.substring(6, 16);
        var d = new Date(TimeStamp * 1000);
        var format = 'M/d/yy hh:mm:ss tt';
        var GTimeStamp = wijmo.Globalize.format(d, format);
        var attributes = {
            "Accuracy": resultObject[index].Accuracy,
            "AssignedGraphic": resultObject[index].AssignedGraphic,
            "Bearing": resultObject[index].Bearing,
            "CompanyName": resultObject[index].CompanyName,
            "DeviceDescription": resultObject[index].DeviceDescription,
            "DeviceID": resultObject[index].DeviceID,
            "GPSTimeStamp": GTimeStamp,
            "InvoiceNo": resultObject[index].InvoiceNo,
            "Latitude": resultObject[index].Latitude,
            "Longitude": resultObject[index].Longitude,
            "Speed": resultObject[index].Speed
          };
        graphic.setAttributes(attributes);
        var template = new InfoTemplate();
        var content = "<b>Device ID</b>: ${DeviceID}" +
            "<br/><b>GPS Time Stamp</b>: ${GPSTimeStamp}"+
            "<br/><b>Longitude</b>: ${Longitude}" +
            "<br/><b>Latitude</b>: ${Latitude}" +
            "<br/><b>Accuracy</b>: ${Accuracy}" +
            "<br/><b>Bearing</b>: ${Bearing}" +
            "<br/><b>Speed</b>: ${Speed}" +
            "<br/><hr><b>Company Name</b>: ${CompanyName}" +
            "<br/><b>Invoice Number</b>: ${InvoiceNo}";

        template.setTitle("<b>${DeviceDescription}</b>");
        template.setContent(content);
        graphic.infoTemplate = template;
        deviceGraphicsLayer.on("mouse-over", function (evt) {
          var g = evt.graphic;
          var attributes = {
          "Accuracy": g.attributes.Accuracy,
          "AssignedGraphic": g.attributes.AssignedGraphic,
          "Bearing": g.attributes.Bearing,
          "DeviceDescription": g.attributes.DeviceDescription,
          "DeviceID": g.attributes.DeviceID,
          "GPSTimeStamp": g.attributes.GPSTimeStamp,
          "Latitude": g.attributes.Latitude,
          "Longitude": g.attributes.Longitude,
          "Speed": g.attributes.Speed
          };

          g.setAttributes(attributes);

          var content = "<b>Device ID</b>: " + g.attributes.DeviceID +
              "<br/><b>GPS Time Stamp</b>: " + g.attributes.GPSTimeStamp +
              "<br/><b>Longitude</b>: " + g.attributes.Longitude +
              "<br/><b>Latitude</b>: " + g.attributes.Latitude +
              "<br/><b>Accuracy</b>: " + g.attributes.Accuracy +
              "<br/><b>Bearing</b>: " + g.attributes.Bearing +
              "<br/><b>Speed</b>: " + g.attributes.Speed;

            wDevices.map.infoWindow.setContent(content);
            wDevices.map.infoWindow.setTitle("<b>" + g.attributes.DeviceDescription + "</b>");
            wDevices.map.infoWindow.show(evt.screenPoint, wDevices.map.getInfoWindowAnchor(evt.screenPoint));

          }) ;

          deviceGraphicsLayer.on("mouse-out", function (evt) {
            wDevices.map.infoWindow.hide();
          });

          deviceGraphicsLayer.add(graphic);
          devTextGraphicsLayer.add(textGraphic);
          devTextGraphicsLayer.add(stopGraphic);

          SOText = null;
          StopText = null;

          index = index + 1;
          colorNumber = colorNumber + 1;
      }
      if (document.getElementById("showAndZoom").checked == true)
      {
        if (deviceGraphicsLayer.graphics.length == 1)
        {
          wDevices.map.centerAndZoom(wDevices.pt, 16);
        }
        else if (deviceGraphicsLayer.graphics.length >= 2)
        {
          var newExtent = graphicsUtils.graphicsExtent(deviceGraphicsLayer.graphics);
          wDevices.map.setExtent(newExtent, true);
        }
      }
    },

    onOpen: function(){
      wDevices.theStartDate = new Date();
      var StartElement = document.getElementById("theStartInputDate");
      if (StartElement ) {
        wDevices.inputStartDate = new wijmo.input.InputDate(StartElement, {
          min: new Date(2010, 1, 1),
          format: 'M/d/yyyy',
          value: wDevices.theStartDate
        });
      }
      wDevices.theEndDate = new Date();
      var EndElement = document.getElementById("theEndInputDate");
      if (EndElement ) {
        wDevices.inputEndDate = new wijmo.input.InputDate(EndElement, {
          min: new Date(2010, 1, 1),
          format: 'M/d/yyyy',
          value: wDevices.theEndDate
        });
      }

      var StartElement = document.getElementById("theStartInputDateInv");
      if (StartElement ) {
        wDevices.inputStartDateInv = new wijmo.input.InputDate(StartElement, {
          min: new Date(2010, 1, 1),
          format: 'M/d/yyyy',
          value: wDevices.theStartDate
        });
      }
      wDevices.theEndDate = new Date();
      var EndElement = document.getElementById("theEndInputDateInv");
      if (EndElement ) {
        wDevices.inputEndDateInv = new wijmo.input.InputDate(EndElement, {
          min: new Date(2010, 1, 1),
          format: 'M/d/yyyy',
          value: wDevices.theEndDate
        });
      }
      wDevices._getVersion();
    },

    onClose: function(){
      wDevices.inputStartDate.dispose();
      wDevices.inputEndDate.dispose();
      wDevices.inputStartDateInv.dispose();
      wDevices.inputEndDateInv.dispose();
    },

    startup: function() {
       this.inherited(arguments);
       wDevices.firstLoad = true;
     }
  });
});
