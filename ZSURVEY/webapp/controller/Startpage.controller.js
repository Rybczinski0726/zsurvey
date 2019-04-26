sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/NumberFormat",
	"sap/base/strings/formatMessage"
], function (Controller, JSONModel, NumberFormat, formatMessage) {
	"use strict";

	return Controller.extend("com.sds.erp.ZSURVEY.controller.Startpage", {
		onInit: function () {
		
			
		},

		onNavToPersonal: function () {
			this.getRouter().navTo("personal");
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		}
		
	});
});
