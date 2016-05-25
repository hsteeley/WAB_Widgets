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
        'esri/InfoTemplate',
        'esri/dijit/PopupTemplate',
        'esri/Color',
        'esri/geometry/Polygon',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphic',
        'esri/symbols/FillSymbol',
        'esri/symbols/SimpleFillSymbol'],
function(ContentPane, TabContainer, declare, lang, on, Chart2D, Pie, Highlight, MoveSlice, Tooltip, MiamiNice, Legend, domConstruct, domClass,
         number, ready, BaseWidget, $, InfoTemplate, PopupTemplate, Color, Polygon, Query, QueryTask, Graphic, FillSymbol, SimpleFillSymbol) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'election-widget',
    map1: null,
    URLIndex: null,
    electionIndex: -1,
    currentDropDown: null,
    currentSelect: null,
    // this property is set by the framework when widget is loaded.
    // name: 'ElectionWidget',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      wElection = this;
      wElection.map1 = this.map;
      //this._bindEvents();
    },

    //_bindEvents: function(){
    //
    //},

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
      document.getElementById("canAndColors").innerHTML = "";
      var graphicIndex = 0;
      var canColor;

      while (graphicIndex < result.features.length)
      {
        var winner = result.features[graphicIndex].attributes.WinnerCandidateNumber;
        var winnerLength = winner.length;
        var g;

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

        var attributes = {
          "ContestTitle": result.features[graphicIndex].attributes.ContestTitle,
          "WinnerCandidateName": result.features[graphicIndex].attributes.WinnerCandidateName,
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
          var template = new InfoTemplate();

          template.setTitle("<b>${PrecinctName}</b>");
          template.setContent(wElection.getWindowContent(result, graphicIndex));
          g.infoTemplate = template;

          wElection.map1.graphics.add(g);
        }
        else if (winnerLength > 3)
        {
          var mapRing2 = new SimpleFillSymbol();
          canColor = "white";
          mapRing2.setColor(canColor);

          g = new Graphic(result.features[graphicIndex].geometry, mapRing2);

          g.setAttributes(attributes);
          var template = new InfoTemplate();

          template.setTitle("<b>${PrecinctName}</b>");
          template.setContent(wElection.getWindowContent(result, graphicIndex));
          g.infoTemplate = template;

          wElection.map1.graphics.add(g);

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

        if (graphicIndex == 0)
        {
          var squareIndex = 0;

          if (result.features[graphicIndex].attributes.CandidateName1 != "")
          {
              var candidateName = document.createElement('div');
              candidateName.className = 'winnerNames';
              candidateName.innerHTML = candidateName.innerHTML + result.features[squareIndex].attributes.CandidateName1;
              colDiv.appendChild(candidateName);

              var square = document.createElement('div');
              square.className = 'square';
              square.id = "square" + squareIndex;
              colDiv.appendChild(square);
              document.getElementById("square" + squareIndex).style.backgroundColor = wElection.config.canCol1;
              document.getElementById("square" + squareIndex).style.width = "25px";
              document.getElementById("square" + squareIndex).style.height = "25px";
              document.getElementById("square" + squareIndex).style.border = "thin solid #000000";

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br)

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

              var br = document.createElement('br');
              colDiv.appendChild(br)

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

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

              var br = document.createElement('br');
              colDiv.appendChild(br)

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

              var br = document.createElement('br');
              colDiv.appendChild(br);

              squareIndex += 1
            }

          squareIndex += 1
        }

        graphicIndex += 1;
      }
    },

    getWindowContent: function(result, graphicIndex){
      var tc = new TabContainer({
        style: "width:100%;height:100%;"
      }, domConstruct.create("div"));

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


      var content = "<b>Election</b>: " + result.features[graphicIndex].attributes.ContestTitle +
          "<br/><br/><b>Winner</b><br/>" + result.features[graphicIndex].attributes.WinnerCandidateName +
          "<br/><b>Percentage</b>: " + Math.round(result.features[graphicIndex].attributes.WinnerPercent * 100) + "%" +
          "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.WinnerVotes +
          "<br/><br/><b>Total Votes</b>: " + result.features[graphicIndex].attributes.TotalVotes +
          "<br/><br/><b>Candidate 1</b><br/>" + result.features[graphicIndex].attributes.CandidateName1 +
          "<br/><b>Party</b>: " + party1 +
          "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent1 * 100) + "%" +
          "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes1;
      if (result.features[graphicIndex].attributes.CandidateName2 != "") {

        content += "<br/><br/><b>Candidate 2</b><br/>" + result.features[graphicIndex].attributes.CandidateName2 +
            "<br/><b>Party</b>: " + party2 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent2 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes2;
      }
      if (result.features[graphicIndex].attributes.CandidateName3 != "") {

        content += "<br/><br/><b>Candidate 3</b><br/>" + result.features[graphicIndex].attributes.CandidateName3 +
            "<br/><b>Party</b>: " + party3 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent3 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes3;
      }
      if (result.features[graphicIndex].attributes.CandidateName4 != "") {

        content += "<br/><br/><b>Candidate 4</b><br/>" + result.features[graphicIndex].attributes.CandidateName4 +
            "<br/><b>Party</b>: " + party4 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent4 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes4;
      }
      if (result.features[graphicIndex].attributes.CandidateName5 != "") {

        content += "<br/><br/><b>Candidate 5</b><br/>" + result.features[graphicIndex].attributes.CandidateName5 +
            "<br/><b>Party</b>: " + party5 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent5 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes5;
      }
      if (result.features[graphicIndex].attributes.CandidateName6 != "") {

        content += "<br/><br/><b>Candidate 6</b><br/>" + result.features[graphicIndex].attributes.CandidateName6 +
            "<br/><b>Party</b>: " + party6 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent6 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes6;
      }
      if (result.features[graphicIndex].attributes.CandidateName7 != "") {

        content += "<br/><br/><b>Candidate 7</b><br/>" + result.features[graphicIndex].attributes.CandidateName7 +
            "<br/><b>Party</b>: " + party7 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent7 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes7;
      }
      if (result.features[graphicIndex].attributes.CandidateName8 != "") {

        content += "<br/><br/><b>Candidate 8</b><br/>" + result.features[graphicIndex].attributes.CandidateName8 +
            "<br/><b>Party</b>: " + party8 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent8 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes8;
      }
      if (result.features[graphicIndex].attributes.CandidateName9 != "") {

        content += "<br/><br/><b>Candidate 9</b><br/>" + result.features[graphicIndex].attributes.CandidateName9 +
            "<br/><b>Party</b>: " + party9 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent9 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes9;
      }
      if (result.features[graphicIndex].attributes.CandidateName10 != "") {

        content += "<br/><br/><b>Candidate 10</b><br/>" + result.features[graphicIndex].attributes.CandidateName10 +
            "<br/><b>Party</b>: " + party10 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent10 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes10;
      }
      if (result.features[graphicIndex].attributes.CandidateName11 != "") {

        content += "<br/><br/><b>Candidate 11</b><br/>" + result.features[graphicIndex].attributes.CandidateName11 +
            "<br/><b>Party</b>: " + party11 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent11 * 100) + "%" +
            "<br/><b></b>Votes</b>: " + result.features[graphicIndex].attributes.Votes11;
      }
      if (result.features[graphicIndex].attributes.CandidateName12 != "") {

        content += "<br/><br/><b>Candidate 12</b><br/>" + result.features[graphicIndex].attributes.CandidateName12 +
            "<br/><b>Party</b>: " + party2 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent12 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes12;
      }
      if (result.features[graphicIndex].attributes.CandidateName13 != "") {

        content += "<br/><br/><b>Candidate 13</b><br/>" + result.features[graphicIndex].attributes.CandidateName13 +
            "<br/><b>Party</b>: " + party13 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent13 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes13;
      }
      if (result.features[graphicIndex].attributes.CandidateName14 != "") {

        content += "<br/><br/><b>Candidate 14</b><br/>" + result.features[graphicIndex].attributes.CandidateName14 +
            "<br/><b>Party</b>: " + party14 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent14 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes14;
      }
      if (result.features[graphicIndex].attributes.CandidateName15 != "") {

        content += "<br/><br/><b>Candidate 15</b><br/>" + result.features[graphicIndex].attributes.CandidateName15 +
            "<br/><b>Party</b>: " + party15 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent15 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes15;
      }
      if (result.features[graphicIndex].attributes.CandidateName16 != "") {

        content += "<br/><br/><b>Candidate 16</b><br/>" + result.features[graphicIndex].attributes.CandidateName16 +
            "<br/><b>Party</b>: " + party16 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent16 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes16;
      }
      if (result.features[graphicIndex].attributes.CandidateName17 != "") {

        content += "<br/><br/><b>Candidate 17</b><br/>" + result.features[graphicIndex].attributes.CandidateName17 +
            "<br/><b>Party</b>: " + party17 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent17 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes17;
      }
      if (result.features[graphicIndex].attributes.CandidateName18 != "") {

        content += "<br/><br/><b>Candidate 18</b><br/>" + result.features[graphicIndex].attributes.CandidateName18 +
            "<br/><b>Party</b>: " + party18 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent18 * 100) + "%" +
            "<br/><b></b>Votes</b>: " + result.features[graphicIndex].attributes.Votes18;
      }
      if (result.features[graphicIndex].attributes.CandidateName19 != "") {

        content += "<br/><br/><b>Candidate 19</b><br/>" + result.features[graphicIndex].attributes.CandidateName19 +
            "<br/><b>Party</b>: " + party19 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent19 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes19;
      }
      if (result.features[graphicIndex].attributes.CandidateName20 != "") {

        content += "<br/><br/><b>Candidate 20</b><br/>" + result.features[graphicIndex].attributes.CandidateName20 +
            "<br/><b>Party</b>: " + party20 +
            "<br/><b>Percentage</b>: " +  Math.round(result.features[graphicIndex].attributes.Percent20 * 100) + "%" +
            "<br/><b>Votes</b>: " + result.features[graphicIndex].attributes.Votes20;
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

      // Apply a color theme to the chart.
      chart.setTheme(MiamiNice);
      chart.addPlot("default", {
        type: "Pie",
        radius: 70,
        htmlLabels: true
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
      var total = result.features[graphicIndex].attributes.TotalVotes;

      if (result.features[graphicIndex].attributes.CandidateName1 != "") {
        candidateOne = Math.round(result.features[graphicIndex].attributes.Votes1 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName2 != "") {
        candidateTwo = Math.round(result.features[graphicIndex].attributes.Votes2 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName3 != "") {
        candidateThree = Math.round(result.features[graphicIndex].attributes.Votes3 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName4 != "") {
        candidateFour = Math.round(result.features[graphicIndex].attributes.Votes4 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName5 != "") {
        candidateFive = Math.round(result.features[graphicIndex].attributes.Votes5 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName6 != "") {
        candidateSix = Math.round(result.features[graphicIndex].attributes.Votes6 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName7 != "") {
        candidateSeven = Math.round(result.features[graphicIndex].attributes.Votes7 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName8 != "") {
        candidateEight = Math.round(result.features[graphicIndex].attributes.Votes8 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName9 != "") {
        candidateNine = Math.round(result.features[graphicIndex].attributes.Votes9 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName10 != "") {
        candidateTen = Math.round(result.features[graphicIndex].attributes.Votes10 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName11 != "") {
        candidateEleven = Math.round(result.features[graphicIndex].attributes.Votes11 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName12 != "") {
        candidateTwelve = Math.round(result.features[graphicIndex].attributes.Votes12 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName13 != "") {
        candidateThirteen = Math.round(result.features[graphicIndex].attributes.Votes13 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName14 != "") {
        candidateFourteen = Math.round(result.features[graphicIndex].attributes.Votes14 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName15 != "") {
        candidateFifteen = Math.round(result.features[graphicIndex].attributes.Votes15 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName16 != "") {
        candidateSixteen = Math.round(result.features[graphicIndex].attributes.Votes16 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName17 != "") {
        candidateSeventeen = Math.round(result.features[graphicIndex].attributes.Votes17 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName18 != "") {
        candidateEighteen = Math.round(result.features[graphicIndex].attributes.Votes18 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName19 != "") {
        candidateNineteen = Math.round(result.features[graphicIndex].attributes.Votes19 / total * 100)
      }
      if (result.features[graphicIndex].attributes.CandidateName20 != "") {
        candidateTwenty = Math.round(result.features[graphicIndex].attributes.Votes20 / total * 100)
      }
      //if (result.features[graphicIndex].attributes.CandidateName4 != "") {
      //
      //  content += "<br/><br/><b>Candidate 4</b>: ${CandidateName4}" +
      //      "<br/><b>Candidate 4 Party</b>: ${PartyCode4}" +
      //      "<br/><b>Candidate 4 Percentage</b>: ${Percent4}" +
      //      "<br/><b>Candidate 4 Votes</b>: ${Votes4}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName5 != "") {
      //
      //  content += "<br/><br/><b>Candidate 5</b>: ${CandidateName5}" +
      //      "<br/><b>Candidate 5 Party</b>: ${PartyCode5}" +
      //      "<br/><b>Candidate 5 Percentage</b>: ${Percent5}" +
      //      "<br/><b>Candidate 5 Votes</b>: ${Votes5}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName6 != "") {
      //
      //  content += "<br/><br/><b>Candidate 6</b>: ${CandidateName6}" +
      //      "<br/><b>Candidate 6 Party</b>: ${PartyCode6}" +
      //      "<br/><b>Candidate 6 Percentage</b>: ${Percent6}" +
      //      "<br/><b>Candidate 6 Votes</b>: ${Votes6}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName7 != "") {
      //
      //  content += "<br/><br/><b>Candidate 7</b>: ${CandidateName7}" +
      //      "<br/><b>Candidate 7 Party</b>: ${PartyCode7}" +
      //      "<br/><b>Candidate 7 Percentage</b>: ${Percent7}" +
      //      "<br/><b>Candidate 7 Votes</b>: ${Votes7}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName8 != "") {
      //
      //  content += "<br/><br/><b>Candidate 8</b>: ${CandidateName8}" +
      //      "<br/><b>Candidate 8 Party</b>: ${PartyCode8}" +
      //      "<br/><b>Candidate 8 Percentage</b>: ${Percent8}" +
      //      "<br/><b>Candidate 8 Votes</b>: ${Votes8}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName9 != "") {
      //
      //  content += "<br/><br/><b>Candidate 9</b>: ${CandidateName9}" +
      //      "<br/><b>Candidate 9 Party</b>: ${PartyCode9}" +
      //      "<br/><b>Candidate 9 Percentage</b>: ${Percent9}" +
      //      "<br/><b>Candidate 9 Votes</b>: ${Votes9}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName10 != "") {
      //
      //  content += "<br/><br/><b>Candidate 10</b>: ${CandidateName10}" +
      //      "<br/><b>Candidate 10 Party</b>: ${PartyCode10}" +
      //      "<br/><b>Candidate 10 Percentage</b>: ${Percent10}" +
      //      "<br/><b>Candidate 10 Votes</b>: ${Votes10}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName11 != "") {
      //
      //  content += "<br/><br/><b>Candidate 11</b>: ${CandidateName11}" +
      //      "<br/><b>Candidate 11 Party</b>: ${PartyCode11}" +
      //      "<br/><b>Candidate 11 Percentage</b>: ${Percent11}" +
      //      "<br/><b>Candidate 11 Votes</b>: ${Votes11}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName12 != "") {
      //
      //  content += "<br/><br/><b>Candidate 12</b>: ${CandidateName12}" +
      //      "<br/><b>Candidate 12 Party</b>: ${PartyCode12}" +
      //      "<br/><b>Candidate 12 Percentage</b>: ${Percent12}" +
      //      "<br/><b>Candidate 12 Votes</b>: ${Votes12}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName13 != "") {
      //
      //  content += "<br/><br/><b>Candidate 13</b>: ${CandidateName13}" +
      //      "<br/><b>Candidate 13 Party</b>: ${PartyCode13}" +
      //      "<br/><b>Candidate 13 Percentage</b>: ${Percent13}" +
      //      "<br/><b>Candidate 13 Votes</b>: ${Votes13}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName14 != "") {
      //
      //  content += "<br/><br/><b>Candidate 14</b>: ${CandidateName14}" +
      //      "<br/><b>Candidate 14 Party</b>: ${PartyCode14}" +
      //      "<br/><b>Candidate 14 Percentage</b>: ${Percent14}" +
      //      "<br/><b>Candidate 14 Votes</b>: ${Votes14}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName15 != "") {
      //
      //  content += "<br/><br/><b>Candidate 15</b>: ${CandidateName15}" +
      //      "<br/><b>Candidate 15 Party</b>: ${PartyCode15}" +
      //      "<br/><b>Candidate 15 Percentage</b>: ${Percent15}" +
      //      "<br/><b>Candidate 15 Votes</b>: ${Votes15}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName16 != "") {
      //
      //  content += "<br/><br/><b>Candidate 16</b>: ${CandidateName16}" +
      //      "<br/><b>Candidate 16 Party</b>: ${PartyCode16}" +
      //      "<br/><b>Candidate 16 Percentage</b>: ${Percent16}" +
      //      "<br/><b>Candidate 16 Votes</b>: ${Votes16}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName17 != "") {
      //
      //  content += "<br/><br/><b>Candidate 17</b>: ${CandidateName17}" +
      //      "<br/><b>Candidate 17 Party</b>: ${PartyCode17}" +
      //      "<br/><b>Candidate 17 Percentage</b>: ${Percent17}" +
      //      "<br/><b>Candidate 17 Votes</b>: ${Votes17}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName18 != "") {
      //
      //  content += "<br/><br/><b>Candidate 18</b>: ${CandidateName18}" +
      //      "<br/><b>Candidate 18 Party</b>: ${PartyCode18}" +
      //      "<br/><b>Candidate 18 Percentage</b>: ${Percent18}" +
      //      "<br/><b>Candidate 18 Votes</b>: ${Votes18}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName19 != "") {
      //
      //  content += "<br/><br/><b>Candidate 19</b>: ${CandidateName19}" +
      //      "<br/><b>Candidate 19 Party</b>: ${PartyCode19}" +
      //      "<br/><b>Candidate 19 Percentage</b>: ${Percent19}" +
      //      "<br/><b>Candidate 19 Votes</b>: ${Votes19}";
      //}
      //if (result.features[graphicIndex].attributes.CandidateName20 != "") {
      //
      //  content += "<br/><br/><b>Candidate 20</b>: ${CandidateName20}" +
      //      "<br/><b>Candidate 20 Party</b>: ${PartyCode20}" +
      //      "<br/><b>Candidate 20 Percentage</b>: ${Percent20}" +
      //      "<br/><b>Candidate 20 Votes</b>: ${Votes20}";
      //}
      //var male = number.round(graphic.attributes.MALES / total * 100, 2);
      //var female = number.round(graphic.attributes.FEMALES / total * 100, 2);

      chart.addSeries("Candidates", [
        {
        y: candidateOne,
        tooltip: result.features[graphicIndex].attributes.Votes1 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent1 * 100) + "%",
        color: wElection.config.canCol1
      },
        {
        y: candidateTwo,
        tooltip: result.features[graphicIndex].attributes.Votes2 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent2 * 100) + "%",
        color: wElection.config.canCol2
      },
        {
        y: candidateThree,
        tooltip: result.features[graphicIndex].attributes.Votes3 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent3 * 100) + "%",
        color: wElection.config.canCol3
      },
        {
        y: candidateFour,
        tooltip: result.features[graphicIndex].attributes.Votes4 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent4 * 100) + "%",
        color: wElection.config.canCol4
      },
        {
        y: candidateFive,
        tooltip: result.features[graphicIndex].attributes.Votes5 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent5 * 100) + "%",
        color: wElection.config.canCol5
      },
        {
        y: candidateSix,
        tooltip: result.features[graphicIndex].attributes.Votes6 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent6 * 100) + "%",
        color: wElection.config.canCol6
      },
        {
        y: candidateSeven,
        tooltip: result.features[graphicIndex].attributes.Votes7 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent7 * 100) + "%",
        color: wElection.config.canCol7
      },
        {
        y: candidateEight,
        tooltip: result.features[graphicIndex].attributes.Votes8 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent8 * 100) + "%",
        color: wElection.config.canCol8
      },
        {
        y: candidateNine,
        tooltip: result.features[graphicIndex].attributes.Votes9 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent9 * 100) + "%",
        color: wElection.config.canCol9
      },
        {
        y: candidateTen,
        tooltip: result.features[graphicIndex].attributes.Votes10 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent10 * 100) + "%",
        color: wElection.config.canCol10
      },
        {
        y: candidateEleven,
        tooltip: result.features[graphicIndex].attributes.Votes11 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent11 * 100) + "%",
        color: wElection.config.canCol11
      },
        {
        y: candidateTwelve,
        tooltip: result.features[graphicIndex].attributes.Votes12 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent12 * 100) + "%",
        color: wElection.config.canCol12
      },
        {
        y: candidateThirteen,
        tooltip: result.features[graphicIndex].attributes.Votes13 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent13 * 100) + "%",
        color: wElection.config.canCol13
      },
        {
        y: candidateFourteen,
        tooltip: result.features[graphicIndex].attributes.Votes14 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent14 * 100) + "%",
        color: wElection.config.canCol14
      },
        {
        y: candidateFifteen,
        tooltip: result.features[graphicIndex].attributes.Votes15 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent15 * 100) + "%",
        color: wElection.config.canCol15
      },
        {
        y: candidateSixteen,
        tooltip: result.features[graphicIndex].attributes.Votes16 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent16 * 100) + "%",
        color: wElection.config.canCol16
      },
        {
        y: candidateSeventeen,
        tooltip: result.features[graphicIndex].attributes.Votes17 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent17 * 100) + "%",
        color: wElection.config.canCol17
      },
        {
        y: candidateEighteen,
        tooltip: result.features[graphicIndex].attributes.Votes18 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent18 * 100) + "%",
        color: wElection.config.canCol18
      },
        {
        y: candidateNineteen,
        tooltip: result.features[graphicIndex].attributes.Votes19 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent19 * 100) + "%",
        color: wElection.config.canCol19
      },
        {
        y: candidateTwenty,
        tooltip: result.features[graphicIndex].attributes.Votes20 + " Votes",
        text: Math.round(result.features[graphicIndex].attributes.Percent20 * 100) + "%",
        color: wElection.config.canCol20
      }]);
      //highlight the chart and display tooltips when you mouse over a slice.
      new Highlight(chart, "default");
      new Tooltip(chart, "default");
      new MoveSlice(chart, "default");

      cp2.set("content", chart.node);
      return tc.domNode;
    },

    buildContestDDQuery: function(){
      wElection.URLIndex = 0;
      while (wElection.URLIndex < wElection.config.pickedElections.length)
      {
        var h3 = document.createElement("h3");
        h3.id = "electionName" + wElection.URLIndex;
        document.getElementById('allElections').appendChild(h3);

        var select = document.createElement("select");
        select.id = "Contests" + wElection.URLIndex;
        select.style.width = "310px";
        document.getElementById('allElections').appendChild(select);

        document.getElementById('allElections').appendChild(document.createElement('br'));
        document.getElementById('allElections').appendChild(document.createElement('br'));

        var query = new Query();
        var queryTask = new QueryTask(wElection.config.pickedElections[wElection.URLIndex].ServiceURL);
        query.where = "1=1";
        query.outSpatialReference = {wkid:102100};
        query.returnGeometry = true;
        query.outFields = ["*"];
        queryTask.execute(query, this.buildContestDD);
        document.getElementById("electionName" + wElection.URLIndex).innerHTML = wElection.config.pickedElections[wElection.URLIndex].ElectionName;
        document.getElementById("Contests" + wElection.URLIndex).onchange = function(){wElection.populateMap(this)};
        wElection.URLIndex += 1;
      }
      document.getElementById('allElections').appendChild(document.createElement('br'));
      if (wElection.electionIndex == 0)
      {
        wElection.populateMap(document.getElementById("Contests0"));
      }
    },

    buildContestDD: function(result){
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
          var option = document.createElement("option");
          option.text = result.features[contestIndex].attributes.ContestTitle;
          option.value = result.features[contestIndex].attributes.ContestNumber;
          document.getElementById("Contests" + wElection.electionIndex).appendChild(option);
          optionList.push(option.value);
        }
        contestIndex = contestIndex + 1;
      }
      if (wElection.electionIndex == 3)
      {
        wElection.populateMap(document.getElementById("Contests0"));
      }
    },

    onOpen: function(){
      wElection.buildContestDDQuery();
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('ElectionWidget::startup');
    // },

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
