// eslint-disable-next-line no-undef
sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"], function (e, t) {
        "use strict";
        return e.extend("com.app.bookshop.controller.BaseController",
            {
                getRouter: function () { return this.getOwnerComponent().getRouter() },
                loadFragment: async function (e) {
                    const n = await t.load({
                        id: this.getView().getId(),
                        name: `com.app.bookshop.fragments.${e}`,
                        controller: this
                    });
                    this.getView().addDependent(n);
                    return n
                },
                createData: async function (e, t, n) {
                    return new Promise((r, o) => {
                        e.create(n, t,
                            {
                                refreshAfterChange: true,
                                success: function (e) { r(e) },
                                error: function (e) { o(e) }
                            })
                    })
                },
                deleteData: async function (e, t, n) {
                    return new Promise((r, o) => {
                        e.remove(`${t}/${n}`,
                            {
                                success: function (e) { r(e) },
                                error: function (e) { o(e) }
                            })
                    })
                }
            })
    });