sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        'sap/m/MessageToast',
        'sap/ui/Device'
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.app.bookshop.controller.Form", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.attachRoutePatternMatched(this.onSelectBooks, this); 
            },
            onSelectBooks: function(oEvent ){
                const {bookId} = oEvent.getParameter("arguments");
                // const sRouterName = oEvent.getParameter("name");
                const oObjectPage = this.getView().byId("idBooksDetailsObject");
                
                oObjectPage.bindElement(`/Books(${bookId})`, {
                     expand: 'authorid,address'
                });
            }
        });
    }
);