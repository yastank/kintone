(function() {
    "use strict";

    var get = function(url, param) {
        return kintone.api(kintone.api.url(url, true), "GET", param)
        .then(function(resp) {
            return resp;
        });
    };

    var getApps = function(allApps, offset, limit) {
        return get("/k/v1/apps", {offset: offset, limit: limit})
        .then(function(resp) {
            var apps = resp.apps;

            if (apps.length === 0) {
                return allApps;
            }

            Array.prototype.push.apply(allApps, apps);
            return getApps(allApps, offset + limit, limit);
        });
    };

    var getAppInfo = function(appId) {
        return get("/k/v1/app", {id: appId})
        .then(function(resp) {
            return resp;
        });
    };

    var getForm = function(appId, isPreview) {

        var url = "/k/v1/form";
        if (isPreview) {
            url = "/k/v1/preview/form";
        }

        return get(url, {app: appId})
        .then(function(resp) {
            return resp.properties;
        });
    };


    var getField = function(appId, isPreview) {

        var url = "/k/v1/app/form/fields";
        if (isPreview) {
            url = "/k/v1/preview/app/form/fields";
        }

        return get(url, {app: appId})
        .then(function(resp) {
            return resp.properties;
        });
    };

    var getLayout = function(appId, isPreview) {

        var url = "/k/v1/app/form/layout";
        if (isPreview) {
            url = "/k/v1/preview/app/form/layout";
        }

        return get(url, {app: appId})
        .then(function(resp) {
            return resp.layout;
        });
    };

    var getView = function(appId) {
        return get("/k/v1/app/views", {app: appId})
        .then(function(resp) {
            return resp.views;
        });
    };

    var getAppAcl = function(appId) {
        return get("/k/v1/app/acl", {app: appId})
        .then(function(resp) {
            return resp.rights;
        });
    };

    var getRecordAcl = function(appId) {
        return get("/k/v1/record/acl", {app: appId})
        .then(function(resp) {
            return resp.rights;
        });
    };

    var getFieldAcl = function(appId) {
        return get("/k/v1/field/acl", {app: appId})
        .then(function(resp) {
            return resp.rights;
        });
    };

    var getCustomize = function(appId) {
        return get("/k/v1/app/customize", {app: appId})
        .then(function(customizeInfo) {
            return customizeInfo;
        });
    };

    var getSpace = function(spaceId) {
        return get("/k/v1/space", {id: spaceId})
        .then(function(spaceInfo) {
            return spaceInfo;
        });
    };

    var getAllAppInfos = function(appInfos, appIds, index) {
        var appId = appIds[index];
        return getAppInfo(appId)
        .then(function(appInfo) {
            appInfos[appId] = appInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return appInfos;
            }

            return getAllAppInfos(appInfos, appIds, ix);
        });
    };

    var getAllFields = function(fieldInfos, appIds, index) {
        var appId = appIds[index];
        return getField(appId)
        .then(function(fieldInfo) {
            fieldInfos[appId] = fieldInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return fieldInfos;
            }

            return getAllFields(fieldInfos, appIds, ix);
        });
    };

    var getAllLayouts = function(layoutInfos, appIds, index) {
        var appId = appIds[index];
        return getLayout(appId)
        .then(function(layoutInfo) {
            layoutInfos[appId] = layoutInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return layoutInfos;
            }

            return getAllLayouts(layoutInfos, appIds, ix);
        });
    };

    var getAllViews = function(viewInfos, appIds, index) {
        var appId = appIds[index];
        return getView(appId)
        .then(function(viewInfo) {
            viewInfos[appId] = viewInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return viewInfos;
            }

            return getAllViews(viewInfos, appIds, ix);
        });
    };

    var getAllAppAcls = function(aclInfos, appIds, index) {
        var appId = appIds[index];
        return getAppAcl(appId)
        .then(function(aclInfo) {
            aclInfos[appId] = aclInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return aclInfos;
            }

            return getAllAppAcls(aclInfos, appIds, ix);
        });
    };

    var getAllRecordAcls = function(aclInfos, appIds, index) {
        var appId = appIds[index];
        return getRecordAcl(appId)
        .then(function(aclInfo) {
            aclInfos[appId] = aclInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return aclInfos;
            }

            return getAllRecordAcls(aclInfos, appIds, ix);
        });
    };

    var getAllFieldAcls = function(aclInfos, appIds, index) {
        var appId = appIds[index];
        return getFieldAcl(appId)
        .then(function(aclInfo) {
            aclInfos[appId] = aclInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return aclInfos;
            }

            return getAllFieldAcls(aclInfos, appIds, ix);
        });
    };

    var getAllCustomizes = function(customInfos, appIds, index) {
        var appId = appIds[index];
        return getCustomize(appId)
        .then(function(customInfo) {
            customInfos[appId] = customInfo;

            var ix = index + 1;
            if (ix === appIds.length) {
                return customInfos;
            }

            return getAllCustomizes(customInfos, appIds, ix);
        });
    };

    var getAllSpaces = function(spaceInfos, spaceIds, index) {
        var spaceId = spaceIds[index];
        return getSpace(spaceId)
        .then(function(spaceInfo) {
            spaceInfos[spaceId] = spaceInfo;

            var ix = index + 1;
            if (ix === spaceIds.length) {
                return spaceInfos;
            }

            return getAllSpaces(spaceInfos, spaceIds, ix);
        });
    };

    /**
     * ユーザーが閲覧権限を持つ、すべてのアプリの情報を取得する
     */
    var getAllApps = function() {
        return getApps([], 0, 100);
    };

    var getAppInfos = function(appIds) {
        return getAllAppInfos({}, appIds, 0);
    };

    var getFields = function(appIds) {
        return getAllFields({}, appIds, 0);
    };

    var getLayouts = function(appIds) {
        return getAllLayouts({}, appIds, 0);
    };

    var getViews = function(appIds) {
        return getAllViews({}, appIds, 0);
    };

    var getAppAcls = function(appIds) {
        return getAllAppAcls({}, appIds, 0);
    };

    var getRecordAcls = function(appIds) {
        return getAllRecordAcls({}, appIds, 0);
    };

    var getFieldAcls = function(appIds) {
        return getAllFieldAcls({}, appIds, 0);
    };

    var getCustomizes = function(appIds) {
        return getAllCustomizes({}, appIds, 0);
    };

    var getSpaces = function(spaceIds) {
        return getAllSpaces([], spaceIds, 0);
    };

    var getFieldByType = function(filedType, properties) {
        var fields = [];
        for (var fieldCd in properties) {
            if (properties[fieldCd].type === filedType) {
                fields.push(properties[fieldCd]);
            }
        }
        return fields;
    };

    var getSpacers = function(layouts) {
        var spaces = [];
        for (var ix = 0; ix < layouts.length; ix++) {
            var layout = layouts[ix];
            if (layout.type === 'ROW') {
                for (var iy = 0; iy < layout.fields.length; iy++) {
                    var field = layout.fields[iy];
                    if (field.type === 'SPACER') {
                        spaces.push(field);
                    }
                }
            } else if (layout.type === 'GROUP') {
                var layoutsInGrp = layout.layout;
                for (var iy = 0; iy < layoutsInGrp.length; iy++) {
                    var layoutInGrp = layoutsInGrp[iy];
                    for (var iz = 0; iz < layoutInGrp.fields.length; iz++) {
                        var fieldInGrp = layoutInGrp.fields[iz];
                        if (fieldInGrp.type === 'SPACER') {
                            spaces.push(fieldInGrp);
                        }
                    }
                }
            }
        }
        return spaces;
    };

    window.kintoneSystemUtility = window.kintoneSystemUtility || {};
    window.kintoneSystemUtility.app = window.kintoneSystemUtility.app || {};
    window.kintoneSystemUtility.app.getAll = getAllApps;
    window.kintoneSystemUtility.app.getInfo = getAppInfo;
    window.kintoneSystemUtility.app.getInfos = getAppInfos;
    window.kintoneSystemUtility.app.getField = getField;
    window.kintoneSystemUtility.app.getFields = getFields;
    window.kintoneSystemUtility.app.getForm = getForm;
    window.kintoneSystemUtility.app.getLayout = getLayout;
    window.kintoneSystemUtility.app.getLayouts = getLayouts;
    window.kintoneSystemUtility.app.getView = getView;
    window.kintoneSystemUtility.app.getViews = getViews;
    window.kintoneSystemUtility.app.getAppAcl = getAppAcl;
    window.kintoneSystemUtility.app.getAppAcls = getAppAcls;
    window.kintoneSystemUtility.app.getRecordAcl = getRecordAcl;
    window.kintoneSystemUtility.app.getRecordAcls = getRecordAcls;
    window.kintoneSystemUtility.app.getFieldAcl = getFieldAcl;
    window.kintoneSystemUtility.app.getFieldAcls = getFieldAcls;
    window.kintoneSystemUtility.app.getCustomize = getCustomize;
    window.kintoneSystemUtility.app.getCustomizes = getCustomizes;

    window.kintoneSystemUtility.space = window.kintoneSystemUtility.space || {};
    window.kintoneSystemUtility.space.getInfo = getSpace;
    window.kintoneSystemUtility.space.getInfos = getSpaces;

    window.kintoneSystemUtility.json = window.kintoneSystemUtility.json || {};
    window.kintoneSystemUtility.json.getFieldByType = getFieldByType;
    window.kintoneSystemUtility.json.getSpacers = getSpacers;
})();
