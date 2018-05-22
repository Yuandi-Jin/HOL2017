/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!./resources/nls/my-table-with-chart-strings',
      'ojs/ojinputtext', 'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojchart', 'ojs/ojbutton'], function (oj, ko, $) {

    
    function MyTableWithChartComponentModel(context) {
        var self = this;
        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;
        
        // ko observable default values, can be overwriten by properties set in the view
        self.messageText = ko.observable("ko default messageText");
        self.stackValue = ko.observable("on");
        self.columnArray = ko.observableArray([{"headerText": "Employee Id", "field": "EmployeeId"},
                                               {"headerText": "Employee Revenue", "field": "Revenue"}]);

        if (context.properties.myMessage) {
            self.messageText(context.properties.myMessage);
        }
        
        var deptArray = [{EmployeeId: 5, Revenue: 100000},
            {EmployeeId: 10, Revenue: 200000},
            {EmployeeId: 20, Revenue: 130000},
            {EmployeeId: 30, Revenue: 110000},
            {EmployeeId: 40, Revenue: 230000},
            {EmployeeId: 50, Revenue: 400000},
            {EmployeeId: 60, Revenue: 600000}];
        self.dataprovider = new oj.ArrayDataProvider(deptArray, {idAttribute: 'EmployeeId'});
        
        // pz
        // here self.pz works as a "ref" to the PU but in the component's scope
        if (context.properties.myPz) {
            // assumption: pz overwrites properties set in the view, and ko observable default values.
            self.messageText(context.properties.myPz.pzMessageText);
            self.stackValue(context.properties.myPz.pzStackValue);
            self.columnArray(context.properties.myPz.pzColumnArray);
        }
        self.pz = ko.computed(function() {
            return {pzMessageText: self.messageText(),
                pzStackValue: self.stackValue(),
                pzColumnArray: self.columnArray()
            };
        });
        // now self.pz is in sync with the personalization in the component
        // but...
        // how to sync self.pz back to the page designer variable?
        self.pz.subscribe(function(){
          context.properties.myPz = {};
          context.properties.myPz.pzMessageText = self.messageText();
          context.properties.myPz.pzStackValue = self.stackValue();
          context.properties.myPz.pzColumnArray = self.columnArray();
          // this only changes context.properties.myPz, but not the $variables.myChart1Pz
        });

        /* toggle button action */
        self.toggleStack = function () {
            var stackOn = self.stackValue() === "on";
            self.stackValue(stackOn ? "off" : "on");
        };

        /* chart */
        var barSeries = [];
        deptArray.forEach(function(element){
            var kvp = {name: element["EmployeeId"], items: [element["Revenue"]]};
            barSeries.push(kvp);
        });
        var barGroups = ["Revenue"];

        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return MyTableWithChartComponentModel;
});