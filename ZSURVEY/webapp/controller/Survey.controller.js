sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (
	jQuery, Controller, JSONModel, MessageToast, MessageBox
) {
	"use strict";

	var history = {
		prevAnswerSelectAtStep2: null,
		prevAnswerSelectAtStep4: null,
		prevAnswerSelectAtStep5: null,
		prevDiffDeliverySelect: null
	};

	return Controller.extend("com.sds.erp.ZSURVEY.controller.Survey", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sds.erp.ZSURVEY.view.Survey
		 */
		onInit: function (oEvent) {
			// console.log(oEvent);
			this._wizard = this.byId("CreateSurveyWizard");
			this._oNavContainer = this.byId("wizardNavContainer");
			this._oWizardContentPage = this.byId("wizardContentPage");
			//this._oWizardReviewPage = sap.ui.xmlfragment("sap.m.sample.WizardBranching.ReviewPage", this);
			//this._oNavContainer.addPage(this._oWizardReviewPage);
			var oLocalModel = new JSONModel();
			//this.model.attachRequestCompleted(null, function () {
			oLocalModel.setProperty("/selectedAnswerAtStep2", "Yes");
			oLocalModel.setProperty("/selectedAnswerAtStep4", "Yes");
			oLocalModel.setProperty("/selectedAnswerAtStep5", "Yes");
			//	this.model.updateBindings();
			//}.bind(this));

			//this.model.loadData(sap.ui.require.toUrl("sap/ui/demo/mock") + "/products.json");
			this.getView().setModel(oLocalModel, "localModel");
			this._oSurveyModel = this.getOwnerComponent().getModel().getProperty("/surveyResult");
		},

		saveResult: function (sNumber) {
			switch (sNumber) {
			case '1':
				this._oSurveyModel.q1 = this.byId("rbgQ1").getSelectedButton().getText();
				break;
			default:
			}
		},

		onNavToSubmit: function () {
			this._oSurveyModel.q1 = this.byId("idRbgQ1").getSelectedButton().getText();
			this._oSurveyModel.q2 = this.byId("idStep2YesNo").getSelectedKey();
			if (this._oSurveyModel.q2 === "Yes") {
				this._oSurveyModel.q2_1 = this.byId("idRbgQ2_1").getSelectedButton().getText();
				this._oSurveyModel.q2_2 = this.byId("idRbgQ2_2").getSelectedButton().getText();
				this._oSurveyModel.q2_3 = this.byId("idRbgQ2_3").getSelectedButton().getText();
			} else {
				this._oSurveyModel.q2_1 = "";
				this._oSurveyModel.q2_2 = "";
				this._oSurveyModel.q2_3 = "";
			}
			this._oSurveyModel.q3 = this.byId("idRbgQ3").getSelectedButton().getText();
			this._oSurveyModel.q4 = this.byId("idStep4YesNo").getSelectedKey();
			if (this._oSurveyModel.q4 === "Yes") {
				this._oSurveyModel.q4_1 = this.byId("idRbgQ4_1").getSelectedButton().getText();
			} else {
				this._oSurveyModel.q4_1 = "";
			}
			this._oSurveyModel.q5 = this.byId("idStep5YesNo").getSelectedKey();
			if (this._oSurveyModel.q5 === "Yes") {
				this._oSurveyModel.q5_1 = this.byId("idRbgQ5_1").getSelectedButton().getText();
			} else {
				this._oSurveyModel.q5_1 = "";
			}
			this._oSurveyModel.q6 = this.byId("idTAQ6").getValue();

			this.getOwnerComponent().getModel("results").create("/Results", this._oSurveyModel, {
				success: function (response) {
					console.log(response);
				},
				error: function (oError) {
					console.log(oError);
				}
			});

			this.getRouter().navTo("Submit");
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		selectedAtStep2: function () {
			var oLocalModel = this.getView().getModel("localModel");
			var selectedKey = oLocalModel.getProperty("/selectedAnswerAtStep2");
			var oButton = this.byId("idStep2YesNo");
			selectedKey = oButton.getSelectedKey();
			switch (selectedKey) {
			case "Yes":
				this.byId("Step2").setNextStep(this.getView().byId("Step2Yes"));
				break;
			case "No":
			default:
				this.byId("Step2").setNextStep(this.getView().byId("Step3"));
				break;
			}
		},

		selectedAtStep4: function () {
			var oLocalModel = this.getView().getModel("localModel");
			var selectedKey = oLocalModel.getProperty("/selectedAnswerAtStep4");
			var oButton = this.byId("idStep4YesNo");
			selectedKey = oButton.getSelectedKey();
			switch (selectedKey) {
			case "Yes":
				this.byId("Step4").setNextStep(this.getView().byId("Step4Yes"));
				break;
			case "No":
			default:
				this.byId("Step4").setNextStep(this.getView().byId("Step5"));
				break;
			}
		},

		selectedAtStep5: function () {
			var oLocalModel = this.getView().getModel("localModel");
			var selectedKey = oLocalModel.getProperty("/selectedAnswerAtStep5");
			var oButton = this.byId("idStep5YesNo");
			selectedKey = oButton.getSelectedKey();
			switch (selectedKey) {
			case "Yes":
				this.byId("Step5").setNextStep(this.getView().byId("Step5Yes"));
				break;
			case "No":
			default:
				this.byId("Step5").setNextStep(this.getView().byId("Step6"));
				break;
			}
		},

		setAnswerAtStep2: function () {
			this.setDiscardableProperty({
				message: "응답 내용을 바꾸시겠습니까? 상세질문에 대한 기존 응답은 삭제됩니다",
				discardStep: this.byId("Step2"),
				modelPath: "/selectedAnswerAtStep2",
				historyPath: "prevAnswerSelectAtStep2"
			});
		},

		setAnswerAtStep4: function () {
			this.setDiscardableProperty({
				message: "응답 내용을 바꾸시겠습니까? 상세질문에 대한 기존 응답은 삭제됩니다",
				discardStep: this.byId("Step4"),
				modelPath: "/selectedAnswerAtStep4",
				historyPath: "prevAnswerSelectAtStep4"
			});
		},

		setAnswerAtStep5: function () {
			this.setDiscardableProperty({
				message: "응답 내용을 바꾸시겠습니까? 상세질문에 대한 기존 응답은 삭제됩니다",
				discardStep: this.byId("Step5"),
				modelPath: "/selectedAnswerAtStep5",
				historyPath: "prevAnswerSelectAtStep5"
			});
		},

		setDiscardableProperty: function (params) {
			var oLocalModel = this.getView().getModel("localModel");

			if (this._wizard.getProgressStep() !== params.discardStep) {
				MessageBox.warning(params.message, {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							this._wizard.discardProgress(params.discardStep);
							history[params.historyPath] = oLocalModel.getProperty(params.modelPath);
						} else {
							oLocalModel.setProperty(params.modelPath, history[params.historyPath]);
						}
					}.bind(this)
				});
			} else {
				history[params.historyPath] = oLocalModel.getProperty(params.modelPath);
			}
		}

	});

});