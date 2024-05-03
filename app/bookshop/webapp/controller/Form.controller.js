sap.ui.define(
    [
        // "sap/ui/core/mvc/Controller",
        // 'sap/m/MessageToast',
        // 'sap/ui/Device'
        "./BaseController",
        "sap/m/MessageBox"
    ],
    function (BaseController, MessageBox) {
        "use strict";

        return BaseController.extend("com.app.bookshop.controller.Form", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.attachRoutePatternMatched(this.onBooks, this); 
            },
            onBooks: function(oEvent ){
                const {bookId} = oEvent.getParameter("arguments");
                this.ID = bookId;
                // const sRouterName = oEvent.getParameter("name");
                const oObjectPage = this.getView().byId("idBooksDetailsObject");
                
                oObjectPage.bindElement(`/Books(${bookId})`, {
                     expand: 'authorid,address'
                });
            },
            onDeleteBooks: async function(){
                const oModel = this.getView().getModel("ModelV2");
      
                try {
                  await this.deleteData(oModel, "/Books", this.ID);
                  this.getRouter().navTo("RouteView1");
                } 
                catch (error) {
                  MessageBox.error("Technical issue");
                }
            }
        });
    }
);