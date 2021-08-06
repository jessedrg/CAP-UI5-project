sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("be.wl.CAPDemoUI.controller.UserDisplay", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("GastosBalance")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function () {
        const complete_url = window.location.href;
        const splitedUrl = complete_url.split("/");
        let idUser = `/User(${splitedUrl[6]})`;
        let model = "";
        const oModel = new JSONModel();
        const capModel = this.getView().getModel();
        capModel.read(idUser, { success: passData, error: throwError });
        function passData(data) {
          model = data;
          oModel.setData(model);
        }
        function throwError(err) {
          console.log("Sorry a error ocurret: " + err);
        }
        this.getView().setModel(oModel, "user");
      },
    });
  }
);
