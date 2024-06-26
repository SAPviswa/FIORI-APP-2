// eslint-disable-next-line no-undef
sap.ui.define(["./BaseController",
    "sap/m/MessageBox"],
    function (t, e) {
        "use strict"; return t.extend("com.app.bookshop.controller.Form",
            {
                onInit: function () {
                    const t = this.getOwnerComponent().getRouter();
                    t.attachRoutePatternMatched(this.onBooks, this)
                },
                onBooks: function (t) {
                    const { bookId: e } = t.getParameter("arguments");
                    this.ID = e; const o = this.getView().byId("idBooksDetailsObject");
                    o.bindElement(`/Books(${e})`, { expand: "authorid,addresses" })
                },
                onDeleteBooks: async function () {
                    const t = this.getView().getModel("ModelV2");
                    try {
                        await this.deleteData(t, "/Books", this.ID);
                        this.getRouter().navTo("RouteView1")
                    } catch (t) { e.error("Technical issue") }
                }
            })
    });