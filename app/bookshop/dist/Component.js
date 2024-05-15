// eslint-disable-next-line no-undef
sap.ui.define(["sap/ui/core/UIComponent",
    "sap/ui/Device", "com/app/bookshop/model/models"],
    function (e, o, t) {
        "use strict";
        return e.extend("com.app.bookshop.Component",
            {
                metadata: { manifest: "json" },
                init: function () {
                    e.prototype.init.apply(this, arguments);
                    this.getRouter().initialize();
                    this.setModel(t.createDeviceModel(),
                        "device")
                }
            })
    });