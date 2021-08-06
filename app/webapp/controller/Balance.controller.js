sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("be.wl.CAPDemoUI.controller.Balance", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("BalanceUsuario")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        const complete_url = window.location.href;
        const splitedUrl = complete_url.split("/");
        console.log(splitedUrl);
        const sPath = "/" + splitedUrl[4] + "/" + splitedUrl[5];
        let model = "";
        const oModel = new JSONModel();

        const capModel = this.getView().getModel();
        console.log(sPath);
        capModel.read(sPath, {
          success: mySuccessHandler,
          error: myErrorHandler,
        });
        function mySuccessHandler(data) {
          model = { balances: data.results };

          console.log("data set!");

          oModel.setData(model);
        }
        function myErrorHandler(err) {
          console.log(err);
        }
        this.getView().setModel(oModel, "balanceModel");
        this.getView().setBindingContext(oModel, "balanceModel");
      },
      onNavBack: function () {
        const complete_url = window.location.href;
        const idNumber = complete_url.split("/");
        console.log(idNumber);
        const userNumber = idNumber[4].split("( )");
        const newNumber = userNumber[0].split("(");
        const final = newNumber[1].split(")");
        const oHistory = sap.ui.core.routing.History.getInstance();
        const sPreviusHash = oHistory.getPreviousHash();
        if (sPreviusHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo(
            "Balance",
            {
              productPath: final[0],
            },
            true
          );
        }
      },
      onDelete: function (oEvent) {
        const path = oEvent
          .getSource()
          .getParent()
          .getBindingContext("balanceModel").sPath;
        const model = this.getView().getModel("balanceModel").getProperty(path);
        const capModel = this.getView().getModel();

        capModel.remove(`/Expense(${model.ID})`, {
          success: productDeleted,
          error: errorDeleting,
        });
        function productDeleted() {
          console.log("Product Deleted");
          this.getView().getModel("balanceModel").updateBindings();
        }
        function errorDeleting(err) {
          console.log(err);
        }
      },
    });
  }
);
