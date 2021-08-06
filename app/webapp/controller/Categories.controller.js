sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("be.wl.CAPDemoUI.controller.Categories", {
    onInit: function () {},
    onPressGoToBalance: function () {
      const complete_url = window.location.href;
      const splitedUrl = complete_url.split("/");
      let userId = splitedUrl[6];
      console.log(splitedUrl);
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo(
        "Balance",

        { productPath: userId }
      );
    },
    onPressGoToInicio: function () {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("User");
    },
  });
});
