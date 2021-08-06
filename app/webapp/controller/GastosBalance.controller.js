sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("be.wl.CAPDemoUI.controller.GastosBalance", {
      /*
       **
       **LIFECYCLE METHODS
       **
       */

      onInit: function () {
        const dataObject = {
          ID: "",
          comida: "",
          transporte_hotel: "",
          dineroPagado: "",
          user: "",
        };
        var oModel = new JSONModel();
        oModel.setData(dataObject);
        this.getView().setModel(oModel, "formModel");
      },
      handleSavePress: function () {
        const complete_url = window.location.href;
        const idNumber = complete_url.split("/");
        console.log(idNumber);
        const userNumber = idNumber[5].split("( )");
        const newNumber = userNumber[0].split("(");
        const final = newNumber[1].split(")");

        const oModel = this.getView().getModel("formModel");
        const oProperty = oModel.getProperty("/");
        oProperty.user = { ID: parseInt(final[0]) };
        oProperty.ID = parseInt(oProperty.ID);
        oProperty.comida = parseInt(oProperty.comida);
        oProperty.transporte_hotel = parseInt(oProperty.transporte_hotel);
        oProperty.dineroPagado = parseInt(oProperty.dineroPagado);
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        const capModel = this.getView().getModel();
        const view = this.byId("ItemsST");
        const sPath = "/" + idNumber[5] + "/" + idNumber[6];

        function route() {
          oRouter.navTo("BalanceUsuario", {
            productPath: final[0],
          });
        }
        if (
          oProperty.comida != "" &&
          oProperty.transporte_hotel != "" &&
          oProperty.dineroPagado != ""
        ) {
          capModel.create("/Expense", oProperty, {
            success: productAdded,
            error: productNotAdded,
          });
          function productAdded() {
            MessageToast.show("Gasto añadido");
            route();
          }
          function productNotAdded(err) {
            console.log(err);
            MessageToast.show("Sorry we could not create the entries!");
          }
        } else {
          MessageToast.show("introduce correct values please");
        }
      },
    });
  }
);
