define(['dijit/layout/ContentPane',
        'dijit/layout/TabContainer',
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/on',
        'dojox/charting/Chart2D',
        'dojox/charting/plot2d/Pie',
        'dojox/charting/action2d/Highlight',
        'dojox/charting/action2d/MoveSlice',
        'dojox/charting/action2d/Tooltip',
        'dojox/charting/themes/MiamiNice',
        'dojox/charting/widget/Legend',
        'dojo/dom-construct',
        'dojo/dom-class',
        'dojo/number',
        'dojo/ready',
        'jimu/BaseWidget',
        'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-1.11.2.min.js',
        //'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-migrate-1.2.1.min.js',
        'esri/layers/GraphicsLayer',
        'esri/InfoTemplate',
        'esri/dijit/PopupTemplate',
        'esri/Color',
        'esri/geometry/Polygon',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphic',
        'esri/symbols/FillSymbol',
        'esri/symbols/SimpleFillSymbol',
        'xstyle/css!./Resources/slick-1.6.0/slick/slick.css',
        'xstyle/css!./Resources/slick-1.6.0/slick/slick-theme.css',
        './widgets/ElectionWidget/Resources/slick-1.6.0/slick/slick.min.js'],
function(ContentPane, TabContainer, declare, lang, on, Chart2D, Pie, Highlight, MoveSlice, Tooltip, MiamiNice, Legend, domConstruct, domClass,
         number, ready, BaseWidget, $, GraphicsLayer, InfoTemplate, PopupTemplate, Color, Polygon, Query, QueryTask, Graphic, FillSymbol, SimpleFillSymbol) {

  return declare([BaseWidget], {

    baseClass: 'election-widget',
    map1: null,
    URLIndex: null,
    currentDropDown: null,
    currentSelect: null,
    precinctGraphicsLayer: null,
    selectedYear: null,
    runFirst: null,
    electionNumber: null,
    electionNumberList: [],
    electionIndex: -1,

    postCreate: function() {
      this.inherited(arguments);
      wElection = this;
      wElection.map1 = this.map;
      this.createGraphicsLayer();
      this._bindEvents();
    },

    _bindEvents: function(){
      this.own(on(this.TransSlider, 'input', lang.hitch(this.onChange)));
    },

    createGraphicsLayer: function(){
      precinctGraphicsLayer = new GraphicsLayer({
        id: 'precinctGraphicsLayer',
        title: 'webServiceGraphics'
      });
      wElection.map1.addLayer(precinctGraphicsLayer);

      precinctGraphicsLayer.on("mouse-down", function (evt) {
        wElection.map1.infoWindow.setTitle(evt.graphic.attributes.PrecinctName);
        wElection.map1.infoWindow.setContent(wElection.getWindowContent(evt.graphic));
        wElection.map1.infoWindow.show(evt.screenPoint, wElection.map1.getInfoWindowAnchor(evt.screenPoint));
      });
    },

    onChange: function(){
      var o = document.getElementById('Opacity_control').value;
      precinctGraphicsLayer.setOpacity(o / 100);
    },

    populateMap: function(select){
      wElection.map1.infoWindow.hide();
      wElection.currentDropDown = select;
      var query = new Query();
      var getNumb = select.id.length;
      var electionNumber = select.id.substring((getNumb - 1), getNumb);
      wElection.currentSelect = electionNumber;
      var queryTask = new QueryTask(wElection.config.pickedElections[electionNumber].ServiceURL);
      var conNumb = select.value;
      query.where = "ContestNumber  = '" + conNumb + "'";
      query.outSpatialReference = {wkid:102100};
      query.returnGeometry = true;
      query.outFields = ["*"];
      queryTask.execute(query, wElection.addPointsToMap);

    },

    addPointsToMap: function(result){
      wElection.map1.graphics.clear();
      precinctGraphicsLayer.clear();
      document.getElementById("canAndColors").innerHTML = "";
      precinctGraphicsLayer.setOpacity(0.7);
      var graphicIndex = 0;
      var canColor;
      var totalVotes = 0;
      var totalCan1Votes = 0;
      var totalCan2Votes = 0;
      var totalCan3Votes = 0;
      var totalCan4Votes = 0;
      var totalCan5Votes = 0;
      var totalCan6Votes = 0;
      var totalCan7Votes = 0;
      var totalCan8Votes = 0;
      var totalCan9Votes = 0;
      var totalCan10Votes = 0;
      var totalCan11Votes = 0;
      var totalCan12Votes = 0;
      var totalCan13Votes = 0;
      var totalCan14Votes = 0;
      var totalCan15Votes = 0;
      var totalCan16Votes = 0;
      var totalCan17Votes = 0;
      var totalCan18Votes = 0;
      var totalCan19Votes = 0;
      var totalCan20Votes = 0;
      var totalCan1Percent = 0;
      var totalCan2Percent = 0;
      var totalCan3Percent = 0;
      var totalCan4Percent = 0;
      var totalCan5Percent = 0;
      var totalCan6Percent = 0;
      var totalCan7Percent = 0;
      var totalCan8Percent = 0;
      var totalCan9Percent = 0;
      var totalCan10Percent = 0;
      var totalCan11Percent = 0;
      var totalCan12Percent = 0;
      var totalCan13Percent = 0;
      var totalCan14Percent = 0;
      var totalCan15Percent = 0;
      var totalCan16Percent = 0;
      var totalCan17Percent = 0;
      var totalCan18Percent = 0;
      var totalCan19Percent = 0;
      var totalCan20Percent = 0;



      while (graphicIndex < result.features.length)
      {
        var winner = result.features[graphicIndex].attributes.WinnerCandidateNumber;
        var winnerLength = winner.length;
        var g;

        var winnerParty;
        var party1;
        var party2;
        var party3;
        var party4;
        var party5;
        var party6;
        var party7;
        var party8;
        var party9;
        var party10;
        var party11;
        var party12;
        var party13;
        var party14;
        var party15;
        var party16;
        var party17;
        var party18;
        var party19;
        var party20;

        if (result.features[graphicIndex].attributes.WinnerPartyCode == "REP")
        {
          winnerParty = "Republican";
        }
        else if (result.features[graphicIndex].attributes.WinnerPartyCode == "DEM")
        {
          winnerParty = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode1 == "REP")
        {
          party1 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode1 == "DEM")
        {
          party1 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode2 == "REP")
        {
          party2 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode2 == "DEM")
        {
          party2 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode3 == "REP")
        {
          party3 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode3 == "DEM")
        {
          party3 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode4 == "REP")
        {
          party4 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode4 == "DEM")
        {
          party4 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode5 == "REP")
        {
          party5 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode5 == "DEM")
        {
          party5 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode6 == "REP")
        {
          party6 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode6 == "DEM")
        {
          party6 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode7 == "REP")
        {
          party7 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode7 == "DEM")
        {
          party7 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode8 == "REP")
        {
          party8 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode8 == "DEM")
        {
          party8 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode9 == "REP")
        {
          party9 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode9 == "DEM")
        {
          party9 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode10 == "REP")
        {
          party10 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode10 == "DEM")
        {
          party10 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode11 == "REP")
        {
          party11 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode11 == "DEM")
        {
          party11 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode12 == "REP")
        {
          party12 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode12 == "DEM")
        {
          party12 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode13 == "REP")
        {
          party13 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode13 == "DEM")
        {
          party13 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode14 == "REP")
        {
          party14 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode14 == "DEM")
        {
          party14 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode15 == "REP")
        {
          party15 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode15 == "DEM")
        {
          party15 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode16 == "REP")
        {
          party16 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode16 == "DEM")
        {
          party16 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode17 == "REP")
        {
          party17 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode17 == "DEM")
        {
          party17 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode18 == "REP")
        {
          party18 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode18 == "DEM")
        {
          party18 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode19 == "REP")
        {
          party19 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode19 == "DEM")
        {
          party19 = "Democrat";
        }
        if (result.features[graphicIndex].attributes.PartyCode20 == "REP")
        {
          party20 = "Republican";
        }
        else if (result.features[graphicIndex].attributes.PartyCode20 == "DEM")
        {
          party20 = "Democrat";
        }

        if (winnerParty == null)
        {
          winnerParty = "N/A";
        }
        if (party1 == null)
        {
          party1 = "N/A";
        }
        if (party2 == null)
        {
          party2 = "N/A";
        }
        if (party3 == null)
        {
          party3 = "N/A";
        }
        if (party4 == null)
        {
          party4 = "N/A";
        }
        if (party5 == null)
        {
          party5 = "N/A";
        }
        if (party6 == null)
        {
          party6 = "N/A";
        }
        if (party7 == null)
        {
          party7 = "N/A";
        }
        if (party8 == null)
        {
          party8 = "N/A";
        }
        if (party9 == null)
        {
          party9 = "N/A";
        }
        if (party10 == null)
        {
          party10 = "N/A";
        }
        if (party11 == null)
        {
          party11 = "N/A";
        }
        if (party12 == null)
        {
          party12 = "N/A";
        }
        if (party13 == null)
        {
          party13 = "N/A";
        }
        if (party14 == null)
        {
          party14 = "N/A";
        }
        if (party15 == null)
        {
          party15 = "N/A";
        }
        if (party16 == null)
        {
          party16 = "N/A";
        }
        if (party17 == null)
        {
          party17 = "N/A";
        }
        if (party18 == null)
        {
          party18 = "N/A";
        }
        if (party19 == null)
        {
          party19 = "N/A";
        }
        if (party20 == null)
        {
          party20 = "N/A";
        }

        var attributes = {
          "ContestTitle": result.features[graphicIndex].attributes.ContestTitle,
          "WinnerCandidateName": result.features[graphicIndex].attributes.WinnerCandidateName,
          "WinnerPartyCode": winnerParty,
          "WinnerPercent": Math.round(result.features[graphicIndex].attributes.WinnerPercent * 100) + "%",
          "WinnerVotes": result.features[graphicIndex].attributes.WinnerVotes,
          "PrecinctName": result.features[graphicIndex].attributes.PrecinctName,
          "TotalVotes": result.features[graphicIndex].attributes.TotalVotes,

          "CandidateName1": result.features[graphicIndex].attributes.CandidateName1,
          "PartyCode1": party1,
          "Percent1": Math.round(result.features[graphicIndex].attributes.Percent1 * 100) + "%",
          "Votes1": result.features[graphicIndex].attributes.Votes1,

          "CandidateName2": result.features[graphicIndex].attributes.CandidateName2,
          "PartyCode2": party2,
          "Percent2": Math.round(result.features[graphicIndex].attributes.Percent2 * 100) + "%",
          "Votes2": result.features[graphicIndex].attributes.Votes2,

          "CandidateName3": result.features[graphicIndex].attributes.CandidateName3,
          "PartyCode3": party3,
          "Percent3": Math.round(result.features[graphicIndex].attributes.Percent3 * 100) + "%",
          "Votes3": result.features[graphicIndex].attributes.Votes3,

          "CandidateName4": result.features[graphicIndex].attributes.CandidateName4,
          "PartyCode4": party4,
          "Percent4": Math.round(result.features[graphicIndex].attributes.Percent4 * 100) + "%",
          "Votes4": result.features[graphicIndex].attributes.Votes4,

          "CandidateName5": result.features[graphicIndex].attributes.CandidateName5,
          "PartyCode5": party5,
          "Percent5": Math.round(result.features[graphicIndex].attributes.Percent5 * 100) + "%",
          "Votes5": result.features[graphicIndex].attributes.Votes5,

          "CandidateName6": result.features[graphicIndex].attributes.CandidateName6,
          "PartyCode6": party6,
          "Percent6": Math.round(result.features[graphicIndex].attributes.Percent6 * 100) + "%",
          "Votes6": result.features[graphicIndex].attributes.Votes6,

          "CandidateName7": result.features[graphicIndex].attributes.CandidateName7,
          "PartyCode7": party7,
          "Percent7": Math.round(result.features[graphicIndex].attributes.Percent7 * 100) + "%",
          "Votes7": result.features[graphicIndex].attributes.Votes7,

          "CandidateName8": result.features[graphicIndex].attributes.CandidateName8,
          "PartyCode8": party8,
          "Percent8": Math.round(result.features[graphicIndex].attributes.Percent8 * 100) + "%",
          "Votes8": result.features[graphicIndex].attributes.Votes8,

          "CandidateName9": result.features[graphicIndex].attributes.CandidateName9,
          "PartyCode9": party9,
          "Percent9": Math.round(result.features[graphicIndex].attributes.Percent9 * 100) + "%",
          "Votes9": result.features[graphicIndex].attributes.Votes9,

          "CandidateName10": result.features[graphicIndex].attributes.CandidateName10,
          "PartyCode10": party10,
          "Percent10": Math.round(result.features[graphicIndex].attributes.Percent10 * 100) + "%",
          "Votes10": result.features[graphicIndex].attributes.Votes10,

          "CandidateName11": result.features[graphicIndex].attributes.CandidateName11,
          "PartyCode11": party11,
          "Percent11": Math.round(result.features[graphicIndex].attributes.Percent11 * 100) + "%",
          "Votes11": result.features[graphicIndex].attributes.Votes11,

          "CandidateName12": result.features[graphicIndex].attributes.CandidateName12,
          "PartyCode12": party12,
          "Percent12": Math.round(result.features[graphicIndex].attributes.Percent12 * 100) + "%",
          "Votes12": result.features[graphicIndex].attributes.Votes12,

          "CandidateName13": result.features[graphicIndex].attributes.CandidateName13,
          "PartyCode13": party13,
          "Percent13": Math.round(result.features[graphicIndex].attributes.Percent13 * 100) + "%",
          "Votes13": result.features[graphicIndex].attributes.Votes13,

          "CandidateName14": result.features[graphicIndex].attributes.CandidateName14,
          "PartyCode14": party14,
          "Percent14": Math.round(result.features[graphicIndex].attributes.Percent14 * 100) + "%",
          "Votes14": result.features[graphicIndex].attributes.Votes14,

          "CandidateName15": result.features[graphicIndex].attributes.CandidateName15,
          "PartyCode15": party15,
          "Percent15": Math.round(result.features[graphicIndex].attributes.Percent15 * 100) + "%",
          "Votes15": result.features[graphicIndex].attributes.Votes15,

          "CandidateName16": result.features[graphicIndex].attributes.CandidateName16,
          "PartyCode16": party16,
          "Percent16": Math.round(result.features[graphicIndex].attributes.Percent16 * 100) + "%",
          "Votes16": result.features[graphicIndex].attributes.Votes16,

          "CandidateName17": result.features[graphicIndex].attributes.CandidateName17,
          "PartyCode17": party17,
          "Percent17": Math.round(result.features[graphicIndex].attributes.Percent17 * 100) + "%",
          "Votes17": result.features[graphicIndex].attributes.Votes17,

          "CandidateName18": result.features[graphicIndex].attributes.CandidateName18,
          "PartyCode18": party18,
          "Percent18": Math.round(result.features[graphicIndex].attributes.Percent18 * 100) + "%",
          "Votes18": result.features[graphicIndex].attributes.Votes18,

          "CandidateName19": result.features[graphicIndex].attributes.CandidateName19,
          "PartyCode19": party19,
          "Percent19": Math.round(result.features[graphicIndex].attributes.Percent19 * 100) + "%",
          "Votes19": result.features[graphicIndex].attributes.Votes19,

          "CandidateName20": result.features[graphicIndex].attributes.CandidateName20,
          "PartyCode20": party20,
          "Percent20": Math.round(result.features[graphicIndex].attributes.Percent20 * 100) + "%",
          "Votes20": result.features[graphicIndex].attributes.Votes20
        };

        if (winnerLength == 3) {
          var winnerNumb = winner.substring(2, 3);
          if (winnerNumb == 1) {
            canColor = wElection.config.canCol1;
          }
          else if (winnerNumb == 2) {
            canColor = wElection.config.canCol2;
          }
          else if (winnerNumb == 3) {
            canColor = wElection.config.canCol3;
          }
          else if (winnerNumb == 4) {
            canColor = wElection.config.canCol4;
          }
          else if (winnerNumb == 5) {
            canColor = wElection.config.canCol5;
          }
          else if (winnerNumb == 6) {
            canColor = wElection.config.canCol6;
          }
          else if (winnerNumb == 7) {
            canColor = wElection.config.canCol7;
          }
          else if (winnerNumb == 8) {
            canColor = wElection.config.canCol8;
          }
          else if (winnerNumb == 9) {
            canColor = wElection.config.canCol9;
          }
          else if (winnerNumb == 10) {
            canColor = wElection.config.canCol10;
          }
          else if (winnerNumb == 11) {
            canColor = wElection.config.canCol11;
          }
          else if (winnerNumb == 12) {
            canColor = wElection.config.canCol12;
          }
          else if (winnerNumb == 13) {
            canColor = wElection.config.canCol13;
          }
          else if (winnerNumb == 14) {
            canColor = wElection.config.canCol14;
          }
          else if (winnerNumb == 15) {
            canColor = wElection.config.canCol15;
          }
          else if (winnerNumb == 16) {
            canColor = wElection.config.canCol16;
          }
          else if (winnerNumb == 17) {
            canColor = wElection.config.canCol17;
          }
          else if (winnerNumb == 18) {
            canColor = wElection.config.canCol18;
          }
          else if (winnerNumb == 19) {
            canColor = wElection.config.canCol19;
          }
          else if (winnerNumb == 20) {
            canColor = wElection.config.canCol20;
          }

          var mapRing1 = new SimpleFillSymbol();
          mapRing1.setColor(canColor);

          g = new Graphic(result.features[graphicIndex].geometry, mapRing1);

          g.setAttributes(attributes);

          precinctGraphicsLayer.add(g);
        }
        else if (winnerLength > 3) {
          var mapRing2 = new SimpleFillSymbol();
          canColor = "white";
          mapRing2.setColor(canColor);

          g = new Graphic(result.features[graphicIndex].geometry, mapRing2);

          g.setAttributes(attributes);

          precinctGraphicsLayer.add(g);

        }

        var h3 = document.createElement("h3");
        h3.id = "currentElection";
        document.getElementById('allElections').appendChild(h3);
        document.getElementById("currentElection").innerHTML = wElection.config.pickedElections[wElection.currentSelect].ElectionName;

        var h4 = document.createElement("h4");
        h4.id = "currentContest";
        document.getElementById('allElections').appendChild(h4);
        document.getElementById("currentContest").innerHTML = wElection.currentDropDown.options[wElection.currentDropDown.selectedIndex].text;

        var colDiv = document.getElementById("canAndColors");

        totalVotes += result.features[graphicIndex].attributes.TotalVotes;
        totalCan1Votes += result.features[graphicIndex].attributes.Votes1;
        totalCan2Votes += result.features[graphicIndex].attributes.Votes2;
        totalCan3Votes += result.features[graphicIndex].attributes.Votes3;
        totalCan4Votes += result.features[graphicIndex].attributes.Votes4;
        totalCan5Votes += result.features[graphicIndex].attributes.Votes5;
        totalCan6Votes += result.features[graphicIndex].attributes.Votes6;
        totalCan7Votes += result.features[graphicIndex].attributes.Votes7;
        totalCan8Votes += result.features[graphicIndex].attributes.Votes8;
        totalCan9Votes += result.features[graphicIndex].attributes.Votes9;
        totalCan10Votes += result.features[graphicIndex].attributes.Votes10;
        totalCan11Votes += result.features[graphicIndex].attributes.Votes11;
        totalCan12Votes += result.features[graphicIndex].attributes.Votes12;
        totalCan13Votes += result.features[graphicIndex].attributes.Votes13;
        totalCan14Votes += result.features[graphicIndex].attributes.Votes14;
        totalCan15Votes += result.features[graphicIndex].attributes.Votes15;
        totalCan16Votes += result.features[graphicIndex].attributes.Votes16;
        totalCan17Votes += result.features[graphicIndex].attributes.Votes17;
        totalCan18Votes += result.features[graphicIndex].attributes.Votes18;
        totalCan19Votes += result.features[graphicIndex].attributes.Votes19;
        totalCan20Votes += result.features[graphicIndex].attributes.Votes20;

        if (graphicIndex == (result.features.length - 1))
        {
          var countyWinnerName;
          var countyWinnerVotes;
          var countyWinnerPercentage;
          var countyWinnerParty;

          var squareIndex = 0;
          totalCan1Percent = Math.round((totalCan1Votes / totalVotes) * 100) + "%";
          totalCan2Percent = Math.round((totalCan2Votes / totalVotes) * 100) + "%";
          totalCan3Percent = Math.round((totalCan3Votes / totalVotes) * 100) + "%";
          totalCan4Percent = Math.round((totalCan4Votes / totalVotes) * 100) + "%";
          totalCan5Percent = Math.round((totalCan5Votes / totalVotes) * 100) + "%";
          totalCan6Percent = Math.round((totalCan6Votes / totalVotes) * 100) + "%";
          totalCan7Percent = Math.round((totalCan7Votes / totalVotes) * 100) + "%";
          totalCan8Percent = Math.round((totalCan8Votes / totalVotes) * 100) + "%";
          totalCan9Percent = Math.round((totalCan9Votes / totalVotes) * 100) + "%";
          totalCan10Percent = Math.round((totalCan10Votes / totalVotes) * 100) + "%";
          totalCan11Percent = Math.round((totalCan11Votes / totalVotes) * 100) + "%";
          totalCan12Percent = Math.round((totalCan12Votes / totalVotes) * 100) + "%";
          totalCan13Percent = Math.round((totalCan13Votes / totalVotes) * 100) + "%";
          totalCan14Percent = Math.round((totalCan14Votes / totalVotes) * 100) + "%";
          totalCan15Percent = Math.round((totalCan15Votes / totalVotes) * 100) + "%";
          totalCan16Percent = Math.round((totalCan16Votes / totalVotes) * 100) + "%";
          totalCan17Percent = Math.round((totalCan17Votes / totalVotes) * 100) + "%";
          totalCan18Percent = Math.round((totalCan18Votes / totalVotes) * 100) + "%";
          totalCan19Percent = Math.round((totalCan19Votes / totalVotes) * 100) + "%";
          totalCan20Percent = Math.round((totalCan20Votes / totalVotes) * 100) + "%";

          if (result.features[graphicIndex].attributes.CandidateName1 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[graphicIndex].attributes.CandidateName1;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol1;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan1Votes + " / " + totalVotes + " " + totalCan1Percent;
            colDiv.appendChild(totVotes);

            var br = document.createElement('br');
            colDiv.appendChild(br);

            countyWinnerName = result.features[graphicIndex].attributes.CandidateName1;
            countyWinnerParty = party1;
            countyWinnerPercentage = totalCan1Percent;
            countyWinnerVotes = totalCan1Votes;

            squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName2 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName2;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol2;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan2Votes + " / " + totalVotes + " " + totalCan2Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan2Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName2;
              countyWinnerParty = party2;
              countyWinnerPercentage = totalCan2Percent;
              countyWinnerVotes = totalCan2Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName3 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName3;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol3;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan3Votes + " / " + totalVotes + " " + totalCan3Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan3Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName3;
              countyWinnerParty = party3;
              countyWinnerPercentage = totalCan3Percent;
              countyWinnerVotes = totalCan3Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName4 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName4;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol4;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan4Votes + " / " + totalVotes + " " + totalCan4Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan4Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName4;
              countyWinnerParty = party4;
              countyWinnerPercentage = totalCan4Percent;
              countyWinnerVotes = totalCan4Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName5 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName5;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol5;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan5Votes + " / " + totalVotes + " " + totalCan5Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan5Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName5;
              countyWinnerParty = party5;
              countyWinnerPercentage = totalCan5Percent;
              countyWinnerVotes = totalCan5Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName6 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName6;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol6;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan6Votes + " / " + totalVotes + " " + totalCan6Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan6Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName6;
              countyWinnerParty = party6;
              countyWinnerPercentage = totalCan6Percent;
              countyWinnerVotes = totalCan6Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName7 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName7;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol7;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan7Votes + " / " + totalVotes + " " + totalCan7Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan7Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName7;
              countyWinnerParty = party7;
              countyWinnerPercentage = totalCan7Percent;
              countyWinnerVotes = totalCan7Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName8 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName8;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol8;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan8Votes + " / " + totalVotes + " " + totalCan8Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan8Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName8;
              countyWinnerParty = party8;
              countyWinnerPercentage = totalCan8Percent;
              countyWinnerVotes = totalCan8Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName9 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName9;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol9;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan9Votes + " / " + totalVotes + " " + totalCan9Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan9Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName9;
              countyWinnerParty = party9;
              countyWinnerPercentage = totalCan9Percent;
              countyWinnerVotes = totalCan9Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName10 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName10;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol10;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan10Votes + " / " + totalVotes + " " + totalCan10Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan10Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName10;
              countyWinnerParty = party10;
              countyWinnerPercentage = totalCan10Percent;
              countyWinnerVotes = totalCan10votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName11 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName11;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol11;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan11Votes + " / " + totalVotes + " " + totalCan11Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan11Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName11;
              countyWinnerParty = party11;
              countyWinnerPercentage = totalCan11Percent;
              countyWinnerVotes = totalCan11Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName12 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName12;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol12;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan12Votes + " / " + totalVotes + " " + totalCan12Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan12Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName12;
              countyWinnerParty = party12;
              countyWinnerPercentage = totalCan12Percent;
              countyWinnerVotes = totalCan12Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName13 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName13;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol13;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan13Votes + " / " + totalVotes + " " + totalCan13Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan13Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName13;
              countyWinnerParty = party13;
              countyWinnerPercentage = totalCan13Percent;
              countyWinnerVotes = totalCan13Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName14 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName14;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol14;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan14Votes + " / " + totalVotes + " " + totalCan14Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan14Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName14;
              countyWinnerParty = party14;
              countyWinnerPercentage = totalCan14Percent;
              countyWinnerVotes = totalCan14Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName15 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName15;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol15;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan15Votes + " / " + totalVotes + " " + totalCan15Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan15Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName15;
              countyWinnerParty = party15;
              countyWinnerPercentage = totalCan15Percent;
              countyWinnerVotes = totalCan15Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName16 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName16;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol16;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan16Votes + " / " + totalVotes + " " + totalCan16Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan16Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName16;
              countyWinnerParty = party16;
              countyWinnerPercentage = totalCan16Percent;
              countyWinnerVotes = totalCan16Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName17 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName17;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol17;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan17Votes + " / " + totalVotes + " " + totalCan17Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan17Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName17;
              countyWinnerParty = party17;
              countyWinnerPercentage = totalCan17Percent;
              countyWinnerVotes = totalCan17Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName18 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName18;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol18;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan18Votes + " / " + totalVotes + " " + totalCan18Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan18Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName18;
              countyWinnerParty = party18;
              countyWinnerPercentage = totalCan18Percent;
              countyWinnerVotes = totalCan18Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName19 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName19;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol19;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan19Votes + " / " + totalVotes + " " + totalCan19Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan19Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName19;
              countyWinnerParty = party19;
              countyWinnerPercentage = totalCan19Percent;
              countyWinnerVotes = totalCan19Votes;
            }

              squareIndex += 1
            }
          if (result.features[graphicIndex].attributes.CandidateName20 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName20;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol20;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

            var totVotes = document.createElement('div');
            totVotes.className = 'totVotes';
            totVotes.innerHTML = totVotes.innerHTML + totalCan20Votes + " / " + totalVotes + " " + totalCan20Percent;
            colDiv.appendChild(totVotes);

              var br = document.createElement('br');
              colDiv.appendChild(br);

            if (totalCan20Votes > countyWinnerVotes)
            {
              countyWinnerName = result.features[graphicIndex].attributes.CandidateName20;
              countyWinnerParty = party20;
              countyWinnerPercentage = totalCan20Percent;
              countyWinnerVotes = totalCan20Votes;
            }

              squareIndex += 1
            }

          var countySummaryText = document.createElement('span');
          countySummaryText.className = 'countySumText';
          if (countyWinnerParty == "Democrat")
          {
            countyWinnerParty = "Democratic";
          }
          var winnerDiv = document.createElement('span');
          winnerDiv.innerHTML = countyWinnerName;
          winnerDiv.style.color = "#000000";
          winnerDiv.style.fontWeight = "900";
          winnerDiv.className = 'winnerDiv';

          countySummaryText.innerHTML = " won the " + result.features[squareIndex].attributes.ContestTitle +
              " election for the county for the " + countyWinnerParty + " Party with " + countyWinnerPercentage + " of the votes. " + countyWinnerVotes +
              " / " + totalVotes;
          countySummaryText.style.fontWeight = "500";

          colDiv.appendChild(winnerDiv);
          colDiv.appendChild(countySummaryText);
        }

        graphicIndex += 1;
      }
    },

    getWindowContent: function(sGraphic){
      var tc = new TabContainer({
        style: "width:100%;height:100%;"
      }, domConstruct.create("div"));

      var winnerParty = sGraphic.attributes.WinnerPartyCode;
      if(winnerParty == "Democrat")
      {
        winnerParty = "Democratic";
      }

      var precinctSummaryText = sGraphic.attributes.WinnerCandidateName + " won the " + sGraphic.attributes.ContestTitle +
          " election for the " +  sGraphic.attributes.PrecinctName + " Precinct for the " + winnerParty +
          " Party with " + sGraphic.attributes.WinnerPercent + " of the votes. " + sGraphic.attributes.WinnerVotes + " / " +
          sGraphic.attributes.TotalVotes;

      var content = "<b>Election</b>: " + sGraphic.attributes.ContestTitle +
          "<br/><br/>" + precinctSummaryText +
          //"<br/><br/><b>Winner</b><br/>" + sGraphic.attributes.WinnerCandidateName +
          //"<br/><b>Percentage</b>: " + sGraphic.attributes.WinnerPercent +
          //"<br/><b>Votes</b>: " + sGraphic.attributes.WinnerVotes +
          "<br/><br/><b>Total Votes</b>: " + sGraphic.attributes.TotalVotes +
          "<br/><br/><b>Candidate 1</b><br/>" + sGraphic.attributes.CandidateName1 +
          "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode1 +
          "<br/><b>Percentage</b>: " +  sGraphic.attributes.Percent1 +
          "<br/><b>Votes</b>: " + sGraphic.attributes.Votes1 + " / " + sGraphic.attributes.TotalVotes;
      if (sGraphic.attributes.CandidateName2 != "") {

        content += "<br/><br/><b>Candidate 2</b><br/>" + sGraphic.attributes.CandidateName2 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode2 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent2 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes2 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName3 != "") {

        content += "<br/><br/><b>Candidate 3</b><br/>" + sGraphic.attributes.CandidateName3 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode3 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent3 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes3 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName4 != "") {

        content += "<br/><br/><b>Candidate 4</b><br/>" + sGraphic.attributes.CandidateName4 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode4 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent4 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes4 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName5 != "") {

        content += "<br/><br/><b>Candidate 5</b><br/>" + sGraphic.attributes.CandidateName5 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode5 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent5 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes5 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName6 != "") {

        content += "<br/><br/><b>Candidate 6</b><br/>" + sGraphic.attributes.CandidateName6 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode6 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent6 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes6 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName7 != "") {

        content += "<br/><br/><b>Candidate 7</b><br/>" + sGraphic.attributes.CandidateName7 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode7 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent7 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes7 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName8 != "") {

        content += "<br/><br/><b>Candidate 8</b><br/>" + sGraphic.attributes.CandidateName8 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode8 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent8 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes8 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName9 != "") {

        content += "<br/><br/><b>Candidate 9</b><br/>" + sGraphic.attributes.CandidateName9 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode9 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent9 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes9 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName10 != "") {

        content += "<br/><br/><b>Candidate 10</b><br/>" + sGraphic.attributes.CandidateName10 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode10 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent10 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes10 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName11 != "") {

        content += "<br/><br/><b>Candidate 11</b><br/>" + sGraphic.attributes.CandidateName11 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode11 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent11 +
            "<br/><b></b>Votes</b>: " + sGraphic.attributes.Votes11 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName12 != "") {

        content += "<br/><br/><b>Candidate 12</b><br/>" + sGraphic.attributes.CandidateName12 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode12 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent12 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes12 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName13 != "") {

        content += "<br/><br/><b>Candidate 13</b><br/>" + sGraphic.attributes.CandidateName13 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode13 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent13 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes13 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName14 != "") {

        content += "<br/><br/><b>Candidate 14</b><br/>" + sGraphic.attributes.CandidateName14 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode14 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent14 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes14 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName15 != "") {

        content += "<br/><br/><b>Candidate 15</b><br/>" + sGraphic.attributes.CandidateName15 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode15 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent15 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes15 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName16 != "") {

        content += "<br/><br/><b>Candidate 16</b><br/>" + sGraphic.attributes.CandidateName16 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode16 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent16 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes16 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName17 != "") {

        content += "<br/><br/><b>Candidate 17</b><br/>" + sGraphic.attributes.CandidateName17 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode17 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent17 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes17 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName18 != "") {

        content += "<br/><br/><b>Candidate 18</b><br/>" + sGraphic.attributes.CandidateName18 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode18 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent18 +
            "<br/><b></b>Votes</b>: " + sGraphic.attributes.Votes18 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName19 != "") {

        content += "<br/><br/><b>Candidate 19</b><br/>" + sGraphic.attributes.CandidateName19 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode19 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent19 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes19 + " / " + sGraphic.attributes.TotalVotes;
      }
      if (sGraphic.attributes.CandidateName20 != "") {

        content += "<br/><br/><b>Candidate 20</b><br/>" + sGraphic.attributes.CandidateName20 +
            "<br/><b>Party</b>: " + sGraphic.attributes.PartyCode20 +
            "<br/><b>Percentage</b>: " + sGraphic.attributes.Percent20 +
            "<br/><b>Votes</b>: " + sGraphic.attributes.Votes20 + " / " + sGraphic.attributes.TotalVotes;
      }

      var cp1 = new ContentPane({
        title: "Details",
        content: content
      });

      var cp2 = new ContentPane({
        title: "Pie Chart"
      });
      tc.addChild(cp1);
      tc.addChild(cp2);

      var c = domConstruct.create("div", {
        id: "demoChart"
      }, domConstruct.create("div"));
      var chart = new Chart2D(c);
      domClass.add(chart, "chart");

      chart.setTheme(MiamiNice);
      chart.addPlot("default", {
        type: "Pie",
        radius: 75,
        htmlLabels: true
        //labelOffset: -12
      });
      tc.watch("selectedChildWidget", function(name, oldVal, newVal){
        if ( newVal.title === "Pie Chart" ) {
          chart.resize(180,180);
        }
      });
      var candidateOne = 0;
      var candidateTwo = 0;
      var candidateThree = 0;
      var candidateFour = 0;
      var candidateFive = 0;
      var candidateSix = 0;
      var candidateSeven = 0;
      var candidateEight = 0;
      var candidateNine = 0;
      var candidateTen = 0;
      var candidateEleven = 0;
      var candidateTwelve = 0;
      var candidateThirteen = 0;
      var candidateFourteen = 0;
      var candidateFifteen = 0;
      var candidateSixteen = 0;
      var candidateSeventeen = 0;
      var candidateEighteen = 0;
      var candidateNineteen = 0;
      var candidateTwenty = 0;
      var total = sGraphic.attributes.TotalVotes;

      if (sGraphic.attributes.CandidateName1 != "") {
        candidateOne = Math.round(sGraphic.attributes.Votes1 / total * 100)
      }
      if (sGraphic.attributes.CandidateName2 != "") {
        candidateTwo = Math.round(sGraphic.attributes.Votes2 / total * 100)
      }
      if (sGraphic.attributes.CandidateName3 != "") {
        candidateThree = Math.round(sGraphic.attributes.Votes3 / total * 100)
      }
      if (sGraphic.attributes.CandidateName4 != "") {
        candidateFour = Math.round(sGraphic.attributes.Votes4 / total * 100)
      }
      if (sGraphic.attributes.CandidateName5 != "") {
        candidateFive = Math.round(sGraphic.attributes.Votes5 / total * 100)
      }
      if (sGraphic.attributes.CandidateName6 != "") {
        candidateSix = Math.round(sGraphic.attributes.Votes6 / total * 100)
      }
      if (sGraphic.attributes.CandidateName7 != "") {
        candidateSeven = Math.round(sGraphic.attributes.Votes7 / total * 100)
      }
      if (sGraphic.attributes.CandidateName8 != "") {
        candidateEight = Math.round(sGraphic.attributes.Votes8 / total * 100)
      }
      if (sGraphic.attributes.CandidateName9 != "") {
        candidateNine = Math.round(sGraphic.attributes.Votes9 / total * 100)
      }
      if (sGraphic.attributes.CandidateName10 != "") {
        candidateTen = Math.round(sGraphic.attributes.Votes10 / total * 100)
      }
      if (sGraphic.attributes.CandidateName11 != "") {
        candidateEleven = Math.round(sGraphic.attributes.Votes11 / total * 100)
      }
      if (sGraphic.attributes.CandidateName12 != "") {
        candidateTwelve = Math.round(sGraphic.attributes.Votes12 / total * 100)
      }
      if (sGraphic.attributes.CandidateName13 != "") {
        candidateThirteen = Math.round(sGraphic.attributes.Votes13 / total * 100)
      }
      if (sGraphic.attributes.CandidateName14 != "") {
        candidateFourteen = Math.round(sGraphic.attributes.Votes14 / total * 100)
      }
      if (sGraphic.attributes.CandidateName15 != "") {
        candidateFifteen = Math.round(sGraphic.attributes.Votes15 / total * 100)
      }
      if (sGraphic.attributes.CandidateName16 != "") {
        candidateSixteen = Math.round(sGraphic.attributes.Votes16 / total * 100)
      }
      if (sGraphic.attributes.CandidateName17 != "") {
        candidateSeventeen = Math.round(sGraphic.attributes.Votes17 / total * 100)
      }
      if (sGraphic.attributes.CandidateName18 != "") {
        candidateEighteen = Math.round(sGraphic.attributes.Votes18 / total * 100)
      }
      if (sGraphic.attributes.CandidateName19 != "") {
        candidateNineteen = Math.round(sGraphic.attributes.Votes19 / total * 100)
      }
      if (sGraphic.attributes.CandidateName20 != "") {
        candidateTwenty = Math.round(sGraphic.attributes.Votes20 / total * 100)
      }

      chart.addSeries("Candidates", [
        {
        y: candidateOne,
        tooltip: sGraphic.attributes.CandidateName1 + " received " + sGraphic.attributes.Votes1 + " Votes out of " + total,
        text: sGraphic.attributes.Percent1,
        color: wElection.config.canCol1
      },
        {
        y: candidateTwo,
        tooltip: sGraphic.attributes.CandidateName2 + " received " + sGraphic.attributes.Votes2 + " Votes out of " + total,
        text: sGraphic.attributes.Percent2,
        color: wElection.config.canCol2
      },
        {
        y: candidateThree,
        tooltip: sGraphic.attributes.CandidateName3 + " received " + sGraphic.attributes.Votes3 + " Votes out of " + total,
        text: sGraphic.attributes.Percent3,
        color: wElection.config.canCol3
      },
        {
        y: candidateFour,
        tooltip: sGraphic.attributes.CandidateName4 + " received " + sGraphic.attributes.Votes4 + " Votes out of " + total,
        text: sGraphic.attributes.Percent4,
        color: wElection.config.canCol4
      },
        {
        y: candidateFive,
        tooltip:sGraphic.attributes.CandidateName5 + " received " + sGraphic.attributes.Votes5 + " Votes out of " + total,
        text: sGraphic.attributes.Percent5,
        color: wElection.config.canCol5
      },
        {
        y: candidateSix,
        tooltip: sGraphic.attributes.CandidateName6 + " received " + sGraphic.attributes.Votes6 + " Votes out of " + total,
        text: sGraphic.attributes.Percent6,
        color: wElection.config.canCol6
      },
        {
        y: candidateSeven,
        tooltip: sGraphic.attributes.CandidateName7 + " received " + sGraphic.attributes.Votes7 + " Votes out of " + total,
        text: sGraphic.attributes.Percent7,
        color: wElection.config.canCol7
      },
        {
        y: candidateEight,
        tooltip: sGraphic.attributes.CandidateName8 + " received " + sGraphic.attributes.Votes8 + " Votes out of " + total,
        text: sGraphic.attributes.Percent8,
        color: wElection.config.canCol8
      },
        {
        y: candidateNine,
        tooltip: sGraphic.attributes.CandidateName9 + " received " + sGraphic.attributes.Votes9 + " Votes out of " + total,
        text: sGraphic.attributes.Percent9,
        color: wElection.config.canCol9
      },
        {
        y: candidateTen,
        tooltip: sGraphic.attributes.CandidateName10 + " received " + sGraphic.attributes.Votes10 + " Votes out of " + total,
        text: sGraphic.attributes.Percent10,
        color: wElection.config.canCol10
      },
        {
        y: candidateEleven,
        tooltip: sGraphic.attributes.CandidateName11 + " received " + sGraphic.attributes.Votes11 + " Votes out of " + total,
        text: sGraphic.attributes.Percent11,
        color: wElection.config.canCol11
      },
        {
        y: candidateTwelve,
        tooltip: sGraphic.attributes.CandidateName12 + " received " + sGraphic.attributes.Votes12 + " Votes out of " + total,
        text: sGraphic.attributes.Percent12,
        color: wElection.config.canCol12
      },
        {
        y: candidateThirteen,
        tooltip: sGraphic.attributes.CandidateName13 + " received " + sGraphic.attributes.Votes13 + " Votes out of " + total,
        text: sGraphic.attributes.Percent13,
        color: wElection.config.canCol13
      },
        {
        y: candidateFourteen,
        tooltip: sGraphic.attributes.CandidateName14 + " received " + sGraphic.attributes.Votes14 + " Votes out of " + total,
        text: sGraphic.attributes.Percent14,
        color: wElection.config.canCol14
      },
        {
        y: candidateFifteen,
        tooltip: sGraphic.attributes.CandidateName15 + " received " + sGraphic.attributes.Votes15 + " Votes out of " + total,
        text: sGraphic.attributes.Percent15,
        color: wElection.config.canCol15
      },
        {
        y: candidateSixteen,
        tooltip: sGraphic.attributes.CandidateName16 + " received " + sGraphic.attributes.Votes16 + " Votes out of " + total,
        text: sGraphic.attributes.Percent16,
        color: wElection.config.canCol16
      },
        {
        y: candidateSeventeen,
        tooltip: sGraphic.attributes.CandidateName17 + " received " + sGraphic.attributes.Votes17 + " Votes out of " + total,
        text: sGraphic.attributes.Percent17,
        color: wElection.config.canCol17
      },
        {
        y: candidateEighteen,
        tooltip: sGraphic.attributes.CandidateName18 + " received " + sGraphic.attributes.Votes18 + " Votes out of " + total,
        text: sGraphic.attributes.Percent18,
        color: wElection.config.canCol18
      },
        {
        y: candidateNineteen,
        tooltip: sGraphic.attributes.CandidateName19 + " received " + sGraphic.attributes.Votes19 + " Votes out of " + total,
        text: sGraphic.attributes.Percent19,
        color: wElection.config.canCol19
      },
        {
        y: candidateTwenty,
        tooltip: sGraphic.attributes.CandidateName20 + " received " + sGraphic.attributes.Votes20 + " Votes out of " + total,
        text: sGraphic.attributes.Percent20,
        color: wElection.config.canCol20
      }]);

      new Highlight(chart, "default");
      new Tooltip(chart, "default");
      new MoveSlice(chart, "default");

      cp2.set("content", chart.node);
      return tc.domNode;
    },

    buildContestDDQuery: function() {
      wElection.URLIndex = 0;
      var electionYearList = [];
      var yearIndex = 0;
      var inList = false;
      while (yearIndex < wElection.config.pickedElections.length) {
        var listIndex = 0;
        while (listIndex < (electionYearList.length + 1)) {
          if (electionYearList[listIndex] == wElection.config.pickedElections[yearIndex].ElectionYear) {
            inList = true;
          }
          listIndex += 1;
        }
        if (inList == false) {
          electionYearList.push(wElection.config.pickedElections[yearIndex].ElectionYear);
        }
        inList = false;
        yearIndex += 1;
      }
      console.log(electionYearList);

      electionYearList.reverse();
      listIndex = 0;
      while (listIndex < electionYearList.length) {
        var year = document.createElement('div');
        year.className = "yearClass";
        year.id = "yearSelect" + listIndex;
        year.innerHTML = electionYearList[listIndex];
        year.style.padding = "3px 3px";
        document.getElementById("yearSliderDiv").appendChild(year);
        listIndex += 1;
      }

      $(document).ready(function () {
        $('#yearSliderDiv').slick({
          centerMode: true,
          arrows: true,
          rows: 1,
          slidesToShow: 1,
          dots: true,
          focusOnSelect: true
        });
        $('#yearSelect0').addClass("selectedYear0");
        wElection.selectedYear = document.getElementById("yearSelect0").innerHTML;
      });

      $('#yearSliderDiv').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        if (slick.$slides[currentSlide].id == "yearSelect0") {
          $(slick.$slides[currentSlide]).removeClass("selectedYear0");
          $(slick.$slides[nextSlide]).addClass("selectedYear1");
        }
        else {
          $(slick.$slides[currentSlide]).removeClass("selectedYear1");
          if (slick.$slides[nextSlide].id == "yearSelect0") {
            $(slick.$slides[nextSlide]).addClass("selectedYear0");
          }
          else {
            $(slick.$slides[nextSlide]).addClass("selectedYear1");
          }
        }
        wElection.selectedYear = slick.$slides[nextSlide].innerHTML;
        wElection.buildContestDDQuery2();
      });

      wElection.buildContestDDQuery2();
    },

    buildContestDDQuery2: function(){
      document.getElementById("allElections").innerHTML = "";
      document.getElementById("canAndColors").innerHTML = "";
      wElection.URLIndex = 0;
      wElection.electionNumberList = [];
      wElection.electionIndex = -1;
      wElection.runFirst = 0;
      while (wElection.URLIndex < wElection.config.pickedElections.length)
      {
        if (wElection.selectedYear == wElection.config.pickedElections[wElection.URLIndex].ElectionYear)
        {
          var cPanel = document.createElement("div");
          cPanel.className = "expandable-panel";
          cPanel.id = "ContestPanel" + wElection.URLIndex;
          document.getElementById('allElections').appendChild(cPanel);

          var cPanelHead = document.createElement("div");
          cPanelHead.className = "expandable-panel-heading";
          cPanelHead.id = "ContestPanelHead" + wElection.URLIndex;
          document.getElementById("ContestPanel" + wElection.URLIndex).appendChild(cPanelHead);

          var Contest = document.createElement("h2");
          Contest.className = "PanelHeader";
          Contest.id = "electionName" + wElection.URLIndex;
          document.getElementById("ContestPanelHead" + wElection.URLIndex).appendChild(Contest);

          var Plus = document.createElement("h2");
          Plus.className = "icon-close-open";
          document.getElementById("ContestPanelHead" + wElection.URLIndex).appendChild(Plus);

          var cPanelContent = document.createElement("div");
          cPanelContent.className = "expandable-panel-content";
          cPanelContent.id = "ContestPanelContent" + wElection.URLIndex;
          document.getElementById("ContestPanel" + wElection.URLIndex).appendChild(cPanelContent);

          var Content = document.createElement("select");
          Content.className = "Selects";
          Content.id = "Contests" + wElection.URLIndex;
          Content.style.width = "310px";
          document.getElementById("ContestPanelContent" + wElection.URLIndex).appendChild(Content);

          var query = new Query();
          var queryTask = new QueryTask(wElection.config.pickedElections[wElection.URLIndex].ServiceURL);
          query.where = "1=1";
          query.outSpatialReference = {wkid:102100};
          query.returnGeometry = false;
          query.outFields = ["ContestTitle", "ContestNumber", "PartyCode1"];
          queryTask.execute(query, this.buildContestDD);
          document.getElementById("electionName" + wElection.URLIndex).innerHTML = wElection.config.pickedElections[wElection.URLIndex].ElectionName;
          document.getElementById("Contests" + wElection.URLIndex).onchange = function(){wElection.populateMap(this)};

          wElection.electionNumberList.push(wElection.URLIndex);
          wElection.runFirst = wElection.URLIndex;
        }
        wElection.URLIndex += 1;

        $(function () {
          var panelSpeed = 500;
          var totalPanels = wElection.config.pickedElections.length;
          var defaultOpenPanel = -1;
          var accordian = true;

          var panelHeight = new Array();
          var currentPanel = defaultOpenPanel;
          var iconHeight = parseInt($('.icon-close-open').css('height'));

          function panelinit() {
            for (var i = 0; i <= totalPanels; i++) {
              panelHeight[i] = parseInt($('#ContestPanel' + i).find('.expandable-panel-content').css('height'));
              $('#ContestPanel' + i).find('.expandable-panel-content').css('margin-top', -panelHeight[i]);
              if (defaultOpenPanel == i) {
                $('#ContestPanel' + i).find('.icon-close-open').css('background-position', '0px -' + iconHeight + 'px');
                $('#ContestPanel' + i).find('.expandable-panel-content').css('margin-top', 0);
              }
            }
          }

          $('.expandable-panel-heading').click(function () {
            var obj = $(this).next();
            var objid = parseInt($(this).parent().attr('ID').substr(12, 11));
            currentPanel = objid;
            if (accordian == true) {
              resetpanels();
            }

            if (parseInt(obj.css('margin-top')) <= (panelHeight[objid] * -1)) {
              obj.clearQueue();
              obj.stop();
              obj.prev().find('.icon-close-open').css('background-position', '0px -' + iconHeight + 'px');
              obj.animate({
                'margin-top': 0
              }, panelSpeed);
            } else {
              obj.clearQueue();
              obj.stop();
              obj.prev().find('.icon-close-open').css('background-position', '0px 0px');
              obj.animate({
                'margin-top': (panelHeight[objid] * -1)
              }, panelSpeed);
            }
          });

          function resetpanels() {
            for (var i = 0; i <= totalPanels; i++) {
              if (currentPanel != i) {
                $('#ContestPanel' + i).find('.icon-close-open').css('background-position', '0px 0px');
                $('#ContestPanel' + i).find('.expandable-panel-content').animate({
                  'margin-top': -panelHeight[i]
                }, panelSpeed);
              }
            }
          }

          panelinit();

        });
      }
      document.getElementById('allElections').appendChild(document.createElement('br'));
    },

    buildContestDD: function(result){
      console.log(result.features);
      wElection.electionIndex += 1;
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
          if (result.features[contestIndex].attributes.ContestTitle == "GOVERNOR")
          {
            if (result.features[contestIndex].attributes.PartyCode1 == "REP")
            {
              result.features[contestIndex].attributes.ContestTitle += "(R)";
            }
            else if (result.features[contestIndex].attributes.PartyCode1 == "DEM")
            {
              result.features[contestIndex].attributes.ContestTitle += "(D)";
            }
          }
          var option = document.createElement("option");
          option.text = result.features[contestIndex].attributes.ContestTitle;
          option.value = result.features[contestIndex].attributes.ContestNumber;
          document.getElementById("Contests" + wElection.electionNumberList[wElection.electionIndex]).appendChild(option);
          optionList.push(option.value);
        }
        contestIndex = contestIndex + 1;
      }
      wElection.populateMap(document.getElementById("Contests" + wElection.runFirst));
    },

    onOpen: function(){
      wElection.buildContestDDQuery();
    }
  });

});
