///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/on',
  'dojo/_base/lang',
  'jimu/BaseWidgetSetting',
  'esri/tasks/query',
  'esri/tasks/QueryTask'
],
function(declare, on, lang, BaseWidgetSetting, Query, QueryTask) {

  return declare([BaseWidgetSetting], {
    baseClass: 'election-widget-setting',
    pickedElectionList: [],
    electionsList: [],
    URLElectionsList: [],

    postCreate: function(){
      //the config object is passed in
      wElectionSetting = this;
      this.setConfig(this.config);
      this.setSquareColors();
      this.getElectionNames();
      this._bindEvents();
    },

    _bindEvents: function () {
      this.own(on(this.addURLButton, 'click', lang.hitch(this.addURLToList)));
    },

    getElectionNames: function(){
      var query = new Query();
      var queryTask = new QueryTask("http://web3.kcsgis.com/kcsgis/rest/services/ElectionResults/ElectionResults/MapServer/4");
      query.where = "1=1";
      query.outSpatialReference = {wkid:102100};
      query.returnGeometry = true;
      query.outFields = ["*"];
      queryTask.execute(query, this.loadElectionNames);
    },

    loadElectionNames: function(result){
      console.log(result);
      document.getElementById("Elections").innerHTML = "";
      wElectionSetting.electionsList = [];

      var index = 0;
      while (index < result.features.length)
      {
        wElectionSetting.electionsList.push(result.features[index]);
        index += 1;
      }
      console.log(wElectionSetting.electionsList);

      index = 0;

      while (index < wElectionSetting.electionsList.length)
      {
        var option = document.createElement("option");
        option.text = wElectionSetting.electionsList[index].attributes.ElectionName;
        option.value = wElectionSetting.electionsList[index].attributes.ElectionID;
        document.getElementById("Elections").appendChild(option);
        index += 1;
      }
    },

    setSquareColors: function(){
      this.square1.style.background = this.select1.value;
      this.square2.style.background = this.select2.value;
      this.square3.style.background = this.select3.value;
      this.square4.style.background = this.select4.value;
      this.square5.style.background = this.select5.value;
      this.square6.style.background = this.select6.value;
      this.square7.style.background = this.select7.value;
      this.square8.style.background = this.select8.value;
      this.square9.style.background = this.select9.value;
      this.square10.style.background = this.select10.value;
      this.square11.style.background = this.select11.value;
      this.square12.style.background = this.select12.value;
      this.square13.style.background = this.select13.value;
      this.square14.style.background = this.select14.value;
      this.square15.style.background = this.select15.value;
      this.square16.style.background = this.select16.value;
      this.square17.style.background = this.select17.value;
      this.square18.style.background = this.select18.value;
      this.square19.style.background = this.select19.value;
      this.square20.style.background = this.select20.value;
    },

    addURLToList: function(){
      var URLTable = document.getElementById("URLTable");
      var row;
      var URL;
      var addedRowIndex = URLTable.rows.length;
      var inTable = false;
      if (URLTable.rows.length == 1)
      {
        row = URLTable.insertRow(1);
        URL = row.insertCell(0);
        URL.innerHTML = document.getElementById("serviceURL").value;
        URL = row.insertCell(1);
        URL.innerHTML = document.getElementById("Elections").value;
        URL = row.insertCell(2);
        URL.innerHTML = document.getElementById("Elections").options[document.getElementById("Elections").selectedIndex].text;

        var electionIndex = 0;
        while (electionIndex < wElectionSetting.electionsList.length)
        {
          if (document.getElementById("Elections").value == wElectionSetting.electionsList[electionIndex].attributes.ElectionID)
          {
            URL = row.insertCell(3);
            URL.innerHTML = wElectionSetting.electionsList[electionIndex].attributes.ElectionYear;

            var isLive = false;
            if (document.getElementById("isLive").checked == true)
            {
              isLive = true;
              URL = row.insertCell(4);
              URL.innerHTML = "Live";
            }

            var election = {
              ElectionID: wElectionSetting.electionsList[electionIndex].attributes.ElectionID,
              ElectionName: wElectionSetting.electionsList[electionIndex].attributes.ElectionName,
              ElectionYear: wElectionSetting.electionsList[electionIndex].attributes.ElectionYear,
              ServiceURL: document.getElementById("serviceURL").value,
              Live: isLive
            };
            wElectionSetting.pickedElectionList.push(election);
          }
          electionIndex += 1;
        }
      }
      else
      {
        var rowIndex = 0;
        while (rowIndex < URLTable.rows.length)
        {
          if (URLTable.rows[rowIndex].cells[0].innerHTML == document.getElementById("serviceURL").value)
          {
            inTable = true;
          }
          rowIndex += 1;
        }
        if (inTable == false)
        {
          row = URLTable.insertRow(addedRowIndex);
          URL = row.insertCell(0);
          URL.innerHTML = document.getElementById("serviceURL").value;
          URL = row.insertCell(1);
          URL.innerHTML = document.getElementById("Elections").value;
          URL = row.insertCell(2);
          URL.innerHTML = document.getElementById("Elections").options[document.getElementById("Elections").selectedIndex].text;

          var electionIndex = 0;
          while (electionIndex < wElectionSetting.electionsList.length)
          {
            if (document.getElementById("Elections").value == wElectionSetting.electionsList[electionIndex].attributes.ElectionID)
            {
              URL = row.insertCell(3);
              URL.innerHTML = wElectionSetting.electionsList[electionIndex].attributes.ElectionYear;

              var isLive = false;
              if (document.getElementById("isLive").checked == true)
              {
                isLive = true;
                URL = row.insertCell(4);
                URL.innerHTML = "Live";
              }

              var election = {
                ElectionID: wElectionSetting.electionsList[electionIndex].attributes.ElectionID,
                ElectionName: wElectionSetting.electionsList[electionIndex].attributes.ElectionName,
                ElectionYear: wElectionSetting.electionsList[electionIndex].attributes.ElectionYear,
                ServiceURL: document.getElementById("serviceURL").value,
                Live: isLive
              };
              wElectionSetting.pickedElectionList.push(election);
            }
            electionIndex += 1;
          }
        }
      }
      console.log(wElectionSetting.pickedElectionList);
    },

    setConfig: function(config){
      this.textNode.value = config.serviceUrl;

      this.select1.value = config.canCol1;
      this.select2.value = config.canCol2;
      this.select3.value = config.canCol3;
      this.select4.value = config.canCol4;
      this.select5.value = config.canCol5;
      this.select6.value = config.canCol6;
      this.select7.value = config.canCol7;
      this.select8.value = config.canCol8;
      this.select9.value = config.canCol9;
      this.select10.value = config.canCol10;
      this.select11.value = config.canCol11;
      this.select12.value = config.canCol12;
      this.select13.value = config.canCol13;
      this.select14.value = config.canCol14;
      this.select15.value = config.canCol15;
      this.select16.value = config.canCol16;
      this.select17.value = config.canCol17;
      this.select18.value = config.canCol18;
      this.select19.value = config.canCol19;
      this.select20.value = config.canCol20;
    },

    getConfig: function(){
      this.config.pickedElections = [];
      //WAB will get config object through this method
      return {
        pickedElections: wElectionSetting.pickedElectionList,
        serviceUrl: this.textNode.value,
        canCol1:  this.select1.value,
        canCol2:  this.select2.value,
        canCol3:  this.select3.value,
        canCol4:  this.select4.value,
        canCol5:  this.select5.value,
        canCol6:  this.select6.value,
        canCol7:  this.select7.value,
        canCol8:  this.select8.value,
        canCol9:  this.select9.value,
        canCol10:  this.select10.value,
        canCol11:  this.select11.value,
        canCol12:  this.select12.value,
        canCol13:  this.select13.value,
        canCol14:  this.select14.value,
        canCol15:  this.select15.value,
        canCol16:  this.select16.value,
        canCol17:  this.select17.value,
        canCol18:  this.select18.value,
        canCol19:  this.select19.value,
        canCol20:  this.select20.value
      };
    }
  });
});
