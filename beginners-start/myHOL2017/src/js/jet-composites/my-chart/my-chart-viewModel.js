/**
 Copyright (c) 2015, 2018, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(
        ['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!./resources/nls/my-chart-strings', 'ojs/ojchart'], function (oj, ko, $) {


    function MyChartComponentModel(context) {
        var self = this;

        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.chartType = ko.observable("bar");

        // Example for parsing context properties
        if (context.properties.myMessage) {
            self.messageText(context.properties.myMessage);
        }
        if (context.properties.chartType) {
            self.chartType = context.properties.chartType;
        }

        /* toggle button variables */
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');

        /* chart data */
        var barSeries = [{name: "Series 1", items: [42, 34]},
            {name: "Series 2", items: [55, 30]},
            {name: "Series 3", items: [36, 50]},
            {name: "Series 4", items: [22, 46]},
            {name: "Series 5", items: [22, 46]}];

        var barGroups = ["Group A", "Group B"];

        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    }
    ;

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

    return MyChartComponentModel;
});