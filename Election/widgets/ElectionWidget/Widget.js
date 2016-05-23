define(['dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/on',
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
function(declare, lang, on, BaseWidget, $, InfoTemplate, PopupTemplate, Color, Polygon, Query, QueryTask, Graphic, FillSymbol, SimpleFillSymbol) {
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
      var colors = [];
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

        if (winnerLength == 3)
        {
          var winnerNumb = winner.substring(2,3);
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

          g.setAttributes(attributes);
          var template = new InfoTemplate({
            title: "Candidates",
            description: "Vote percentages for candidates",
            fieldInfos: [{ //define field infos so we can specify an alias
              fieldName: result.features[graphicIndex].attributes.CandidateName1,
              label: result.features[graphicIndex].attributes.Percent1,
              visible: true
            },{
              fieldName: result.features[graphicIndex].attributes.CandidateName2,
              label: result.features[graphicIndex].attributes.Percent2,
              visible: true
            },{
              fieldName: result.features[graphicIndex].attributes.CandidateName3,
              label: result.features[graphicIndex].attributes.Percent3,
              visible: true
            }],
            mediaInfos:[{ //define the bar chart
              caption: "Candidate Votes",
              type:"piechart",
              value:{
                theme: "Dollar",
                fields:[result.features[graphicIndex].attributes.CandidateName1, result.features[graphicIndex].attributes.CandidateName2, result.features[graphicIndex].attributes.CandidateName3]
              }
            }]
          });
          var content = "<b>Election</b>: ${ContestTitle}" +
              "<br/><br/><b>Winner</b>: ${WinnerCandidateName}" +
              "<br/><b>Winner Percentage</b>: ${WinnerPercent}" +
              "<br/><b>Winner Votes</b>: ${WinnerVotes}" +
              "<br/><br/><b>Total Votes</b>: ${TotalVotes}" +
              "<br/><br/><b>Candidate 1</b>: ${CandidateName1}" +
              "<br/><b>Candidate 1 Party</b>: ${PartyCode1}" +
              "<br/><b>Candidate 1 Percentage</b>: ${Percent1}" +
              "<br/><b>Candidate 1 Votes</b>: ${Votes1}";
          if (result.features[graphicIndex].attributes.CandidateName2 != "")
          {

            content += "<br/><br/><b>Candidate 2</b>: ${CandidateName2}" +
                "<br/><b>Candidate 2 Party</b>: ${PartyCode2}" +
                "<br/><b>Candidate 2 Percentage</b>: ${Percent2}" +
                "<br/><b>Candidate 2 Votes</b>: ${Votes2}";
          }
          if (result.features[graphicIndex].attributes.CandidateName3 != "")
          {

            content += "<br/><br/><b>Candidate 3</b>: ${CandidateName3}" +
                "<br/><b>Candidate 3 Party</b>: ${PartyCode3}" +
                "<br/><b>Candidate 3 Percentage</b>: ${Percent3}" +
                "<br/><b>Candidate 3 Votes</b>: ${Votes3}";
          }
          if (result.features[graphicIndex].attributes.CandidateName4 != "")
          {

            content += "<br/><br/><b>Candidate 4</b>: ${CandidateName4}" +
                "<br/><b>Candidate 4 Party</b>: ${PartyCode4}" +
                "<br/><b>Candidate 4 Percentage</b>: ${Percent4}" +
                "<br/><b>Candidate 4 Votes</b>: ${Votes4}";
          }
          if (result.features[graphicIndex].attributes.CandidateName5 != "")
          {

            content += "<br/><br/><b>Candidate 5</b>: ${CandidateName5}" +
                "<br/><b>Candidate 5 Party</b>: ${PartyCode5}" +
                "<br/><b>Candidate 5 Percentage</b>: ${Percent5}" +
                "<br/><b>Candidate 5 Votes</b>: ${Votes5}";
          }
          if (result.features[graphicIndex].attributes.CandidateName6 != "")
          {

            content += "<br/><br/><b>Candidate 6</b>: ${CandidateName6}" +
                "<br/><b>Candidate 6 Party</b>: ${PartyCode6}" +
                "<br/><b>Candidate 6 Percentage</b>: ${Percent6}" +
                "<br/><b>Candidate 6 Votes</b>: ${Votes6}";
          }
          if (result.features[graphicIndex].attributes.CandidateName7 != "")
          {

            content += "<br/><br/><b>Candidate 7</b>: ${CandidateName7}" +
                "<br/><b>Candidate 7 Party</b>: ${PartyCode7}" +
                "<br/><b>Candidate 7 Percentage</b>: ${Percent7}" +
                "<br/><b>Candidate 7 Votes</b>: ${Votes7}";
          }
          if (result.features[graphicIndex].attributes.CandidateName8 != "")
          {

            content += "<br/><br/><b>Candidate 8</b>: ${CandidateName8}" +
                "<br/><b>Candidate 8 Party</b>: ${PartyCode8}" +
                "<br/><b>Candidate 8 Percentage</b>: ${Percent8}" +
                "<br/><b>Candidate 8 Votes</b>: ${Votes8}";
          }
          if (result.features[graphicIndex].attributes.CandidateName9 != "")
          {

            content += "<br/><br/><b>Candidate 9</b>: ${CandidateName9}" +
                "<br/><b>Candidate 9 Party</b>: ${PartyCode9}" +
                "<br/><b>Candidate 9 Percentage</b>: ${Percent9}" +
                "<br/><b>Candidate 9 Votes</b>: ${Votes9}";
          }
          if (result.features[graphicIndex].attributes.CandidateName10 != "")
          {

            content += "<br/><br/><b>Candidate 10</b>: ${CandidateName10}" +
                "<br/><b>Candidate 10 Party</b>: ${PartyCode10}" +
                "<br/><b>Candidate 10 Percentage</b>: ${Percent10}" +
                "<br/><b>Candidate 10 Votes</b>: ${Votes10}";
          }
          if (result.features[graphicIndex].attributes.CandidateName11 != "")
          {

            content += "<br/><br/><b>Candidate 11</b>: ${CandidateName11}" +
                "<br/><b>Candidate 11 Party</b>: ${PartyCode11}" +
                "<br/><b>Candidate 11 Percentage</b>: ${Percent11}" +
                "<br/><b>Candidate 11 Votes</b>: ${Votes11}";
          }
          if (result.features[graphicIndex].attributes.CandidateName12 != "")
          {

            content += "<br/><br/><b>Candidate 12</b>: ${CandidateName12}" +
                "<br/><b>Candidate 12 Party</b>: ${PartyCode12}" +
                "<br/><b>Candidate 12 Percentage</b>: ${Percent12}" +
                "<br/><b>Candidate 12 Votes</b>: ${Votes12}";
          }
          if (result.features[graphicIndex].attributes.CandidateName13 != "")
          {

            content += "<br/><br/><b>Candidate 13</b>: ${CandidateName13}" +
                "<br/><b>Candidate 13 Party</b>: ${PartyCode13}" +
                "<br/><b>Candidate 13 Percentage</b>: ${Percent13}" +
                "<br/><b>Candidate 13 Votes</b>: ${Votes13}";
          }
          if (result.features[graphicIndex].attributes.CandidateName14 != "")
          {

            content += "<br/><br/><b>Candidate 14</b>: ${CandidateName14}" +
                "<br/><b>Candidate 14 Party</b>: ${PartyCode14}" +
                "<br/><b>Candidate 14 Percentage</b>: ${Percent14}" +
                "<br/><b>Candidate 14 Votes</b>: ${Votes14}";
          }
          if (result.features[graphicIndex].attributes.CandidateName15 != "")
          {

            content += "<br/><br/><b>Candidate 15</b>: ${CandidateName15}" +
                "<br/><b>Candidate 15 Party</b>: ${PartyCode15}" +
                "<br/><b>Candidate 15 Percentage</b>: ${Percent15}" +
                "<br/><b>Candidate 15 Votes</b>: ${Votes15}";
          }
          if (result.features[graphicIndex].attributes.CandidateName16 != "")
          {

            content += "<br/><br/><b>Candidate 16</b>: ${CandidateName16}" +
                "<br/><b>Candidate 16 Party</b>: ${PartyCode16}" +
                "<br/><b>Candidate 16 Percentage</b>: ${Percent16}" +
                "<br/><b>Candidate 16 Votes</b>: ${Votes16}";
          }
          if (result.features[graphicIndex].attributes.CandidateName17 != "")
          {

            content += "<br/><br/><b>Candidate 17</b>: ${CandidateName17}" +
                "<br/><b>Candidate 17 Party</b>: ${PartyCode17}" +
                "<br/><b>Candidate 17 Percentage</b>: ${Percent17}" +
                "<br/><b>Candidate 17 Votes</b>: ${Votes17}";
          }
          if (result.features[graphicIndex].attributes.CandidateName18 != "")
          {

            content += "<br/><br/><b>Candidate 18</b>: ${CandidateName18}" +
                "<br/><b>Candidate 18 Party</b>: ${PartyCode18}" +
                "<br/><b>Candidate 18 Percentage</b>: ${Percent18}" +
                "<br/><b>Candidate 18 Votes</b>: ${Votes18}";
          }
          if (result.features[graphicIndex].attributes.CandidateName19 != "")
          {

            content += "<br/><br/><b>Candidate 19</b>: ${CandidateName19}" +
                "<br/><b>Candidate 19 Party</b>: ${PartyCode19}" +
                "<br/><b>Candidate 19 Percentage</b>: ${Percent19}" +
                "<br/><b>Candidate 19 Votes</b>: ${Votes19}";
          }
          if (result.features[graphicIndex].attributes.CandidateName20 != "")
          {

            content += "<br/><br/><b>Candidate 20</b>: ${CandidateName20}" +
                "<br/><b>Candidate 20 Party</b>: ${PartyCode20}" +
                "<br/><b>Candidate 20 Percentage</b>: ${Percent20}" +
                "<br/><b>Candidate 20 Votes</b>: ${Votes20}";
          }

          template.setTitle("<b>${PrecinctName}</b>");
          template.setContent(content);
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
          var template = new PopupTemplate({
            title: "Candidates",
            description: "Vote percentages for candidates",
            fieldInfos: [{ //define field infos so we can specify an alias
              fieldName: result.features[graphicIndex].attributes.CandidateName1,
              label: result.features[graphicIndex].attributes.Percent1
            },{
              fieldName: result.features[graphicIndex].attributes.CandidateName2,
              label: result.features[graphicIndex].attributes.Percent2
            },{
              fieldName: result.features[graphicIndex].attributes.CandidateName3,
              label: result.features[graphicIndex].attributes.Percent3
            }],
            mediaInfos:[{ //define the bar chart
              caption: "Candidate Votes",
              type:"piechart",
              value:{
                theme: "Dollar",
                fields:[result.features[graphicIndex].attributes.CandidateName1, result.features[graphicIndex].attributes.CandidateName2, result.features[graphicIndex].attributes.CandidateName3]
              }
            }]
          });
          var content = "<b>Election</b>: ${ContestTitle}" +
              "<br/><br/><b>Winner</b>: ${WinnerCandidateName}" +
              "<br/><b>Winner Percentage</b>: ${WinnerPercent}" +
              "<br/><b>Winner Votes</b>: ${WinnerVotes}" +
              "<br/><br/><b>Total Votes</b>: ${TotalVotes}" +
              "<br/><br/><b>Candidate 1</b>: ${CandidateName1}" +
              "<br/><b>Candidate 1 Party</b>: ${PartyCode1}" +
              "<br/><b>Candidate 1 Percentage</b>: ${Percent1}" +
              "<br/><b>Candidate 1 Votes</b>: ${Votes1}";
          if (result.features[graphicIndex].attributes.CandidateName2 != "")
          {

            content += "<br/><br/><b>Candidate 2</b>: ${CandidateName2}" +
                "<br/><b>Candidate 2 Party</b>: ${PartyCode2}" +
                "<br/><b>Candidate 2 Percentage</b>: ${Percent2}" +
                "<br/><b>Candidate 2 Votes</b>: ${Votes2}";
          }
          if (result.features[graphicIndex].attributes.CandidateName3 != "")
          {

            content += "<br/><br/><b>Candidate 3</b>: ${CandidateName3}" +
                "<br/><b>Candidate 3 Party</b>: ${PartyCode3}" +
                "<br/><b>Candidate 3 Percentage</b>: ${Percent3}" +
                "<br/><b>Candidate 3 Votes</b>: ${Votes3}";
          }
          if (result.features[graphicIndex].attributes.CandidateName4 != "")
          {

            content += "<br/><br/><b>Candidate 4</b>: ${CandidateName4}" +
                "<br/><b>Candidate 4 Party</b>: ${PartyCode4}" +
                "<br/><b>Candidate 4 Percentage</b>: ${Percent4}" +
                "<br/><b>Candidate 4 Votes</b>: ${Votes4}";
          }
          if (result.features[graphicIndex].attributes.CandidateName5 != "")
          {

            content += "<br/><br/><b>Candidate 5</b>: ${CandidateName5}" +
                "<br/><b>Candidate 5 Party</b>: ${PartyCode5}" +
                "<br/><b>Candidate 5 Percentage</b>: ${Percent5}" +
                "<br/><b>Candidate 5 Votes</b>: ${Votes5}";
          }
          if (result.features[graphicIndex].attributes.CandidateName6 != "")
          {

            content += "<br/><br/><b>Candidate 6</b>: ${CandidateName6}" +
                "<br/><b>Candidate 6 Party</b>: ${PartyCode6}" +
                "<br/><b>Candidate 6 Percentage</b>: ${Percent6}" +
                "<br/><b>Candidate 6 Votes</b>: ${Votes6}";
          }
          if (result.features[graphicIndex].attributes.CandidateName7 != "")
          {

            content += "<br/><br/><b>Candidate 7</b>: ${CandidateName7}" +
                "<br/><b>Candidate 7 Party</b>: ${PartyCode7}" +
                "<br/><b>Candidate 7 Percentage</b>: ${Percent7}" +
                "<br/><b>Candidate 7 Votes</b>: ${Votes7}";
          }
          if (result.features[graphicIndex].attributes.CandidateName8 != "")
          {

            content += "<br/><br/><b>Candidate 8</b>: ${CandidateName8}" +
                "<br/><b>Candidate 8 Party</b>: ${PartyCode8}" +
                "<br/><b>Candidate 8 Percentage</b>: ${Percent8}" +
                "<br/><b>Candidate 8 Votes</b>: ${Votes8}";
          }
          if (result.features[graphicIndex].attributes.CandidateName9 != "")
          {

            content += "<br/><br/><b>Candidate 9</b>: ${CandidateName9}" +
                "<br/><b>Candidate 9 Party</b>: ${PartyCode9}" +
                "<br/><b>Candidate 9 Percentage</b>: ${Percent9}" +
                "<br/><b>Candidate 9 Votes</b>: ${Votes9}";
          }
          if (result.features[graphicIndex].attributes.CandidateName10 != "")
          {

            content += "<br/><br/><b>Candidate 10</b>: ${CandidateName10}" +
                "<br/><b>Candidate 10 Party</b>: ${PartyCode10}" +
                "<br/><b>Candidate 10 Percentage</b>: ${Percent10}" +
                "<br/><b>Candidate 10 Votes</b>: ${Votes10}";
          }
          if (result.features[graphicIndex].attributes.CandidateName11 != "")
          {

            content += "<br/><br/><b>Candidate 11</b>: ${CandidateName11}" +
                "<br/><b>Candidate 11 Party</b>: ${PartyCode11}" +
                "<br/><b>Candidate 11 Percentage</b>: ${Percent11}" +
                "<br/><b>Candidate 11 Votes</b>: ${Votes11}";
          }
          if (result.features[graphicIndex].attributes.CandidateName12 != "")
          {

            content += "<br/><br/><b>Candidate 12</b>: ${CandidateName12}" +
                "<br/><b>Candidate 12 Party</b>: ${PartyCode12}" +
                "<br/><b>Candidate 12 Percentage</b>: ${Percent12}" +
                "<br/><b>Candidate 12 Votes</b>: ${Votes12}";
          }
          if (result.features[graphicIndex].attributes.CandidateName13 != "")
          {

            content += "<br/><br/><b>Candidate 13</b>: ${CandidateName13}" +
                "<br/><b>Candidate 13 Party</b>: ${PartyCode13}" +
                "<br/><b>Candidate 13 Percentage</b>: ${Percent13}" +
                "<br/><b>Candidate 13 Votes</b>: ${Votes13}";
          }
          if (result.features[graphicIndex].attributes.CandidateName14 != "")
          {

            content += "<br/><br/><b>Candidate 14</b>: ${CandidateName14}" +
                "<br/><b>Candidate 14 Party</b>: ${PartyCode14}" +
                "<br/><b>Candidate 14 Percentage</b>: ${Percent14}" +
                "<br/><b>Candidate 14 Votes</b>: ${Votes14}";
          }
          if (result.features[graphicIndex].attributes.CandidateName15 != "")
          {

            content += "<br/><br/><b>Candidate 15</b>: ${CandidateName15}" +
                "<br/><b>Candidate 15 Party</b>: ${PartyCode15}" +
                "<br/><b>Candidate 15 Percentage</b>: ${Percent15}" +
                "<br/><b>Candidate 15 Votes</b>: ${Votes15}";
          }
          if (result.features[graphicIndex].attributes.CandidateName16 != "")
          {

            content += "<br/><br/><b>Candidate 16</b>: ${CandidateName16}" +
                "<br/><b>Candidate 16 Party</b>: ${PartyCode16}" +
                "<br/><b>Candidate 16 Percentage</b>: ${Percent16}" +
                "<br/><b>Candidate 16 Votes</b>: ${Votes16}";
          }
          if (result.features[graphicIndex].attributes.CandidateName17 != "")
          {

            content += "<br/><br/><b>Candidate 17</b>: ${CandidateName17}" +
                "<br/><b>Candidate 17 Party</b>: ${PartyCode17}" +
                "<br/><b>Candidate 17 Percentage</b>: ${Percent17}" +
                "<br/><b>Candidate 17 Votes</b>: ${Votes17}";
          }
          if (result.features[graphicIndex].attributes.CandidateName18 != "")
          {

            content += "<br/><br/><b>Candidate 18</b>: ${CandidateName18}" +
                "<br/><b>Candidate 18 Party</b>: ${PartyCode18}" +
                "<br/><b>Candidate 18 Percentage</b>: ${Percent18}" +
                "<br/><b>Candidate 18 Votes</b>: ${Votes18}";
          }
          if (result.features[graphicIndex].attributes.CandidateName19 != "")
          {

            content += "<br/><br/><b>Candidate 19</b>: ${CandidateName19}" +
                "<br/><b>Candidate 19 Party</b>: ${PartyCode19}" +
                "<br/><b>Candidate 19 Percentage</b>: ${Percent19}" +
                "<br/><b>Candidate 19 Votes</b>: ${Votes19}";
          }
          if (result.features[graphicIndex].attributes.CandidateName20 != "")
          {

            content += "<br/><br/><b>Candidate 20</b>: ${CandidateName20}" +
                "<br/><b>Candidate 20 Party</b>: ${PartyCode20}" +
                "<br/><b>Candidate 20 Percentage</b>: ${Percent20}" +
                "<br/><b>Candidate 20 Votes</b>: ${Votes20}";
          }
          template.setTitle("<b>${PrecinctName}</b>");
          template.setContent(content);
          g.infoTemplate = template;

          wElection.map1.graphics.add(g);
        }
        var colorListIndex = 0;
        var inList = false;

        var h3 = document.createElement("h3");
        h3.id = "currentElection";
        document.getElementById('allElections').appendChild(h3);
        document.getElementById("currentElection").innerHTML = wElection.config.pickedElections[wElection.currentSelect].ElectionName;

        var h4 = document.createElement("h4");
        h4.id = "currentContest";
        document.getElementById('allElections').appendChild(h4);
        document.getElementById("currentContest").innerHTML = wElection.currentDropDown.options[wElection.currentDropDown.selectedIndex].text;

        while (colorListIndex < colors.length)
        {
          if (colors[colorListIndex] == canColor)
          {
            inList = true;
          }
          colorListIndex += 1;
        }
        if (inList == false)
        {
          colors.push(canColor);
          var colDiv = document.getElementById("canAndColors");
          //colDiv.innerHTML = colDiv.innerHTML + result.features[graphicIndex].attributes.WinnerCandidateName;
          var winnerNames = document.createElement('div');
          winnerNames.className = 'winnerNames';
          winnerNames.innerHTML = winnerNames.innerHTML + result.features[graphicIndex].attributes.WinnerCandidateName;
          colDiv.appendChild(winnerNames);

          var square = document.createElement('div');
          square.className = 'square';
          square.id = "square" + graphicIndex;
          colDiv.appendChild(square);
          document.getElementById("square" + graphicIndex).style.backgroundColor = canColor;
          document.getElementById("square" + graphicIndex).style.width = "25px";
          document.getElementById("square" + graphicIndex).style.height = "25px";
          document.getElementById("square" + graphicIndex).style.border = "thin solid #000000";

          var br = document.createElement('br');
          colDiv.appendChild(br);
        }
        graphicIndex += 1;
      }
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

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('ElectionWidget::startup');
    // },

    onOpen: function(){
      wElection.buildContestDDQuery();
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
