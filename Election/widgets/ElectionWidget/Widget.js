define(['dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/on',
        'jimu/BaseWidget',
        'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-1.11.2.min.js',
        'esri/InfoTemplate',
        'esri/Color',
        'esri/geometry/Polygon',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphic',
        'esri/symbols/FillSymbol',
        'esri/symbols/SimpleFillSymbol'],
function(declare, lang, on, BaseWidget, $, InfoTemplate, Color, Polygon, Query, QueryTask, Graphic, FillSymbol, SimpleFillSymbol) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'election-widget',
    map1: null,
    // this property is set by the framework when widget is loaded.
    // name: 'ElectionWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      wElection = this;
      wElection.map1 = this.map;
      this._bindEvents();
    },

    _bindEvents: function(){
      this.own(on(this.showResButton, 'click', lang.hitch(this.populateMap)));
    },

    populateMap: function(){
      var query = new Query();
      var queryTask = new QueryTask("http://web3.kcsgis.com/kcsgis/rest/services/Morgan_Probate/Elections_Test/MapServer/0");
      var conNumb = $('#Contests').val();
      query.where = "ContestNumber  = '" + conNumb + "'";
      query.outSpatialReference = {wkid:102100};
      query.returnGeometry = true;
      query.outFields = ["*"];
      queryTask.execute(query, wElection.addPointsToMap);

    },

    addPointsToMap: function(result){
      console.log(result);
      wElection.map1.graphics.clear();
      var graphicIndex = 0;
      while (graphicIndex < result.features.length)
      {
        var winner = result.features[graphicIndex].attributes.WinnerCandidateNumber;
        var winnerLength = winner.length;
        var g;

        if (winnerLength == 3)
        {
          var winnerNumb = winner.substring(2,3);
          var canColor;
          if (winnerNumb == 1)
          {
            canColor = wElection.config.canCol1;
          }
          else if (winnerNumb == 2)
          {
            canColor = wElection.config.canCol2;
          }
          else if (winnerNumb == 3)
          {
            canColor = wElection.config.canCol3;
          }
          else if (winnerNumb == 4)
          {
            canColor = wElection.config.canCol4;
          }
          else if (winnerNumb == 5)
          {
            canColor = wElection.config.canCol5;
          }
          else if (winnerNumb == 6)
          {
            canColor = wElection.config.canCol6;
          }
          else if (winnerNumb == 7)
          {
            canColor = wElection.config.canCol7;
          }
          else if (winnerNumb == 8)
          {
            canColor = wElection.config.canCol8;
          }
          else if (winnerNumb == 9)
          {
            canColor = wElection.config.canCol9;
          }
          else if (winnerNumb == 10)
          {
            canColor = wElection.config.canCol10;
          }
          else if (winnerNumb == 11)
          {
            canColor = wElection.config.canCol11;
          }
          else if (winnerNumb == 12)
          {
            canColor = wElection.config.canCol12;
          }
          else if (winnerNumb == 13)
          {
            canColor = wElection.config.canCol13;
          }
          else if (winnerNumb == 14)
          {
            canColor = wElection.config.canCol14;
          }
          else if (winnerNumb == 15)
          {
            canColor = wElection.config.canCol15;
          }
          else if (winnerNumb == 16)
          {
            canColor = wElection.config.canCol16;
          }
          else if (winnerNumb == 17)
          {
            canColor = wElection.config.canCol17;
          }
          else if (winnerNumb == 18)
          {
            canColor = wElection.config.canCol18;
          }
          else if (winnerNumb == 19)
          {
            canColor = wElection.config.canCol19;
          }
          else if (winnerNumb == 20)
          {
            canColor = wElection.config.canCol20;
          }

          var mapRing1 = new SimpleFillSymbol();
          mapRing1.setColor(canColor);

          g = new Graphic(result.features[graphicIndex].geometry, mapRing1);

          var attributes = {
            "ContestTitle": result.features[graphicIndex].attributes.ContestTitle,
            "WinnerCandidateName": result.features[graphicIndex].attributes.WinnerCandidateName,
            "WinnerPercent": Math.round(result.features[graphicIndex].attributes.WinnerPercent * 100) + "%"
          };

          g.setAttributes(attributes);
          var template = new InfoTemplate();
          var content = "<b>Winner</b>: ${WinnerCandidateName}" +
              "<br/><b>Winner Percentage</b>: ${WinnerPercent}";
          template.setTitle("<b>${ContestTitle}</b>");
          template.setContent(content);
          g.infoTemplate = template;

          wElection.map1.graphics.add(g);
          graphicIndex += 1;
        }
        else if (winnerLength == 7)
        {
          var mapRing2 = new SimpleFillSymbol();
          mapRing2.setColor("white");

          g = new Graphic(result.features[graphicIndex].geometry, mapRing2);

          var attributes = {
            "ContestTitle": result.features[graphicIndex].attributes.ContestTitle,
            "WinnerCandidateName": result.features[graphicIndex].attributes.WinnerCandidateName,
            "WinnerPercent": Math.round(result.features[graphicIndex].attributes.WinnerPercent * 100) + "%"
          };

          g.setAttributes(attributes);
          var template = new InfoTemplate();
          var content = "<b>Winner</b>: ${WinnerCandidateName}" +
              "<br/><b>Winner Percentage</b>: ${WinnerPercent}";
          template.setTitle("<b>${ContestTitle}</b>");
          template.setContent(content);
          g.infoTemplate = template;

          wElection.map1.graphics.add(g);
          graphicIndex += 1;
        }
      }
    },

    buildContestDDQuery: function(){
      var query = new Query();
      var queryTask = new QueryTask("http://web3.kcsgis.com/kcsgis/rest/services/Morgan_Probate/Elections_Test/MapServer/0");
      query.where = "1=1";
      query.outSpatialReference = {wkid:102100};
      query.returnGeometry = true;
      query.outFields = ["*"];
      queryTask.execute(query, this.buildContestDD);
    },

    buildContestDD: function(result){
      console.log(result);
      var contestIndex = 0;
      var optionList = [];

      result.features.forEach(AddComboboxData);

      function AddComboboxData() {

        var isInList = false;
        var listIndex = 0;
        while (listIndex < optionList.length)
        {
          if (optionList[listIndex] == result.features[contestIndex].attributes.ContestNumber)
          {
            isInList = true;
            break;
          }
          listIndex += 1
        }
        if (isInList == false)
        {
          var option = document.createElement("option");
          option.text = result.features[contestIndex].attributes.ContestTitle;
          option.value = result.features[contestIndex].attributes.ContestNumber;
          document.getElementById("Contests").appendChild(option);
          optionList.push(option.value);
        }
        contestIndex = contestIndex + 1;
      }
    },

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('ElectionWidget::startup');
    // },

    onOpen: function(){
      wElection.buildContestDDQuery();
      //wElection.populateMap();
    }

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
