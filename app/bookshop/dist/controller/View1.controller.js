/* eslint-disable no-undef */
sap.ui.define(["./BaseController", "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator", "sap/m/Token",
    "sap/ui/model/json/JSONModel", "sap/m/MessageBox"],
    function (e, t, o, i, s, a) {
        "use strict";
        return e.extend("com.app.bookshop.controller.View1",
            {
                onInit: function () {
                    var e = this.getView(); var t = e.byId("idIDFilterValue");
                    t.addValidator(function (e) {
                        const t = true;
                        if (t) {
                            var o = e.text;
                            return new i({ key: o, text: o })
                        }
                    }); const o = new s({ title: "", stock: "", author: "", genre: "" }); this.getView().setModel(o, "localModel"); this.getRouter().attachRoutePatternMatched(this.onBooksListLoad, this)
                }, onBooksListLoad: function () { this.getView().byId("idBooksTable").getBinding("items").refresh() }, onGoPress: function () { const e = this.getView(), i = e.byId("idIDFilterValue"), s = i.getTokens(), a = e.byId("idTitleFilterValue"), l = a.getValue(), n = e.byId("idStockFilterValue"), r = n.getValue(), d = e.byId("idGenreFilterValue"), u = d.getValue(), g = e.byId("idBooksTable"), c = []; s.filter(e => { e ? c.push(new t("ID", o.EQ, e.getKey())) : "" }); l ? c.push(new t("title", o.EQ, l)) : ""; r ? c.push(new t("stock", o.EQ, r)) : ""; u ? c.push(new t("genre", o.EQ, u)) : ""; g.getBinding("items").filter(c) }, onClearFilterPress: function () { const e = this.getView(), t = e.byId("idIDFilterValue"), o = e.byId("idTitleFilterValue"), i = e.byId("idStockFilterValue"), s = e.byId("idGenreFilterValue"), a = e.byId("idEmployeeTable"); t.removeAllTokens(""); o.setValue(""); i.setValue(""); s.setValue(""); a.getBinding("items").filter([]) }, onSelectBooks: function (e) { const { ID: t, author: o } = e.getSource().getSelectedItem().getBindingContext().getObject(); const i = this.getRouter(); i.navTo("RouteForm", { bookId: t, authorName: o }) }, onCreateButtonPress: async function () { if (!this.oCreateBookDialog) { this.oCreateBookDialog = await this.loadFragment("CreateBooksDialog") } this.oCreateBookDialog.open() }, onCloseDialog: function () { if (this.oCreateBookDialog.isOpen()) { this.oCreateBookDialog.close() } }, onCreateBook: async function () { const e = this.getView().getModel("localModel").getProperty("/"), t = this.getView().getModel("ModelV2"); try { await this.createData(t, e, "/Books"); this.getView().byId("idBooksTable").getBinding("items").refresh(); this.oCreateBookDialog.close() } catch (e) { this.oCreateBookDialog.close(); a.error("Some technical Issue") } }
            })
    });