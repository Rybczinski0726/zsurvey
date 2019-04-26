sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sds.erp.ZSURVEY.controller.Personal", {

		onInit: function () {

		},

		onPressAccept: function (evt) {
			
			var oNextButton = this.byId("idNextButton");
			if (evt.getSource().getPressed()) {
				oNextButton.setEnabled(true);
			} else {
				oNextButton.setEnabled(false);
			}
		},

		onNavToPersonalInfo: function () {
			this.getRouter().navTo("PersonalInfo");
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		}

	});

});