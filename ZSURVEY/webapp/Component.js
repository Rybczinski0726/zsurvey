sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sds/erp/ZSURVEY/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.sds.erp.ZSURVEY.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},

		createContent: function () {
			// create root view
			return sap.ui.view("AppView", {
				viewName: "com.sds.erp.ZSURVEY.view.App",
				type: "XML"
			});
		}			 
		
	});
});