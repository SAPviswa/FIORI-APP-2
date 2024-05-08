//@ui5-bundle com/app/bookshop/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/app/bookshop/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/app/bookshop/model/models"],function(e,o,t){"use strict";return e.extend("com.app.bookshop.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"com/app/bookshop/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(o){"use strict";return o.extend("com.app.bookshop.controller.App",{onInit:function(){}})});
},
	"com/app/bookshop/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment"],function(e,t){"use strict";return e.extend("com.app.bookshop.controller.BaseController",{getRouter:function(){return this.getOwnerComponent().getRouter()},loadFragment:async function(e){const n=await t.load({id:this.getView().getId(),name:`com.app.bookshop.fragments.${e}`,controller:this});this.getView().addDependent(n);return n},createData:async function(e,t,n){return new Promise((r,o)=>{e.create(n,t,{refreshAfterChange:true,success:function(e){r(e)},error:function(e){o(e)}})})},deleteData:async function(e,t,n){return new Promise((r,o)=>{e.remove(`${t}/${n}`,{success:function(e){r(e)},error:function(e){o(e)}})})}})});
},
	"com/app/bookshop/controller/Form.controller.js":function(){sap.ui.define(["./BaseController","sap/m/MessageBox"],function(t,e){"use strict";return t.extend("com.app.bookshop.controller.Form",{onInit:function(){const t=this.getOwnerComponent().getRouter();t.attachRoutePatternMatched(this.onBooks,this)},onBooks:function(t){const{bookId:e}=t.getParameter("arguments");this.ID=e;const o=this.getView().byId("idBooksDetailsObject");o.bindElement(`/Books(${e})`,{expand:"authorid,addresses"})},onDeleteBooks:async function(){const t=this.getView().getModel("ModelV2");try{await this.deleteData(t,"/Books",this.ID);this.getRouter().navTo("RouteView1")}catch(t){e.error("Technical issue")}}})});
},
	"com/app/bookshop/controller/View1.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/Token","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,o,i,s,a){"use strict";return e.extend("com.app.bookshop.controller.View1",{onInit:function(){var e=this.getView();var t=e.byId("idIDFilterValue");t.addValidator(function(e){const t=true;if(t){var o=e.text;return new i({key:o,text:o})}});const o=new s({title:"",stock:"",author:"",genre:""});this.getView().setModel(o,"localModel");this.getRouter().attachRoutePatternMatched(this.onBooksListLoad,this)},onBooksListLoad:function(){this.getView().byId("idBooksTable").getBinding("items").refresh()},onGoPress:function(){const e=this.getView(),i=e.byId("idIDFilterValue"),s=i.getTokens(),a=e.byId("idTitleFilterValue"),l=a.getValue(),n=e.byId("idStockFilterValue"),r=n.getValue(),d=e.byId("idGenreFilterValue"),u=d.getValue(),g=e.byId("idBooksTable"),c=[];s.filter(e=>{e?c.push(new t("ID",o.EQ,e.getKey())):""});l?c.push(new t("title",o.EQ,l)):"";r?c.push(new t("stock",o.EQ,r)):"";u?c.push(new t("genre",o.EQ,u)):"";g.getBinding("items").filter(c)},onClearFilterPress:function(){const e=this.getView(),t=e.byId("idIDFilterValue"),o=e.byId("idTitleFilterValue"),i=e.byId("idStockFilterValue"),s=e.byId("idGenreFilterValue"),a=e.byId("idEmployeeTable");t.removeAllTokens("");o.setValue("");i.setValue("");s.setValue("");a.getBinding("items").filter([])},onSelectBooks:function(e){const{ID:t,author:o}=e.getSource().getSelectedItem().getBindingContext().getObject();const i=this.getRouter();i.navTo("RouteForm",{bookId:t,authorName:o})},onCreateButtonPress:async function(){if(!this.oCreateBookDialog){this.oCreateBookDialog=await this.loadFragment("CreateBooksDialog")}this.oCreateBookDialog.open()},onCloseDialog:function(){if(this.oCreateBookDialog.isOpen()){this.oCreateBookDialog.close()}},onCreateBook:async function(){const e=this.getView().getModel("localModel").getProperty("/"),t=this.getView().getModel("ModelV2");try{await this.createData(t,e,"/Books");this.getView().byId("idBooksTable").getBinding("items").refresh();this.oCreateBookDialog.close()}catch(e){this.oCreateBookDialog.close();a.error("Some technical Issue")}}})});
},
	"com/app/bookshop/fragments/Address.fragment.xml":' <core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><form:SimpleForm\n        id="idBooksAddressDetailsForm"\n        editable="false"\n        layout="ColumnLayout"\n        columnsM="2"\n        columnsL="3"\n        columnsXL="4"\n        binding="{addresses}"\n    ><Label   \n            id="idCityLabel"\n            text="City"\n        /><Text\n            id="idCityText"\n            text="{city}"\n        /><Label\n            id="idStateLabel"\n            text="State"\n        /><Text\n            id="idStateText"\n            text="{state}"\n        /><Label\n            id="idContryLabel"\n            text="Country"\n        /><Text\n            id="idCountryText"\n            text="{country}"\n        /><Label\n            id="idPincodeLabel"\n            text="Pincode"\n        /><Text\n            id="idPincodeText"\n            text="{pincode}"\n        /></form:SimpleForm></core:FragmentDefinition>',
	"com/app/bookshop/fragments/Author.fragment.xml":' <core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><form:SimpleForm\n        id="idBooksAuthorDetailsForm"\n        editable="false"\n        layout="ColumnLayout"\n        columnsM="2"\n        columnsL="3"\n        columnsXL="4"\n        class="AuthorForm"\n        binding="{authorid}"\n    ><Label\n            id="idQualificationLabel"\n            text="Qualification"\n        /><Text\n            id="idQualificationText"\n            text="{qualification}"\n        /><Label\n            id="idAgeLabel"\n            text="Age"\n        /><Text\n            id="idAgeText"\n            text="{age}"\n        /></form:SimpleForm></core:FragmentDefinition>',
	"com/app/bookshop/fragments/CreateBooksDialog.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><Dialog\n        id="idCreateBooksDialog"\n        resizable="true"\n        draggable="true"\n        contentWidth="30%"\n        title="Add New Book"\n    ><content><form:SimpleForm\n                id="idBookDetailsForm"\n                editable="true"\n                layout="ResponsiveGridLayout"\n                labelSpanXL="3"\n                labelSpanL="3"\n                labelSpanM="3"\n                labelSpanS="2"\n                adjustLabelSpan="false"\n                emptySpanXL="3"\n                emptySpanL="3"\n                emptySpanM="3"\n                emptySpanS="0"\n                columnsXL="1"\n                columnsL="1"\n                columnsM="2"\n                singleContainerFullSize="false"\n            ><Label\n                    id="idLabel"\n                    text="ID"\n                /><Input\n                    id="idInput"\n                    value="{localModel>/ID}"\n                /><Label\n                    id="idTitleLabel"\n                    text="Title"\n                /><Input\n                    id="idTitleInput"\n                    value="{localModel>/title}"\n                /><Label\n                    id="idStockLabel"\n                    text="Stock"\n                /><Input\n                    id="idStockInput"\n                    value="{localModel>/stock}"\n                /><Label\n                    id="idAuthorLabel"\n                    text="Author"\n                /><Input\n                    id="idAuthorInput"\n                    value="{localModel>/author}"\n                /><Label\n                    id="idGenreLabel"\n                    text="Genre"\n                /><Input\n                    id="idGenreInput"\n                    value="{localModel>/genre}"\n                /></form:SimpleForm></content><beginButton><Button\n                id="idCreateButton"\n                text="Add"\n                press="onCreateBook"\n                type="Success"\n            /></beginButton><endButton><Button\n                id="idCancelButton"\n                text="Cancel"\n                press="onCloseDialog"\n                type="Negative"\n            /></endButton></Dialog></core:FragmentDefinition>',
	"com/app/bookshop/fragments/Generalinformation.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><form:SimpleForm\n        id="idBooksDetailsForm"\n        editable="false"\n        layout="ColumnLayout"\n        columnsM="2"\n        columnsL="3"\n        columnsXL="4"\n        \n    ><Label\n            id="idNameLabel"\n            text="Author Name"\n        /><Text\n            id="idNameText"\n            text="{author}"\n        /><Label\n            id="idEmailLabel"\n            text="Title"\n        /><Text\n            id="idEmailText"\n            text="{title}"\n        /><Label\n            id="idPhoneLabel"\n            text="Stock"\n        /><Text\n            id="idPhoneText"\n            text="{stock}"\n        /><Label\n            id="idpublicationLabel"\n            text="PublicationYear"\n        /><Text\n            id="idPublicationText"\n            text="{publicationYear}"\n        /></form:SimpleForm></core:FragmentDefinition>\n',
	"com/app/bookshop/i18n/i18n.properties":'# This is the resource bundle for com.app.bookshop\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Book Details\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Book Details\n\n#XFLD,42\nflpTitle=Books  details\n\n#XFLD,51\nflpSubtitle=Books Information\nID=AUSWEIS\nTitle=Titel\nEnter-Stock=Geben Sie den Bestand ein\nGenre=Genre',
	"com/app/bookshop/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"com.app.bookshop","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.13.2","toolsId":"bad41c7c-73a5-48f2-92d1-360543565b63"},"dataSources":{"mainService":{"uri":"BooksSRV/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}},"mainServiceV2":{"uri":"v2/BooksSRV/","type":"OData","settings":{"annotations":[],"odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"Books Details-display":{"semanticObject":"Books Details","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.123.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.app.bookshop.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"ModelV2":{"dataSource":"mainServiceV2","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.app.bookshop.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]},{"name":"RouteForm","pattern":"bookshop/{bookId}/:authorName:","target":["TargetForm"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"},"TargetForm":{"viewType":"XML","transition":"slide","viewId":"Form","viewName":"Form"}}},"rootView":{"viewName":"com.app.bookshop.view.App","type":"XML","async":true,"id":"App"},"config":{"sample":{"stretch":true,"files":["Form.view.xml","Form.controller.js","manifest.json"]}}},"sap.cloud":{"public":true,"service":"Managed_Approuter_A"}}',
	"com/app/bookshop/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/app/bookshop/view/App.view.xml":'<mvc:View controllerName="com.app.bookshop.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/app/bookshop/view/Form.view.xml":'<mvc:View\n    controllerName="com.app.bookshop.controller.Form"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns:form="sap.ui.layout.form"\n    xmlns:u="sap.uxap"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"\n><u:ObjectPageLayout\n        id="idBooksDetailsObject"\n        upperCaseAnchorBar="true"\n    ><u:headerTitle><u:ObjectPageDynamicHeaderTitle id="idObjectPageDynamicTitle"><u:expandedHeading><Title\n                        id="idBooksDetailsTitle"\n                        text="{author}"\n                    /></u:expandedHeading></u:ObjectPageDynamicHeaderTitle></u:headerTitle><u:sections ><u:ObjectPageSection\n                titleUppercase="true"\n                id="generalInfo"\n                title="Books General Information"\n            ><u:subSections><u:ObjectPageSubSection id="idGeneralInfoSubSection"><u:actions><Button\n                                id="idBtnDelete"\n                                icon="sap-icon://delete"\n                                tooltip="Delete Employee"\n                                type="Negative"\n                                press="onDeleteBooks"\n                            /></u:actions><core:Fragment\n                            type="XML"\n                            fragmentName="com.app.bookshop.fragments.Generalinformation"\n                        /></u:ObjectPageSubSection></u:subSections></u:ObjectPageSection><u:ObjectPageSection\n                id="idAuthorSection"\n                title="Author Details"\n                titleUppercase="true"\n            ><u:subSections><u:ObjectPageSubSection id="idAuthorSubSection"><core:Fragment\n                            type="XML"\n                            fragmentName="com.app.bookshop.fragments.Author"\n                        /></u:ObjectPageSubSection></u:subSections></u:ObjectPageSection><u:ObjectPageSection\n                id="idAddressSection"\n                title="Address Details"\n                titleUppercase="true"\n            ><u:subSections><u:ObjectPageSubSection id="idAddressSubSection"><core:Fragment\n                            type="XML"\n                            fragmentName="com.app.bookshop.fragments.Address"\n                        /></u:ObjectPageSubSection></u:subSections></u:ObjectPageSection></u:sections></u:ObjectPageLayout></mvc:View>\n',
	"com/app/bookshop/view/View1.view.xml":'<mvc:View\n    controllerName="com.app.bookshop.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns="sap.m"\n    xmlns:layout="sap.ui.layout"\n    xmlns:f="sap.f"\n><f:DynamicPage\n        id="idBooksListPage"\n        headerExpanded="true"\n    ><f:title><f:DynamicPageTitle id="idBooksListPageTitle"><f:heading><Title\n                        id="idBooksPageHeadingTitle"\n                        text="BooksDetails"\n                    /></f:heading><f:expandedContent><Label\n                        id="idBooksListPageECL"\n                        text="The Books details"\n                    /></f:expandedContent><f:snappedContent><Label\n                        id="idBooksListPageESL"\n                        text="The Books details"\n                    /></f:snappedContent><f:snappedTitleOnMobile><Title\n                        id="idbooksListPageEST"\n                        text="The Books details"\n                    /></f:snappedTitleOnMobile><f:navigationActions><Button\n                        id="idBtnFullScreen"\n                        icon="sap-icon://full-screen"\n                        type="Transparent"\n                    /><Button\n                        id="idBtnDecline"\n                        icon="sap-icon://decline"\n                        type="Transparent"\n                    /></f:navigationActions></f:DynamicPageTitle></f:title><f:header><f:DynamicPageHeader\n                id="idDynamicPageHeader"\n                pinnable="true"\n            ><HBox\n                    id="idFilterHLayout"\n                    alignContent="SpaceAround"\n                    width="100vw"\n                ><VBox\n                        id="idAuthorFilter"\n                        class="sapUiSmallMarginEnd"\n                    ><Label\n                            id="idAuthorFilterLabel"\n                            text="{i18n>ID}"\n                        /><MultiInput\n                            id="idIDFilterValue"\n                            showSuggestion="false"\n                            width="70%"\n                            showValueHelp="false"\n                            placeholder="Enter ID"\n                        /></VBox><VBox\n                        id="idTitleFilter"\n                        class="sapUiSmallMarginEnd"\n                    ><Label\n                            id="idFTitleFilterLabel"\n                            text="Title:"\n                        /><Input\n                            id="idTitleFilterValue"\n                            value=""\n                            placeholder="Enter Title"\n                        /></VBox><VBox\n                        id="idStockFilter"\n                        class="sapUiSmallMarginEnd"\n                    ><Label\n                            id="idStockFilterLabel"\n                            text="Enter Stock:"\n                        /><Input\n                            id="idStockFilterValue"\n                            value=""\n                            placeholder="Enter Stock"\n                        /></VBox><VBox\n                        id="idGenreFilter"\n                        class="sapUiSmallMarginEnd"\n                    ><Label\n                            id="idGenreFilterLabel"\n                            text="Genre:"\n                        /><Input\n                            id="idGenreFilterValue"\n                            value=""\n                            placeholder="Enter Genre"\n                        /></VBox><VBox\n                        id="idGoButton"\n                        class="sapUiSmallMarginEnd"\n                    ><Label\n                            id="idGoButtonLabel"\n                            text=""\n                        /><Button\n                            id="idGoButtonValue"\n                            text="Filter"\n                            type="Emphasized"\n                            press="onGoPress"\n                        /></VBox><VBox\n                        id="idClearFilterButton"\n                        class="sapUiSmallMarginEnd"\n                    ><Label\n                            id="idClearFilterButtonLabel"\n                            text=""\n                        /><Button\n                            id="idClearFilterButtonValue"\n                            text="Clear Filter"\n                            type="Emphasized"\n                            press="onClearFilterPress"\n                        /></VBox></HBox></f:DynamicPageHeader></f:header><f:content><Table\n                id="idBooksTable"\n                mode="SingleSelectMaster"\n                alternateRowColors="true"\n                items="{/Books}"\n                selectionChange="onSelectBooks"\n            ><headerToolbar><OverflowToolbar id="idBooksTableHeader"><Title\n                            id="idTableHeaderTitle"\n                            text="Books"\n                        /><ToolbarSpacer id="idTableHeaderSpacer" /><Button\n                            id="idBtnCreate"\n                            icon="sap-icon://add"\n                            tooltip="Create Book"\n                            type="Success"\n                            press="onCreateButtonPress"\n                        /><Button\n                            id="idBtnDelete"\n                            icon="sap-icon://delete"\n                            tooltip="Delete Book"\n                            type="Negative"\n                        /></OverflowToolbar></headerToolbar><columns><Column id="idAuthorCol"><Title\n                            id="idAuthorColTitle"\n                            text="ID"\n                        /></Column><Column id="idTitleCol"><Title\n                            id="idTitleColTitle"\n                            text="Title"\n                        /></Column><Column id="idStockCol"><Title\n                            id="idStockColTitle"\n                            text="Stock"\n                        /></Column><Column id="idPhoneCol"><Title\n                            id="idPhoneColTitle"\n                            text="Genre"\n                        /></Column><Column id="idautorCol"><Title\n                            id="idauthorColTitle"\n                            text="Author"\n                        /></Column></columns><items><ColumnListItem\n                        id="idBooksTableColListItem"\n                        type="Navigation"\n                    ><cells><Text\n                                id="idIDColValue"\n                                text="{ID}"\n                            /><Text\n                                id="idTitleColValue"\n                                text="{title}"\n                            /><Text\n                                id="idStockColValue"\n                                text="{stock}"\n                            /><Text\n                                id="idPhoneColValue"\n                                text="{genre}"\n                            /><Text\n                                id="idauthorColValue"\n                                text="{author}"\n                            /></cells></ColumnListItem></items></Table></f:content></f:DynamicPage></mvc:View>\n'
}});