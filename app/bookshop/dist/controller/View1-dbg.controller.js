/* eslint-disable no-undef */
sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    // "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Token, JSONModel,MessageBox) {
        "use strict";

        return Controller.extend("com.app.bookshop.controller.View1", {
            onInit: function () {
                var oView = this.getView();
                var oMultiInput1 = oView.byId("idIDFilterValue");
                oMultiInput1.addValidator(function (args) {
                    const condition = true
                    if (condition) {
                        var text = args.text;
                        return new Token({ key: text, text: text});
                    }
                });
                const oLocalModel = new JSONModel({
                    title: "",
                    stock: "",
                    author: "",
                    genre: "",  
                });
                this.getView().setModel(oLocalModel, "localModel");
                this.getRouter().attachRoutePatternMatched(this.onBooksListLoad, this);
            },
            onBooksListLoad: function () {
                this.getView().byId("idBooksTable").getBinding("items").refresh();
            },
            onGoPress: function () {
                const oView = this.getView(),
                    iIDFilter = oView.byId("idIDFilterValue"),
                    iIDFilterValue = iIDFilter.getTokens(),
                    iTitleFilter = oView.byId("idTitleFilterValue"),
                    iTitleFilterValue = iTitleFilter.getValue(),
                    sStockFilterLabel = oView.byId("idStockFilterValue"),
                    sStockValue = sStockFilterLabel.getValue(),
                    sGenreFilterLabel = oView.byId("idGenreFilterValue"),
                    sGenreValue = sGenreFilterLabel.getValue(),
                    oTable = oView.byId("idBooksTable"),
                    aFilters = [];
                iIDFilterValue.filter((element) => {
                    element ? aFilters.push(new Filter("ID", FilterOperator.EQ, element.getKey())) : "";
                })
                // iIDFilterValue ? aFilters.push(new Filter("ID", FilterOperator.EQ, iIDFilterValue)) : "";
                // oTable.getBinding("items").filter(aFilters);

                iTitleFilterValue ? aFilters.push(new Filter("title", FilterOperator.EQ, iTitleFilterValue)) : "";
                // oTable.getBinding("items").filter(aFilters);

                sStockValue ? aFilters.push(new Filter("stock", FilterOperator.EQ, sStockValue)) : "";
                // oTable.getBinding("items").filter(aFilters);

                sGenreValue ? aFilters.push(new Filter("genre", FilterOperator.EQ, sGenreValue)) : "";


                oTable.getBinding("items").filter(aFilters);
            },

            onClearFilterPress: function () {
                const oView = this.getView(),
                    iIDFilter = oView.byId("idIDFilterValue"),
                    iTitleFilter = oView.byId("idTitleFilterValue"),
                    sStockFilterLabel = oView.byId("idStockFilterValue"),
                    sGenreFilterLabel = oView.byId("idGenreFilterValue"),
                    oTable = oView.byId("idEmployeeTable");

                iIDFilter.removeAllTokens("");
                iTitleFilter.setValue("");
                sStockFilterLabel.setValue("");
                sGenreFilterLabel.setValue("");

                oTable.getBinding("items").filter([]);
            },
            onSelectBooks: function (oEvent) {
                
                const { ID, author } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                // const oRouter = this.getOwnerComponent().getRouter();
                const oRouter = this.getRouter();
                oRouter.navTo("RouteForm", {
                    bookId: ID,
                    authorName: author
                })
            },
            onCreateButtonPress: async function () {
                if (!this.oCreateBookDialog) {
                    // this.oCreateBookDialog = await Fragment.load({
                    //     id: this.getView().getId(),
                    //     name: "com.app.bookshop.fragments.CreateBooksDialog",
                    //     controller: this
                    // });
                    // this.getView().addDependent(this.oCreateBookDialog);
                    this.oCreateBookDialog=await
                    this.loadFragment("CreateBooksDialog")
                }

                this.oCreateBookDialog.open();
            },

            onCloseDialog: function(){
                if(this.oCreateBookDialog.isOpen()){
                    this.oCreateBookDialog.close()
                }
            },
            onCreateBook: async function () {
                
                const oPayload = this.getView().getModel("localModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                    
                try {
                    await this.createData(oModel, oPayload, "/Books");
                    this.getView().byId("idBooksTable").getBinding("items").refresh();
                    this.oCreateBookDialog.close();
                    
                } catch (error) {
                    this.oCreateBookDialog.close();
                    MessageBox.error("Some technical Issue");
                }

            }
        });
    });
