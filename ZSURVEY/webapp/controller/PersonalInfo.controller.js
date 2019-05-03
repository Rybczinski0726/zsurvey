sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter"
], function (Controller, MessageBox, Filter) {
	"use strict";

	return Controller.extend("com.sds.erp.ZSURVEY.controller.PersonalInfo", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sds.erp.ZSURVEY.view.PersonalInfo
		 */
		onInit: function (oEvent) {
			// console.log(oEvent);
		},
		checkDuplication: function () {
			var that = this;
			var oView = this.getView();
			this.getOwnerComponent().getModel("results").read("/Results", {
				filters: [new Filter({
					path: "phone",
					operator: "EQ",
					value1: oView.byId("inputPhone").getValue()
				})],
				success: function (oData, response) {
					if (oData.results.length === 0) {
						that.onNavToSurvey();
					} else {
						MessageBox.error("이미 등록된 연락처입니다.");
						that.getView().byId("inputPhone").setValueState("Error");
					} 
				},
				error: function (oError) {
					console.log(oError);
				}
			});
		},
		onNavToSurvey: function () {
			var oView = this.getView();

			var requiredInputs = this.returnIdListOfRequiredFields();
			var passedValidation = this.validateEventFeedbackForm(requiredInputs);
			if (passedValidation === false) {
				//show an error message, rest of code will not execute.
				return false;
			}
			var oData = {
				company: oView.byId("inputCompany").getValue(),
				name1: oView.byId("inputName").getValue(),
				phone: oView.byId("inputPhone").getValue()
			};
			this.getOwnerComponent().getModel().setProperty("/surveyResult", oData);
			this.getRouter().navTo("Survey");
		},

		returnIdListOfRequiredFields: function () {
			var requiredInputs;
			return requiredInputs = ['inputCompany', 'inputName', 'inputPhone'];
		},

		validateEventFeedbackForm: function (requiredInputs) {
			var _self = this;
			var valid = true;
			requiredInputs.forEach(function (input) {
				var sInput = _self.getView().byId(input);
				if (sInput.getValue() == "" || sInput.getValue() == undefined || sInput.getValueState() == "Error") {
					valid = false;
					sInput.setValueState("Error");
				} else {
					sInput.setValueState("None");
				}
			});
			return valid;
		},

		handleUserInput: function (oEvent) {
			var sUserInput = oEvent.getParameter("value");
			var oInputControl = oEvent.getSource();
			if (sUserInput) {
				oInputControl.setValueState(sap.ui.core.ValueState.Success);
			} else {
				oInputControl.setValueState(sap.ui.core.ValueState.Error);
			}
		},

		handlePhoneInput: function (oEvent) {
			const regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;

			var sUserInput = oEvent.getParameter("value");
			var oInputControl = oEvent.getSource();
			if (regExp.test(sUserInput)) {
				oInputControl.setValueState(sap.ui.core.ValueState.Success);
			} else {
				oInputControl.setValueState(sap.ui.core.ValueState.Error);
			}
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		}

	});

});