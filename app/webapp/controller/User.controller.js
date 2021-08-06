sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("be.wl.CAPDemoUI.controller.User", {
      /*
       **
       **LIFECYCLE METHODS
       **
       */

      onInit: function () {
        const dataObject = {
          ID: "",
          name: "",
          second_name: "",
          email: "",
        };
        var oModel = new JSONModel();
        oModel.setData(dataObject);
        this.getView().setModel(oModel, "formModel");
      },

      handleSavePress: function () {
        const oModel = this.getView().getModel("formModel");
        const oProperty = oModel.getProperty("/");
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oProperty.ID = parseInt(oProperty.ID);
        const capModel = this.getView().getModel();
        if (
          oProperty.name != "" &&
          oProperty.second_name != "" &&
          oProperty.email != "" &&
          typeof oProperty.ID == "number"
        ) {
          capModel.create("/User", oProperty, {
            success: productAdded,
            error: productNotAdded,
          });
          function productAdded() {
            oRouter.navTo("GastosBalance", {
              productPath: oProperty.ID,
            });
          }
          function productNotAdded(err) {
            console.log(err);
            MessageToast.show("Sorry we could not create the user!");
          }
        } else {
          MessageToast.show("introduce correct values please");
        }
        console.log(oProperty);
      },
      oEntrar: function () {
        const oModel = this.getView().getModel("formModel");
        const oProperty = oModel.getProperty("/");
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oProperty.ID = parseInt(oProperty.ID);
        oRouter.navTo("GastosBalance", {
          productPath: oProperty.ID,
        });
      },
    });
  }
);
