define(['dojo/_base/declare', 'jimu/BaseWidget', 'dojo/dom', 'dojo/on',
      'jimu/utils',
      'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-1.11.2.min.js',
      'dojo/parser',
      'dojo/_base/lang',
      'dojo/topic',
      'dojo/_base/event',
      'esri/map',
      'esri/dijit/BasemapGallery',
      'esri/arcgis/utils',
      'esri/dijit/Search',
      'esri/symbols/PictureMarkerSymbol',
      'esri/graphic',
      'esri/Color',
      'esri/geometry/Point',
      'esri/SpatialReference',
      'esri/layers/GraphicsLayer',
      'esri/geometry/webMercatorUtils',
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
      'xstyle/css!./Resources/wijmo/wijmo.min.css'
      ],
function(declare, BaseWidget, dom, on, jimuUtils, $, parser, lang, topic, event, Map, BasemapGallery, arcgisUtils, Search, PictureMarkerSymbol, Graphic, Color, Point,
         SpatialReference, GraphicsLayer, webMercatorUtils, OpacitySlider, InfoTemplate, Edit, Extent, graphicsUtils, TextSymbol, Font) {
  return declare([BaseWidget], {

    baseClass: 'customers-widget',
    customerGraphicsLayer: null,
    map1: null,
    wCustomers: null,
    theStartDate: null,
    theEndDate: null,
    inputStartDate: null,
    inputEndDate: null,
    handlers: null,
    CustIcon: null,
    inEditMode: false,
    custToBeMoved: [],
    isClicked: false,
    custHidden: false,
    context: null,

    postCreate: function () {
      this.inherited(arguments);
      this.handlers = [];
      wCustomers = this;
      wCustomers.map1 = this.map;
      this._addGraphicsLayers();
      this._bindEvents();
    },

    _addGraphicsLayers: function () {
      customerGraphicsLayer = new GraphicsLayer({
        id: 'customerGraphicsLayer',
        title: 'webServiceGraphics'
      });
      wCustomers.map1.addLayer(customerGraphicsLayer);

      custTextGraphicsLayer = new GraphicsLayer({
        id: 'custTextGraphicsLayer',
        title: 'webServiceGraphics'
      });
      wCustomers.map1.addLayer(custTextGraphicsLayer);
    },

    _bindEvents: function () {
      this.own(on(this.ShowMe, 'click', lang.hitch(this, "RunCustomers", 1)));
      this.own(on(this.CustLayerCheck, 'click', lang.hitch(this.toggleCustomerLayer)));
      this.own(on(this.CustTextLayerCheck, 'click', lang.hitch(this.toggleCustTextLayer)));
      this.own(on(this.CustSlider, 'input', lang.hitch(this.onChange)));
      this.own(on(this.EditMode, 'click', lang.hitch(this.showHideEditMode)));
      this.own(on(this.EditMode, 'click', lang.hitch(this.enterClicked)));
      this.own(on(this.EditMode, 'click', lang.hitch(this.checkCustNamesOn)));
      this.own(on(this.Cancel, 'click', lang.hitch(this.showHideEditMode)));
      this.own(on(this.Cancel, 'click', lang.hitch(this.ClearEditLayer)));
      this.own(on(this.Cancel, 'click', lang.hitch(this.checkCustNamesOff)));
      this.own(on(this.Cancel, 'click', lang.hitch(this, "RunCustomers", 1)));
      this.own(on(this.Save, 'click', lang.hitch(this.SaveEdits)));
      this.own(on(this.Save, 'click', lang.hitch(this.showHideEditMode)));
      this.own(on(this.Save, 'click', lang.hitch(this.ClearEditLayer)));
      this.own(on(this.Save, 'click', lang.hitch(this, "RunCustomers", 1)));
      this.own(on(this.Save, 'click', lang.hitch(this.checkCustNamesOff)));
      var handle = topic.subscribe("TimerWidget", function (RefreshWidget) {
        if (RefreshWidget == "RefreshWidget") {
          wCustomers.RunCustomers(1);
          RefreshWidget = "";
        }
      });
    },

    checkCustNamesOff: function(){
      customerGraphicsLayer.show();
      if (wCustomers.custHidden == false)
      {
        custTextGraphicsLayer.show();
      }
    },

    checkCustNamesOn: function(){
      customerGraphicsLayer.show();
      if (wCustomers.custHidden == false)
      {
        custTextGraphicsLayer.hide();
      }
    },

    toggleCustTextLayer: function(){
      if (document.getElementById("toggleCustTextLayer").checked == true)
      {
        custTextGraphicsLayer.show();
        wCustomers.custHidden = false;
      }
      else if (document.getElementById("toggleCustTextLayer").checked == false)
      {
        custTextGraphicsLayer.hide();
        wCustomers.custHidden = true;
      }
    },

    enterClicked: function() {
      wCustomers.CreateToolbar();
      wCustomers.RunCustomers(2);
      wCustomers.inEditMode = true;
      var EditMode = "Edit Mode Entered";
      topic.publish("CustomerWidget", (EditMode));
    },

    showHideEditMode: function(){
      if (document.getElementById("EditDiv").style.display === "block")
      {
        document.getElementById("EditDiv").style.display = "none";
        document.getElementById("CustomerDiv").style.display = "block";
      }
      else
      {
        document.getElementById("EditDiv").style.display = "block";
        document.getElementById("CustomerDiv").style.display = "none";
      }
    },

    CreateToolbar: function () {
      editToolbar = new Edit(wCustomers.map1);
      customerGraphicsLayer.on("mouse-down", function (evt) {
        if (wCustomers.inEditMode == true){
          wCustomers.map1.disablePan();
          event.stop(evt);
          wCustomers.ActivateToolbar(evt.graphic);
        }
      });
      editToolbar.on('graphic-move-stop', function(evt) {
        var smsup = new PictureMarkerSymbol("./widgets/CustomersWidget/images/StoreGreen.png", 40, 40);
        evt.graphic.setSymbol(smsup);
        var newLong = evt.graphic.geometry.x;
        var newLat = evt.graphic.geometry.y;
        var CustomerIdentification = evt.graphic.attributes.CustomerID;
        var cust = [CustomerIdentification, newLong, newLat];
        wCustomers.custToBeMoved.push(cust);
      });
      wCustomers.map1.on("click", function (evt) {
        wCustomers.map1.enablePan();
        editToolbar.deactivate();
      });
      customerGraphicsLayer.on("mouse-over", function (evt) {
        if (wCustomers.inEditMode == true)
        {
          var g = evt.graphic;

          var attributes = {
            "CompanyName": g.attributes.CompanyName,
            "CustomerID": g.attributes.CustomerID
          };
          g.setAttributes(attributes);

          var content = "<b>Customer ID</b>: " + g.attributes.CustomerID;

          wCustomers.map1.infoWindow.setContent(content);
          wCustomers.map1.infoWindow.setTitle("<b>" + g.attributes.CompanyName + "</b>");
          wCustomers.map1.infoWindow.show(evt.screenPoint, wCustomers.map1.getInfoWindowAnchor(evt.screenPoint));
        }
      });
      customerGraphicsLayer.on("mouse-out", function (evt) {
        if (wCustomers.inEditMode == true)
        {
          wCustomers.map1.infoWindow.hide();
        }
      });
    },

    ActivateToolbar: function(graphic) {
      var tool = 0;
      tool = tool | Edit.MOVE;
      var options = {
        allowAddVertices: false,
        allowDeleteVertices: false,
        uniformScaling: false
      };
      editToolbar.activate(tool, graphic, options);
    },

    SaveEdits: function(){
      var RMID = loginWidget.loginInfo.RMID;
      var index = 0;
      while (index < wCustomers.custToBeMoved.length)
      {
        $.ajax({
          type: "Get",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/SaveCustEdits",
          data: {"RMID": RMID,
            "CustomerIdentification": wCustomers.custToBeMoved[index][0],
            "newLong": wCustomers.custToBeMoved[index][1],
            "newLat": wCustomers.custToBeMoved[index][2]},
          contentType: "application/json; charset=utf-8",
          success: SaveCustEditsSucceeded,
          error: ServiceFailed
        });
        index = index + 1;
      }
      function SaveCustEditsSucceeded(result) {
        alert('Edits Saved');
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }

    },

    ClearEditLayer: function(){
      customerGraphicsLayer.clear();
      wCustomers.custToBeMoved.clear();
      wCustomers.inEditMode = false;
      wCustomers.map1.enablePan();
      editToolbar.deactivate();
      var EditMode = "Edit Mode Left";
      topic.publish("CustomerWidget", (EditMode));
    },

    onChange: function(){
      var o = document.getElementById('opacity_control').value;
      customerGraphicsLayer.setOpacity(o / 100);
      custTextGraphicsLayer.setOpacity(o / 100);
    },

    toggleCustomerLayer: function(){
      if (document.getElementById("toggleCustLayer").checked == true)
      {
        customerGraphicsLayer.show();
        if (wCustomers.custHidden == false)
        {
          custTextGraphicsLayer.show();
          document.getElementById("toggleCustTextLayer").checked = true;
        }
      }
      else if (document.getElementById("toggleCustLayer").checked == false)
      {
        customerGraphicsLayer.hide();
        custTextGraphicsLayer.hide();
        document.getElementById("toggleCustTextLayer").checked = false;
      }
    },

    _loadCustData: function(){
      var RMID = loginWidget.loginInfo.RMID;
      var isRestricted;
      if (loginWidget.loginInfo.RestrictedAccess == true)
      {
        isRestricted = loginWidget.loginInfo.LoginID;
      }
      else
      {
        isRestricted = 0;
      }
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustNames",
        data: {"RMID": RMID, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
        contentType: "application/json; charset=utf-8",
        success: GetCustNamesSucceeded,
        error: ServiceFailed
      });
      console.log('Hunterswidget::GetCustNames');
      function GetCustNamesSucceeded(result) {
        if (result.GetCustNamesResult[0].ValidUserName == false)
        {
          location.reload();
        }
        var resultObject = result.GetCustNamesResult;
        var index = 0;
        resultObject.forEach(AddComboboxData);
        function AddComboboxData() {
          var option = document.createElement("option");
          option.text = resultObject[index].CompanyName;
          option.value = resultObject[index].CustomerID;
          document.getElementById("Customers").appendChild(option);
          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }

      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetRoutes",
        data: {"RMID": RMID, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
        contentType: "application/json; charset=utf-8",
        success: GetRoutesSucceeded,
        error: ServiceFailed
      });
      console.log('Hunterswidget::GetRoutes');
      function GetRoutesSucceeded(result) {
        if (result.GetRoutesResult[0].ValidUserName == false)
        {
          location.reload();
        }
        var resultObject = result.GetRoutesResult;
        var index = 0;
        resultObject.forEach(AddComboboxData);
        function AddComboboxData() {
          var option = document.createElement("option");
          option.text = resultObject[index].RouteDesc;
          option.value = resultObject[index].RouteID;
          document.getElementById("Routes").appendChild(option);
          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }

      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetGroups",
        data: {"RMID": RMID, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
        contentType: "application/json; charset=utf-8",
        success: GetGroupsSucceeded,
        error: ServiceFailed
      });
      console.log('Hunterswidget::GetGroups');
      function GetGroupsSucceeded(result) {
        if (result.GetGroupsResult[0].ValidUserName == false)
        {
          location.reload();
        }
        var resultObject = result.GetGroupsResult;
        var index = 0;
        resultObject.forEach(AddComboboxData);
        function AddComboboxData() {
          var option = document.createElement("option");
          option.text = resultObject[index].GroupDesc;
          option.value = resultObject[index].GroupID;
          document.getElementById("Groups").appendChild(option);
          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }

      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetShipCityNames",
        data: {"RMID": RMID, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
        contentType: "application/json; charset=utf-8",
        success: GetShipCityNamesSucceeded,
        error: ServiceFailed
      });
      console.log('Hunterswidget::GetShipCityNames');
      function GetShipCityNamesSucceeded(result) {
        if (result.GetShipCityNamesResult[0].ValidUserName == false)
        {
          location.reload();
        }
        var resultObject = result.GetShipCityNamesResult;
        var index = 0;
        resultObject.forEach(AddComboboxData);
        function AddComboboxData() {
          var option = document.createElement("option");
          option.text = resultObject[index].ShipCity;
          option.value = resultObject[index].ShipCity;
          document.getElementById("ShipCities").appendChild(option);
          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }

      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetShipZipNames",
        data: {"RMID": RMID, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
        contentType: "application/json; charset=utf-8",
        success: GetShipZipNamesSucceeded,
        error: ServiceFailed
      });
      console.log('Hunterswidget::GetShipZipNames');
      function GetShipZipNamesSucceeded(result) {
        if (result.GetShipZipNamesResult[0].ValidUserName == false)
        {
          location.reload();
        }
        var resultObject = result.GetShipZipNamesResult;
        var index = 0;
        resultObject.forEach(AddComboboxData);
        function AddComboboxData() {
          var option = document.createElement("option");
          option.text = resultObject[index].ShipZip;
          option.value = resultObject[index].ShipZip;
          document.getElementById("ShipZips").appendChild(option);
          index = index + 1;
        }
      }
      function ServiceFailed(result) {
        console.log('Service call failed: ' + result.status + '  ' + result.statusText);
      }
    },

    onRevieceData: function(name, widgetId, data, historyData) {
      if(name !== 'GetData'){
        return;
      }
      console.log(data.message);
    },

    RunCustomers: function(CustContext) {
      wCustomers.context = CustContext;
      customerGraphicsLayer.clear();
      custTextGraphicsLayer.clear();
      document.body.style.cursor = 'default';
      document.getElementById("CustDiv").style.display = "block";
      document.getElementById("toggleCustLayer").checked = true;
      var RMID = loginWidget.loginInfo.RMID;
      var isRestricted;
      if (loginWidget.loginInfo.RestrictedAccess == true)
      {
        isRestricted = loginWidget.loginInfo.LoginID;
      }
      else
      {
        isRestricted = 0;
      }
      var e;
      var isActive, minLat, maxLat, minLong, maxLong;

      if (document.getElementById("viewExtent").checked)
      {
        var topLeftPoint = webMercatorUtils.xyToLngLat(wCustomers.map1.extent.xmin, wCustomers.map1.extent.ymin);
        var bottomRightPoint = webMercatorUtils.xyToLngLat(wCustomers.map1.extent.xmax, wCustomers.map1.extent.ymax);
        minLat = topLeftPoint[1];
        maxLat = bottomRightPoint[1];
        minLong = topLeftPoint[0];
        maxLong = bottomRightPoint[0];
      }
      else
      {
        minLat = -175;
        maxLat = -175.0001;
        minLong = -75;
        maxLong = 85;
      }

      if (document.getElementById("Active").checked)
      {
        isActive = 1
      }
      else if (document.getElementById("Inactive").checked)
      {
        isActive = 0
      }
      else if (document.getElementById("All").checked)
      {
        isActive = 2
      }

      if (document.getElementById("SelectCustomer").checked)
      {
        document.body.style.cursor = 'progress';
        e = document.getElementById("Customers");
        var custID = e.options[e.selectedIndex].value;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustSelectCust",
          data: {"RMID": RMID, "isActive": isActive, "custID": custID, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustSelectCustSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByNameFilter").checked)
      {
        document.body.style.cursor = 'progress';
        var compName = $('#compName').val();
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustNameFilter",
          data: {"RMID": RMID, "isActive": isActive, "compName": compName, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustNameFilterSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByRoute").checked)
      {
        document.body.style.cursor = 'progress';
        e = document.getElementById("Routes");
        var routeSeq = e.options[e.selectedIndex].value;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustRoute",
          data: {"RMID": RMID, "isActive": isActive, "routeSeq": routeSeq, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustRouteSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByGroup").checked)
      {
        document.body.style.cursor = 'progress';
        e = document.getElementById("Groups");
        var groupID = e.options[e.selectedIndex].value;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustGroup",
          data: {"RMID": RMID, "isActive": isActive, "groupID": groupID, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustGroupSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByShipCity").checked)
      {
        document.body.style.cursor = 'progress';
        e = document.getElementById("ShipCities");
        var shipCity = e.options[e.selectedIndex].value;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustShipCity",
          data: {"RMID": RMID, "isActive": isActive, "shipCity": shipCity, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustShipCitySucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByShipZip").checked)
      {
        document.body.style.cursor = 'progress';
        e = document.getElementById("ShipZips");
        var shipZip = e.options[e.selectedIndex].value;
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustShipZip",
          data: {"RMID": RMID, "isActive": isActive, "shipZip": shipZip, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustShipZipSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByInvoiceDates").checked)
      {
        document.body.style.cursor = 'progress';
        var format = 'M/d/yy';
        var invoiceDateBegin = wijmo.Globalize.format(wCustomers.inputStartDate.value, format);
        var invoiceDateEnd = wijmo.Globalize.format(wCustomers.inputEndDate.value, format);
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustInvoiceDate",
          data: {
            "RMID": RMID,
            "isActive": isActive,
            "invoiceDateBegin": invoiceDateBegin,
            "invoiceDateEnd": invoiceDateEnd,
            "restriction": isRestricted,
            "username": loginWidget.loginInfo.UserName
          },
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustInvoiceDateSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("ByNoInvoicesIn").checked)
      {
        document.body.style.cursor = 'progress';
        var numbDays = $('#numbDays').val();
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustNoInvoicesInDays",
          data: {"RMID": RMID, "isActive": isActive, "numbDays": numbDays, "restriction": isRestricted, "username": loginWidget.loginInfo.UserName},
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustNoInvoicesInDaysSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
      else if (document.getElementById("AllCustomers").checked)
      {
        document.body.style.cursor = 'progress';
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/GetCustAllCustomers",
          data: {
            "RMID": RMID,
            "isActive": isActive,
            "minLat": minLat,
            "maxLat": maxLat,
            "minLong": minLong,
            "maxLong": maxLong,
            "restriction": isRestricted,
            "username": loginWidget.loginInfo.UserName
          },
          contentType: "application/json; charset=utf-8",
          success: wCustomers.GetCustAllCustomersSucceeded,
          error: wCustomers.ServiceFailed
        });
      }
    },

    GetCustSelectCustSucceeded: function(result) {
      if (result.GetCustSelectCustResult.length === 0)
      {
        alert("No Customers available");
        document.getElementById("CustDiv").style.display = "none";
        document.body.style.cursor = 'default';
        return;
      }
      if (result.GetCustSelectCustResult[0].ValidUserName == false)
      {
        location.reload();
      }
      customerGraphicsLayer.clear();
      custTextGraphicsLayer.clear();
      var resultObject = result.GetCustSelectCustResult;
      wCustomers._PlotPoints(resultObject, wCustomers.context);
      document.body.style.cursor = 'default';
      document.getElementById("CustDiv").style.display = "none";
    },

    ServiceFailed: function(result) {
    console.log('Service call failed: ' + result.status + '  ' + result.statusText);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustNameFilterSucceeded: function(result) {
    if (result.GetCustNameFilterResult.length === 0)
    {
      alert("No Customers available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustNameFilterResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    var resultObject = result.GetCustNameFilterResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustRouteSucceeded: function(result) {
    if (result.GetCustRouteResult.length === 0)
    {
      alert("No Customers available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustRouteResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    custTextGraphicsLayer.clear();
    var resultObject = result.GetCustRouteResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    wCustomers.RouteOrder(resultObject);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustGroupSucceeded: function(result) {
    if (result.GetCustGroupResult.length === 0)
    {
      alert("No Customers available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustGroupResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    custTextGraphicsLayer.clear();
    var resultObject = result.GetCustGroupResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustShipCitySucceeded: function(result) {
    if (result.GetCustShipCityResult.length === 0)
    {
      alert("No Customers available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustShipCityResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    custTextGraphicsLayer.clear();
    var resultObject = result.GetCustShipCityResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustShipZipSucceeded: function(result) {
      if (result.GetCustShipZipResult.length === 0)
      {
        alert("No Customers available");
        document.getElementById("CustDiv").style.display = "none";
        document.body.style.cursor = 'default';
        return;
      }
      if (result.GetCustShipZipResult[0].ValidUserName == false)
      {
        location.reload();
      }
      customerGraphicsLayer.clear();
      custTextGraphicsLayer.clear();
      var resultObject = result.GetCustShipZipResult;
      wCustomers._PlotPoints(resultObject, wCustomers.context);
      document.body.style.cursor = 'default';
      document.getElementById("CustDiv").style.display = "none";
    },

    GetCustInvoiceDateSucceeded: function(result) {
    if (result.GetCustInvoiceDateResult.length === 0)
    {
      alert("No Customers available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustInvoiceDateResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    custTextGraphicsLayer.clear();
    var resultObject = result.GetCustInvoiceDateResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustNoInvoicesInDaysSucceeded: function(result) {
    if (result.GetCustNoInvoicesInDaysResult.length === 0)
    {
      alert("No Invoices available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustNoInvoicesInDaysResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    custTextGraphicsLayer.clear();
    var resultObject = result.GetCustNoInvoicesInDaysResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    GetCustAllCustomersSucceeded: function(result) {
    if (result.GetCustAllCustomersResult.length === 0)
    {
      alert("No Customers available");
      document.getElementById("CustDiv").style.display = "none";
      document.body.style.cursor = 'default';
      return;
    }
    if (result.GetCustAllCustomersResult[0].ValidUserName == false)
    {
      location.reload();
    }
    customerGraphicsLayer.clear();
    custTextGraphicsLayer.clear();
    var resultObject = result.GetCustAllCustomersResult;
    wCustomers._PlotPoints(resultObject, wCustomers.context);
    document.body.style.cursor = 'default';
    document.getElementById("CustDiv").style.display = "none";
  },

    var: sms = new PictureMarkerSymbol("./widgets/CustomersWidget/images/Store.png", 40, 40),

    RouteOrder: function(resultObject){
      var index = 0;
      resultObject.forEach(OrderRoutes);
      function OrderRoutes(){
        var long = resultObject[index].Longitude;
        var lat = resultObject[index].Latitude;

        var ROText = new TextSymbol(index + 1);
        ROText.setHaloColor(new Color([0, 0, 0]));
        ROText.setHaloSize(2);
        ROText.setOffset(-14, -16);
        var font  = new Font();
        font.setSize("16pt");
        font.setWeight(Font.WEIGHT_BOLD);
        ROText.setFont(font);
        ROText.setColor(new Color([255, 255, 255]));

        wCustomers.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var routeGraphic = new Graphic(wCustomers.pt, ROText);
        custTextGraphicsLayer.add(routeGraphic);

        index = index + 1;
      }

    },

    _PlotPoints: function(resultObject, context){
      var index = 0;
      var pt = [];
      resultObject.forEach(PlotPoints);
      function PlotPoints() {
        var long = resultObject[index].Longitude;
        var lat = resultObject[index].Latitude;

        if (context == 1)
        {
          sms.setUrl("./widgets/CustomersWidget/images/Store.png");
        }
        else if (context == 2)
        {
          sms.setUrl("./widgets/CustomersWidget/images/StoreYellow.png");
        }

        var CustText = new TextSymbol(resultObject[index].CompanyName);
        CustText.setHaloColor(new Color([0, 0, 0]));
        CustText.setHaloSize(2);
        CustText.setOffset(16, 6);
        var font  = new Font();
        font.setSize("14pt");
        font.setWeight(Font.WEIGHT_BOLD);
        CustText.setColor(new Color([255, 255, 0]));
        CustText.setFont(font);
        CustText.setAngle(345);
        CustText.setHorizontalAlignment("left");

        wCustomers.pt = new Point(long, lat, new SpatialReference({wkid: 4326}));
        var textGraphic = new Graphic(wCustomers.pt, CustText);
        var graphic = new Graphic(wCustomers.pt, sms);
        var attributes = {
          "CompanyName": resultObject[index].CompanyName,
          "ShipAddress1": resultObject[index].ShipAddress1,
          "ShipCity": resultObject[index].ShipCity,
          "ShipState": resultObject[index].ShipState,
          "ShipZip": resultObject[index].ShipZip,
          "WorkNo": resultObject[index].WorkNo,
          "Notes": resultObject[index].Notes,
          "CustomerID": resultObject[index].CustomerID
        };
        graphic.setAttributes(attributes);
        var template = new InfoTemplate();
        var content = "<b>Ship Address</b>: ${ShipAddress1}" +
            "<br/><b>Ship City</b>: ${ShipCity}" +
            "<br/><b>Ship State</b>: ${ShipState}" +
            "<br/><b>Ship Zip</b>: ${ShipZip}" +
            "<br/><b>Work Number</b>: ${WorkNo}" +
            "<br/><b>Notes</b>: ${Notes}" +
            "<br/><b>Customer ID</b>: ${CustomerID}";
        template.setTitle("<b>${CompanyName}</b>");
        template.setContent(content);
        graphic.infoTemplate = template;

        customerGraphicsLayer.add(graphic);
        custTextGraphicsLayer.add(textGraphic);

        index = index + 1;
      }
      if (document.getElementById("showAndZoomCust").checked == true)
      {
        if (customerGraphicsLayer.graphics.length == 1)
        {
          wCustomers.map1.centerAndZoom(wCustomers.pt, 16);
        }
        else if (customerGraphicsLayer.graphics.length >= 2)
        {
          var newExtent = graphicsUtils.graphicsExtent(customerGraphicsLayer.graphics);
          wCustomers.map1.setExtent(newExtent, true);
        }
      }
    },

    onOpen: function(){
      this._loadCustData();
      wCustomers.theStartDate = new Date();
      var StartElement = document.getElementById("invoiceDateBegin");
      if (StartElement ) {
        wCustomers.inputStartDate = new wijmo.input.InputDate(StartElement, {
          min: new Date(2010, 1, 1),
          format: 'M/d/yyyy',
          value: wCustomers.theStartDate
        });
      }
      wCustomers.theEndDate = new Date();
      var EndElement = document.getElementById("invoiceDateEnd");
      if (EndElement ) {
        wCustomers.inputEndDate = new wijmo.input.InputDate(EndElement, {
          min: new Date(2010, 1, 1),
          format: 'M/d/yyyy',
          value: wCustomers.theEndDate
        });
      }
    },

    onClose: function(){
      if (document.getElementById("EditDiv").style.display === "block") {
        wCustomers.showHideEditMode();
        wCustomers.ClearEditLayer();
      }
      wCustomers.inputStartDate.dispose();
      wCustomers.inputEndDate.dispose();
    }

  });
});
