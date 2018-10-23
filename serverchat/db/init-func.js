db.system.js.save({
    _id: 'isValidObjectId',
    value: function (obj) {
        if (!isNullOrUndefined(obj) && obj.length == 24)
            return /^[0-9a-fA-F]+$/.test(obj);
        return false;
    }
});
db.system.js.save({
    _id: 'isNullOrUndefined',
    value: function (obj) {
        return obj === undefined || obj == null;
    }
});
db.system.js.save({
    _id: 'getYearId',
    value: function () {
        var d = new Date();
        return d.getFullYear();
    }
});
db.system.js.save({
    _id: "convertNumber",
    value: function (numb) {
        if (numb != '' && numb != NaN)
            numb = parseFloat(numb);
        else
            numb = 0;
        return numb;
    }
});
db.system.js.save({
    _id: "getFloat",
    value: function (numb) {
        if (numb == undefined || numb == '') numb = 0;
        else numb = parseFloat(numb);
        return numb;
    }
});
db.system.js.save({
    _id: "getUserId",
    value: function (user) {
        var userid = "";
        if (user != undefined && user != '') {
            userid = user._id == undefined ? "" : user._id;
        }
        return userid.toString();
    }
});
db.system.js.save({
    _id: "getVal",
    value: function (val) {
        return val == undefined ? "" : val;
    }
});
db.system.js.save({
    _id: "getRootId",
    value: function (user) {
        var userid = "";
        if (user != undefined && user != '') {
            userid = user.rootid == undefined ? "" : user.rootid;
            if (userid == "") userid = getUserId(user);
        }
        return userid.toString();
    }
});
db.system.js.save({
    _id: 'getTimeDay',
    value: function (date) {
        var d = new Date();
        var d1 = d.getDate();
        var d2 = d1.toString();
        if (d1 < 10)
            d2 = '0' + d1.toString();
        var m1 = d.getMonth() + 1;
        var m2 = m1.toString();
        if (m1 < 10)
            m2 = '0' + m1.toString();
        var y1 = d.getFullYear();
        var d3 = new Date(y1.toString() + '-' + m2 + '-' + d2);
        var da = d3.getTime();
        return da;
    }
});
db.system.js.save({
    _id: 'getDateTotime',
    value: function (date) {
        if (date == undefined || date == '') return 0;
        var d = date.split("-");
        var d1 = parseFloat(d[0]);
        if (d1 < 10)
            d1 = '0' + d1.toString();
        var d2 = parseFloat(d[1]);
        if (d2 < 10)
            d2 = '0' + d2.toString();
        var d3 = d[2];
        var tdate = d3 + '-' + d2 + '-' + d1;
        var dt = new Date(tdate);
        return dt.getTime();
    }
});
db.system.js.save({
    _id: 'convertDateTotime',
    value: function (date) {
        if (date == undefined || date == '') return 0;
        var d = date.split("/");
        if (d.length > 1) {
            var d1 = parseInt(d[0]);
            if (d1 < 10)
                d1 = '0' + d1.toString();
            var d2 = parseInt(d[1]);
            if (d2 < 10)
                d2 = '0' + d2.toString();
            var d3 = d[2];
            var tdate = d3 + '-' + d2 + '-' + d1;
            var dt = new Date(tdate);
            return dt.getTime();
        } else {
            var p = date.split("-");
            if (p.length > 1) {
                var d1 = parseFloat(p[0]);
                var ds1 = d1.toString();
                if (d1 < 10)
                    ds1 = '0' + d1.toString();
                var m1 = parseFloat(p[1]);
                var mo1 = m1.toString();
                if (m1 < 10)
                    mo1 = '0' + m1.toString();
                var y = p[2];
                var dr = y + '-' + mo1 + '-' + ds1;
                var timer = new Date(dr).getTime();
                return timer;
            } else {
                return 0;
            }
        }
    }
});
db.system.js.save({
    _id: 'getTimeToDate',
    value: function (time) {
        var d = new Date(time);
        var day = d.getDay();
        var md = d.getMonth() + 1;
        var year = d.getFullYear();
        var days = day.toString();
        if (day < 10)
            days = '0' + day.toString();
        var mds = md.toString();
        if (md < 10)
            mds = '0' + md.toString();
        return days + '-' + mds + '-' + year.toString();
    }
});
db.system.js.save({
    _id: 'getDayOfMonth',
    value: function (m, y) {
        var day = 0;
        if (m == undefined || m == '') m = d.getMonth() + 1;
        else m = parseFloat(m);
        if (y == undefined || y == '') y = d.getFullYear();
        else y = parseFloat(y);
        switch (m) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                day = 31;
                break;
            case 3:
            case 6:
            case 9:
            case 11:
                day = 30;
                break;
            default:
                if (y % 4 == 0 || y % 100 == 0) {
                    day = 29;
                } else {
                    day = 28;
                }
        }
        return day;
    }
});
db.system.js.save({
    _id: 'getMonth',
    value: function (date) {
        if (date == undefined || date == '') {
            var d = new Date();
            var m1 = d.getMonth() + 1;
            return getFloat(m1);
        } else {
            var p = date.split("-");
            var m2 = p[1];
            return getFloat(m2);
        }
    }
});
db.system.js.save({
    _id: 'getDate',
    value: function (date) {
        if (date == undefined || date == '') {
            var d = new Date();
            var m1 = d.getDate();
            return getFloat(m1);
        } else {
            var p = date.split("-");
            var m2 = p[0];
            return getFloat(m2);
        }
    }
});
db.system.js.save({
    _id: 'getEmployeeCode',
    value: function (skuauto) {
        var employeecode = '';
        if (skuauto >= 1000000 && skuauto < 10000000) {
            employeecode = '0' + skuauto.toString();
        } else if (skuauto >= 100000 && skuauto < 1000000) {
            employeecode = '00' + skuauto.toString();
        } else if (skuauto >= 10000 && skuauto < 100000) {
            employeecode = '000' + skuauto.toString();
        } else if (skuauto >= 1000 && skuauto < 10000) {
            employeecode = '0000' + skuauto.toString();
        } else if (skuauto >= 100 && skuauto < 1000) {
            employeecode = '00000' + skuauto.toString();
        } else if (skuauto >= 10 && skuauto < 100) {
            employeecode = '000000' + skuauto.toString();
        } else if (skuauto < 10) {
            employeecode = '0000000' + skuauto.toString();
        } else {
            employeecode = skuauto.toString();
        }
        return employeecode;
    }
});
/**
* @function actions
* @version
* @param pageid, pwdid, email
*/
db.system.js.save({
    _id: 'getSkuAuto',
    value: function (tablename, state, rootid, companyid, blockid) {
        var sku = state == undefined ? "" : state.skuauto == undefined ? "" : state.skuauto;
        if (sku == '') {
            var condition = {};
            if (rootid != undefined && rootid != '') {
                if (typeof rootid == 'object') condition.rootid = rootid;
                else condition.rootid = ObjectId(rootid);
            }
            if (companyid != undefined && companyid != '') {
                if (typeof companyid == 'object') condition.companyid = companyid;
                else condition.companyid = ObjectId(companyid);
            }
            if (blockid != undefined && blockid != '') {
                if (typeof blockid == 'object') condition.blockid = blockid;
                else condition.blockid = ObjectId(blockid);
            }
            var skus = db.getCollection(tablename).find(condition).sort({ skuauto: -1 }).limit(1).toArray();
            if (skus != undefined && skus != '') {
                var skua = skus[0] == undefined ? "" : (skus[0].skuauto == undefined ? "" : skus[0].skuauto);
                if (skua == '') { sku = 1; }
                else sku = getFloat(skua) + 1;
            } else {
                sku = 1;
            }
        } else {
            sku = getFloat(sku) + 1;
        }
        return sku;
    }
});
//
/**
* @function getItemGid
* @version
* @param gid
*/
db.system.js.save({
    _id: 'getItemGid',
    value: function (gid) {
        var gids = gid == undefined ? "" : gid;
        if (gids =='') gids = 0;
        var condition = {};
        condition.gid = { $lte: getFloat(gids) };
        var data = db.accounts_groups.find(condition).toArray();
        return data;
    }
});
//
/**
* @function getAccountGroup
* @version
* @param gid
*/
db.system.js.save({
    _id: 'getAccountGroup',
    value: function (params) {   
        var user = params.user;
        var rootid = getRootId(user);
        var userid = getUserId(user);
        var result = { data: [], total: 0, msg: "", error: 0, task: "", obj: {} };
        if (userid != '') {
            var gid = user.gid == undefined ? "" : user.gid;
            if (gid == '') gid = 0;
            result.data = getItemGid(gid);             
        } else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
//var gid = user.gid;
/**
* @function getEmployeeInfo
* @version
* @param gid
*/
db.system.js.save({
    _id: 'getEmployeeInfo',
    value: function (user) {                                                 
        if (user != undefined && user != '') {
            var depid = user.depid == undefined ? "" : user.depid;
            var blockid = user.blockid == undefined ? "" : user.blockid;
            var companyid = user.companyid == undefined ? "" : user.companyid;
            var rootid = getRootId(user);
            var condition = {};
            if (depid != '') {
                condition.depid = ObjectId(depid);
            }
            if (blockid != '') {
                condition.blockid = ObjectId(blockid);
            }
            if (companyid != '') {
                condition.companyid = ObjectId(companyid);
            }
            if (rootid != '') {
                condition.rootid = ObjectId(rootid);
            }
            var gid = user.gid == undefined ? "" : user.gid;
            if (gid == '') gid = 0;
            condition.gid = { $gt: getFloat(gid) };
            var employee = db.employees_accounts.findOne(condition);
            if (employee == undefined || employee == '') {
                employee = { _id: "", fullname: "", avatar: "", sku: "" };
            } 
            return employee;
        } else {
            return { _id: "", fullname: "", avatar: "", sku: "" };
        }
    }
});
/**
* @function trash
* @version
* @param pageid, pwdid, email
*/
db.system.js.save({
    _id: 'trashData',
    value: function (tablename, objid, rootid) {
        if (rootid != undefined && rootid != '' && objid != undefined && objid != '') {
            var condition = {};
            condition._id = ObjectId(objid);
            condition.rootid = ObjectId(rootid);
            if (companyid != undefined && companyid != '') condition.companyid = ObjectId(companyid);
            db.getCollection(tablename).update(condition, { $set: { trash: 1 } });
            return true;
        } else {
            return false;
        }
    }
});
/**
* @function recovery
* @version
* @param pageid, pwdid, email
*/
db.system.js.save({
    _id: 'recoveryData',
    value: function (tablename, objid, rootid) {
        if (rootid != undefined && rootid != '' && objid != undefined && objid != '') {
            var condition = {};
            condition._id = ObjectId(objid);
            condition.rootid = ObjectId(rootid);
            if (companyid != undefined && companyid != '') condition.companyid = ObjectId(companyid);
            db.getCollection(tablename).update(condition, { $set: { trash: 0 } });
            return true;
        } else {
            return false;
        }
    }
});
/**
* @function removeData
* @version
* @param
*/
db.system.js.save({
    _id: 'removeData',
    value: function (tablename, objid, rootid) {
        if (rootid != undefined && rootid != '' && objid != undefined && objid != '') {
            var condition = {};
            condition._id = ObjectId(objid);
            condition.rootid = ObjectId(rootid);
            if (companyid != undefined && companyid != '') condition.companyid = ObjectId(companyid);
            db.getCollection(tablename).remove(condition);
            return true;
        } else {
            return false;
        }
    }
});
/**
* @function insertData
* @version
* @param pageid, pwdid, email
*/
db.system.js.save({
    _id: 'insertData',
    value: function (tablename, obj) {
        var row = db.getCollection(tablename).insert(obj);
        if (row.nUpserted == 1 || row.nModified == 1) {
            return true;
        } else {
            return false;
        }
    }
});
/**
* @function updateData
* @version
* @param pageid, pwdid, email
*/
db.system.js.save({
    _id: 'updateData',
    value: function (tablename, condition, obj) {
        var row = db.getCollection(tablename).update(condition, { $set: obj });
        if (row.nMatched == 1 || row.nModified == 1) {
            return true;
        } else {
            return false;
        }
    }
});
/**
* @function getObjectInfo
* @version
* @param
*/
db.system.js.save({
    _id: 'getObjectInfo',
    value: function (tablename, condition, fields) {
        var row = {};
        if (fields != undefined && fields != '') {
            row = db.getCollection(tablename).findOne(condition, fields);
        } else {
            row = db.getCollection(tablename).findOne(condition);
        }
        return row;
    }
});
/**
* @function getBusiness
* @version
* @param
*/
db.system.js.save({
    _id: 'getBusiness',
    value: function (params) {
        var user = params.user;
        var rootid = getRootId(user);
        var userid = getUserId(user);
        var result = { data: [], total: 0, msg: "", error: 0, task: "", obj: {}  };
        if (userid != '') {
            var condition = {};
            var fields = params.fields == undefined ? "" : params.fields;
            if (fields != undefined && fields != '') {
                result.data = db.business.find(condition, fields).toArray();
            } else {
                result.data = db.business.find(condition).toArray();
            }
        } else {

        }
        return result;
    }
});

/**
* @function getTypeMoney
* @version
* @param
*/
db.system.js.save({
    _id: 'getTypeMoney',
    value: function (params) {
        var user = params.user;
        var rootid = getRootId(user);
        var userid = getUserId(user);
        var result = { data: [], total: 0, msg: "", error: 0, task: "", obj: {} };
        if (userid != '') {
            result.data = db.moneys_types.find({}).toArray();             
        }
        return result;
    }
});
/**
* @function getUnits
* @version
* @param
*/
db.system.js.save({
    _id: 'getUnits',
    value: function (params) {
        var user = params.user;
        var rootid = getRootId(user);
        var userid = getUserId(user);
        var result = { data: [], total: 0, msg: "", error: 0, task: "", obj: {} };
        if (userid != '') {
            var fields = params.fields == undefined ? "" : params.fields;
            var condition = {};
            condition.rootid = ObjectId(rootid);
            if (fields != undefined && fields != '') {
                result.data = db.units.find(condition, fields).toArray();
            } else {
                result.data = db.units.find(condition).toArray();
            }
        } else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
//validatePassword
db.system.js.save({
    _id: 'validatePassword',
    value: function (params) {
        var email = params.email;
        var pwdid = params.pwd;
        var row = db.users.findOne({ email: email, pwdid: pwdid });
        if (row != undefined && row != '') {
            return row;
        } else {
            return false;
        }
    }
});
/**
 * @function userLogs
 * @version
 * @param pageid, pwdid, email
 */
db.system.js.save({
    _id: 'userLogs',
    value: function (obj) {
        var d = new Date();
        var time = d.getTime();
        obj.createDate = time;
        return db.users_logs.insert(obj);
    }
});
/**
 * @function 
 * @validatePassword
 * @version
 * @param pageid, pwdid, email
 */
db.system.js.save({
    _id: 'validateUserServerLogin',
    value: function (params) {
        function getUserLogin(obj) {
            var d = new Date();
            var codition = {};
            codition.pwdid = obj.pwd;
            codition.email = obj.email;
            codition.published = 1;
            codition.verifies = 2;
            codition.keyCheck = obj.keyCheck;
            // codition.gid = { $gte: 6 };
            var user = db.users.findOne(codition);
            if (user != undefined && user != '') {
                var emid = user._id == undefined ? "" : user._id;
                var objs = {};
                objs.lastEdit = d.getTime();
                objs.device = parseFloat(obj.device);
                objs.ip = obj.ip;
                objs.online = 1;
                db.users.update({ '_id': emid }, { $set: objs });
                user.online = 1;
                user.device = objs.device;
                user.lastEdit = objs.lastEdit;
                user.pwdid = "";
                user.keyCheck = "";
            } else {
                user = '';
            }
            return user;
        }
        var result = {};
        var d = new Date();
        var keyCheck = params.keyCheck;
        var actions = {};
        actions.sessionid = params.sessionid;
        actions.ip = params.ip;
        actions.ipserver = params.ipserver;
        actions.task = 'Login';
        actions.email = params.user.email;
        actions.local = params.local;
        actions.device = getFloat(params.device);
        if (isNullOrUndefined(keyCheck)) return false;
        var obj = { pwd: params.pwd, email: params.user.email, keyCheck: params.keyCheck, device: params.device, ip: params.ip };
        result = getUserLogin(obj);
        userLogs(actions);
        return result;
    }
});
/**
 * @function JLogoutAdmin
 * @version
 * @param pageid, pwdid, email
 */
db.system.js.save({
    _id: 'JLogoutAdmin',
    value: function (params) {
        db.users.update({ '_id': ObjectId(params.user._id) }, { $set: { 'online': 0 } });
        return params.user;
    }
});
/**
 * @function JLogout
 * @version
 * @param pageid, pwdid, email
 */
db.system.js.save({
    _id: 'JLogout',
    value: function (params) {
        db.customers.update({ '_id': ObjectId(params.user._id) }, { $set: { 'online': 0 } });
        db.employees_accounts.update({ '_id': ObjectId(params.user._id) }, { $set: { 'online': 0 } });
        return params.user;
    }
});
/**
 * @function getUserApps
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getUserApps',
    value: function (user) {
        var userid = getUserId(user);
        var rootId = getRootId(user);
        var condition = {};
        var state = {
            defaultComponent: []
        };
        if (rootId != '') {
            var conditionCom = {};
            conditionCom.published = 1;
            var defaultComponent = db.components_roots.find(conditionCom).toArray();
            if (defaultComponent) {
                defaultComponent.forEach(function (row) {
                    var conditionComponent = {};
                    //if (typeof rootId == 'object') {
                    //    conditionComponent.rootid = ObjectId(rootId);
                    //} else {
                    //    conditionComponent.rootid = rootId;
                    //}
                    conditionComponent.rootcomponentid = row._id;
                    row.components = db.components.find(conditionComponent, { _id: 1, newurl: 1, title: 1, newkey: 1, option: 1, view: 1, icon: 1, rootcomponentid: 1, rootcomponentname: 1, rootcomponentnewkey: 1, rootcomponentnewurl: 1, rootcomponenticon: 1, childrens: 1 }).toArray();
                });
            }
            state.defaultComponent = defaultComponent;
        }
        return state;
    }
});
/**
 * @function getActionType
 * @version
 * @param 
    */
db.system.js.save({
    _id: 'getActionType',
    value: function () {
        return db.actions_types.find({}).toArray();
    }
});
//addActions
db.system.js.save({
    _id: 'addActions',
    value: function (params, obj) {
        var user = params.user;
        var rootid = getRootId(user);
        var userid = getUserId(user);
        obj.sessionid = params.sessionid == undefined ? "" : params.sessionid;
        obj.ip = params.ip == undefined ? "" : params.id;
        obj.ipserver = params.ipserver == undefined ? "" : params.ipserver;
        obj.task = params.task == undefined ? "" : params.task;
        obj.option = params.option == undefined ? "" : params.option;
        obj.view = params.view == undefined ? "" : params.view;
        obj.pwd = params.user.pwd == undefined ? "" : params.user.pwd;
        obj.email = params.user.email == undefined ? "" : params.user.email;
        obj.local = params.local == undefined ? "" : params.local;
        obj.device = parseFloat(params.device);
        obj.userid = ObjectId(userid);
        obj.username = user.fullname ? "" : user.fullname;
        obj.avatar = user.avatar == undefined ? "" : user.avatar;
        obj.rootid = ObjectId(rootid);
        var d = new Date();
        var time = d.getTime();
        obj.createDate = time;
        return db.actions.insert(obj);
    }
});
/**
 * @function
 * @getActions
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getActions',
    value: function (params) {
        var user = params.user;
        var rootid = getRootId(user);
        var userid = getUserId(user);
        var result = { data: [], total: 0, error: 0, msg: "" };
        if (userid != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;

            var strSearch = '', companyid = '', blockid = '', depid = '', employeeid = '';
            var search = params.search;
            if (search != undefined && search != null) {
                strSearch = search.txtsearch == undefined ? '' : search.txtsearch;
                companyid = search.companyid == undefined ? '' : search.companyid;
                blockid = search.blockid == undefined ? '' : search.blockid;
                depid = search.depid == undefined ? '' : search.depid;
                employeeid = search.employeeid == undefined ? '' : search.employeeid;

            }
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            condition.rootid = ObjectId(rootid);
            if (strSearch != '') {
                condition.title = whereNE;
            }
            if (companyid != '') {
                condition.companyid = ObjectId(companyid);
            }
            if (blockid != '') {
                condition.blockid = ObjectId(blockid);
            }
            if (depid != '') {
                condition.depid = ObjectId(depid);
            }
            if (employeeid != '') {
                condition.userid = ObjectId(employeeid);
            }
            result.total = db.actions.count(condition);
            if (unlimit == 2)
                result.data = db.actions.find(condition).sort({ '_id': -1 }).toArray();
            else
                result.data = db.actions.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();
        } else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/**
* @function validateUserLogin
* @version
* @param pageid, pwdid, email
*/
db.system.js.save({
    _id: 'validateUserLogin',
    value: function (params) {
        //var result = "";
        var d = new Date();
        //var keyCheck = params.keyCheck;
        var actions = {};
        actions.sessionid = params.sessionid;
        actions.ip = params.ip;
        actions.ipserver = params.ipserver;
        actions.task = 'Login';
        actions.pwdid = params.user.pwd;
        actions.email = params.user.email;
        actions.local = params.local;
        actions.device = getFloat(params.device);
        userLogs(actions);
        var codition = {};
        codition.pwdid = params.pwd;
        codition.email = params.user.email;
        codition.published = 1;
        codition.verifies = 2;
        var d = new Date();
        var state = db.employees_accounts.findOne(codition);
        if (state == undefined || state == '') {
            state = db.customers.findOne(codition);
            var company = db.companys.findOne({ rootid: state._id });
            state.companyid = company._id;
            state.companysku = company.skuauto;
            state.companylogo = company.logo == undefined ? "" : company.logo;
            state.domain = company.domain;     
        }
        var objs = {};
        objs.lastEdit = d.getTime();
        objs.device = parseFloat(params.device);
        objs.ip = params.ip;
        if (state) {
            objs.online = 1;
            state.online = 1;
            db.employees_accounts.update({ '_id': state._id }, { $set: objs });
            state.device = objs.device;
            state.lastEdit = objs.lastEdit;
            state.pwdid = "";
            state.keyid = "";
        }
        return state;
    }
});

db.system.js.save({
    _id: 'validateUserPCLogin',
    value: function (params) {
        //var result = "";
        var d = new Date();
        //var keyCheck = params.keyCheck;
        var actions = {};
        actions.sessionid = params.sessionid;
        actions.ip = params.ip;
        actions.ipserver = params.ipserver;
        actions.task = 'Login';
        actions.pwdid = params.user.pwd;
        actions.email = params.user.email;
        actions.local = params.local;
        actions.device = getFloat(params.device);
        userLogs(actions);
        var codition = {};
        codition.pwdid = params.pwd;
        codition.email = params.user.email;
        codition.published = 1;
        codition.verifies = 2;
        var d = new Date();
        var state = db.employees_accounts.findOne(codition);
        if (state == undefined || state == '') {
            state = db.customers.findOne(codition);
            var company = db.companys.findOne({ rootid: state._id });
            state.companyid = company._id;
            state.companysku = company.skuauto;
            state.companylogo = company.logo == undefined ? "" : company.logo;
            state.domain = company.domain;
            state.rootid = state._id;
        }
        var objs = {};
        objs.lastEdit = d.getTime();
        objs.device = parseFloat(params.device);
        objs.ip = params.ip;
        if (state) {
            objs.online = 1;
            state.online = 1;
            db.employees_accounts.update({ '_id': state._id }, { $set: objs });
            state.device = objs.device;
            state.lastEdit = objs.lastEdit;
            state.pwdid = "";
            state.keyid = "";
        }
        return state;
    }
});
//-------------------------- checkApikey --------------------------------
db.system.js.save({
    _id: "checkApikey",
    value: function (params) {
        var secretId = params.secretId == undefined ? "" : params.secretId;
        var apikey = params.apikey == undefined ? "" : params.apikey;
        var result = {
            error: 1, data: {}, msg: ""
        };
        if (params.task == 'verify') {
            result.msg = "Bạn chưa kích hoạt tài khoản phần mềm";
        } else {
            result.msg = "Bạn chưa kích hoạt tài khoản phần mềm";
        }
        if (secretId != '' && apikey != '') {
            var condition = {};
            condition.secretId = secretId;
            condition.apiKey = apikey;
            result.condition = condition;
            var row = db.components_apikeys.findOne(condition);
            if (row != undefined && row != '') {
                result.data = row;
                result.error = 0;
                result.msg = "Thanks!";
                if (params.task == 'verify') {
                    result.msg = "Xác nhận thành công!";
                }
            } else {
                result.error = 1;
                if (params.task == 'verify') {
                    result.msg = "Xác nhận không thành công!";
                }
            }

        }
        return result;
    }
});
//-------------------------- verifyApikey --------------------------------
db.system.js.save({
    _id: "verifyApikey",
    value: function (params) {
        var secretId = params.data.secretid == undefined ? "" : params.data.secretid;
        var apikey = params.data.apikey == undefined ? "" : params.data.apikey;
        var result = {
            error: 1, data: {}, msg: ""
        };
        if (secretId != '' && apikey != '') {
            var condition = {};
            condition.secretId = secretId;
            condition.apiKey = apikey;
            //result.condition = condition;
            var row = db.components_apikeys.findOne(condition);
            if (row != undefined && row != '') {
                var d = new Date();
                db.customers.update(condition, { $set: { published: 1, verifies: 2, lastEdit: d.getTime() } });
                result.data = row;
                result.error = 0;
                result.msg = "Xác nhận thành công!";
            } else {
                result.error = 1;
                result.msg = "Xác nhận không thành công!";
            }
        }
        return result;
    }
});
//-------------------------- setTaskUser --------------------------------
db.system.js.save({
    _id: "setTaskUser",
    value: function (user, obj) {
        var userid = user._id == undefined ? "" : user._id;
        var username = user.fullname == undefined ? "" : user.fullname;
        var avatar = user.avatar == undefined ? "" : user.avatar;
        var rootid = getRootId(user);
        if (userid != undefined && userid != ''
            && rootid != undefined && rootid != '') {
            var data = {};
            data._id = new ObjectId();
            data.rootid = ObjectId(rootid);
            data.userid = ObjectId(userid);
            data.username = username;
            data.avatar = avatar;
            var d = new Date();
            data.createDate = d.getTime();
            data.title = obj.title == undefined ? "" : obj.title;
            data.content = obj.content == undefined ? "" : obj.content;
            data.image = obj.image == undefined ? "" : obj.image;

            db.actions_tasks.insert(data);
            return data;
        } else {
            return false;
        }
    }
});
//setNotificationEmployee
db.system.js.save({
    _id: "setNotificationEmployee",
    value: function (user, employee, obj) {
        var userid = user._id == undefined ? "" : user._id;
        var username = user.fullname == undefined ? "" : user.fullname;
        var avatar = user.avatar == undefined ? "" : user.avatar;
        var rootid = getRootId(user);
        var employeeid = employee._id == undefined ? "" : employee._id;
        var employeename = employee.fullname == undefined ? "" : employee.fullname;
        var employeeavatar = employee.avatar == undefined ? "" : employee.avatar;
        var result = { msg: "", error: 0, data: {}, total: 0 };
        if (userid != undefined && userid != '' && employeeid != undefined && employeeid != '') {
            var d = new Date();
            var data = {};
            data._id = new ObjectId();
            data.rootid = ObjectId(rootid);
            data.userid = ObjectId(userid);
            data.username = username;
            data.avatar = avatar;
            data.employeeid = ObjectId(employeeid);
            data.employeename = employeename;
            data.employeeavatar = employeeavatar;
            data.createDate = d.getTime();
            data.title = obj.title == undefined ? "" : obj.title;
            data.content = obj.content == undefined ? "" : obj.content;
            data.image = obj.image == undefined ? "" : obj.image;
            data.news = 1;
            var objid = obj.objid == undefined ? "" : obj.objid;
            if (objid != '') {
                if (typeof objid == 'object') data.objid = objid;
                else data.objid = ObjectId(objid);
                var conditiondata = {};
                conditiondata.rootid = ObjectId(rootid);
                conditiondata.objid = data.objid;
                conditiondata.employeeid = data.employeeid;
                var rowno = db.employees_notifications.findOne(conditiondata);
                if (rowno == undefined || rowno == '') {
                    db.employees_notifications.insert(data);
                }
            } else {
                data.objid = "";
                db.employees_notifications.insert(data);
            }
            var conditions = {};
            conditions.employeeid = ObjectId(employeeid);
            conditions.rootid = ObjectId(rootid);
            result.total = db.employees_notifications.count(conditions);
            result.data = data;
            //add                                                                           
            if (objid != '') {
                data.lastEdit = d.getTime();
                var rows = db.employees_alerts.findOne({ objid: data.objid, employeeid: data.employeeid, rootid: ObjectId(rootid) });
                if (rows != undefined && rows != '') {
                    db.employees_alerts.update({ objid: data.objid, employeeid: data.employeeid, rootid: ObjectId(rootid) }, { $set: data });
                } else {
                    db.employees_alerts.insert(data);
                }
            }
        }
        return result;
    }
});
/**
* @function getItemComponentApps
* @version
* @param params
*/
db.system.js.save({
    _id: 'getItemComponentApps',
    value: function (params) {
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
        var strSearch = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
        }
        var result = { data: [], total: 0, error: 0, msg: "" };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        result.total = db.components_roots.count(condition);
        if (unlimit == 2)
            result.data = db.components_roots.find(condition).sort({ '_id': 1 }).toArray();
        else
            result.data = db.components_roots.find(condition).sort({ '_id': 1 }).skip(page).limit(numPage).toArray();

        if (result.data) {
            result.data.forEach(function (row) {
                var conditions = {};
                conditions.rootcomponentid = row._id;
                row.listModules = db.core_components.find(conditions).sort({ '_id': 1 }).toArray();
            });
        }
        result.actiontypes = getActionType();
        return result;
    }
});
/**
* @function saveItemComponent
* @version
* @param params
*/
db.system.js.save({
    _id: 'saveItemComponent',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, id: "", msg: "cập nhập thành công", error: 0, task: params.task };
        if (userid != '') {
            var state = params.data;
            var id = state._id == undefined ? "" : state._id;
            var obj = {};
            switch (params.task) {
                case 'save':
                case 'apply':
                case 'saveclose':
                case 'savenew':
                    var opt = state.option;
                    obj.title = state.title;
                    obj.shorttitle = state.shorttitle == undefined ? "" : state.shorttitle;
                    obj.option = opt;
                    var newurl = state.newurl;
                    obj.newurl = newurl;
                    obj.newkey = newurl.replace("/", "");
                    var groupid = state.groupid == undefined ? "" : state.groupid;
                    if (groupid != '') {
                        var group = db.core_groups.findOne({ _id: ObjectId(groupid) });
                        obj.gid = group.gid;
                        obj.groupid = ObjectId(groupid);
                    } else {
                        obj.groupid = "";
                        obj.gid = 4;
                    }
                    var view = state.view == undefined ? opt.replace("com_", "") : state.view;
                    obj.view = view;
                    var icon = state.icon == undefined ? "" : state.icon;
                    if (icon == '') icon = '<i class=\"fa fa-cube fa-fw\" aria-hidden=\"true\"></i>';
                    obj.icon = icon;
                    obj.version = state.version;
                    obj.author = user.fullname;
                    obj.userid = ObjectId(userid);
                    obj.username = user.fullname;
                    obj.published = state.published == undefined ? 0 : getFloat(state.published);
                    var price = state.price == undefined ? 0 : state.price;
                    if (price == "") price = 0;
                    obj.price = parseFloat(price);

                    if (id != '') {
                        db.components_roots.update({ _id: ObjectId(id) }, { $set: obj });
                    } else {
                        var d = new Date();
                        id = new ObjectId();
                        obj.createDate = d.getTime();
                        obj.childrens = [];
                        obj._id = id;
                        db.components_roots.insert(obj);
                    }
                    break;
                case 'publish':
                    var published = params.published == undefined ? "" : params.published;
                    obj.published = getFloat(published);
                    if (id != '') {
                        db.components_roots.update({ _id: ObjectId(id) }, { $set: obj });
                    }
                    break;
            }

            result.id = id;
            var row = getItemComponentApps(params);
            result.data = row.data;
            result.total = row.total;

        }
        return result;
    }
});
/**
 * @function getItemApps
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getItemApps',
    value: function (params) {
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
        var strSearch = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
        }
        var result = { data: [], total: 0, error: 0, msg: "" };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        result.total = db.core_components.count(condition);
        if (unlimit == 2)
            result.data = db.core_components.find(condition).sort({ '_id': 1 }).toArray();
        else
            result.data = db.core_components.find(condition).sort({ '_id': 1 }).skip(page).limit(numPage).toArray();

        result.actiontypes = getActionType();
        return result;
    }
});
/**
 * @function getItemGroups
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getItemGroups',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [] };
        if (userid != '') {
            result.data = db.core_groups.find({}).sort({ '_id': 1 }).toArray();
        }
        return result;
    }
});
/**
* @function saveItemApps
* @version
* @param params
*/
db.system.js.save({
    _id: 'saveItemApps',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, id: "", msg: "cập nhập thành công", error: 0, task: params.task };
        if (userid != '') {
            var state = params.data;
            var rootcomponentid = state.rootcomponentid == undefined ? "" : state.rootcomponentid;
            //rootcomponentid
            if (rootcomponentid != '') {
                var obj = {};
                var id = state._id == undefined ? "" : state._id;
                switch (params.task) {
                    case 'save':
                    case 'savenew':
                    case 'saveclose':
                        obj.title = state.title;
                        var rootcom = db.components_roots.findOne({ _id: ObjectId(rootcomponentid) });
                        obj.rootcomponentid = ObjectId(rootcomponentid);
                        obj.rootcomponentname = rootcom.title;
                        obj.rootcomponentnewurl = rootcom.newurl;
                        obj.rootcomponentoption = rootcom.option;
                        obj.rootcomponentview = rootcom.view;
                        obj.rootcomponentnewkey = rootcom.newkey;
                        obj.rootcomponenticon = rootcom.icon;
                        obj.rootcomponentshorttitle = rootcom.shorttitle;
                        var opt = state.option == undefined ? "" : state.option;
                        if (opt == '') opt = rootcom.option;
                        obj.option = opt;

                        var groupid = state.groupid == undefined ? "" : state.groupid;
                        if (groupid != '') {
                            var group = db.core_groups.findOne({ _id: ObjectId(groupid) });
                            obj.gid = group.gid;
                            obj.groupid = ObjectId(groupid);
                        } else {
                            obj.groupid = "";
                            obj.gid = 4;
                        }
                        var view = state.view == undefined ? opt.replace("com_", "") : state.view;
                        obj.view = view;
                        var icon = state.icon == undefined ? "" : state.icon;
                        if (icon == '') icon = '<i class=\"fa fa-cube fa-fw\" aria-hidden=\"true\"></i>';
                        obj.icon = icon;
                        obj.version = state.version;
                        obj.author = user.fullname;
                        obj.userid = ObjectId(userid);
                        obj.username = user.fullname;
                        obj.published = state.published == undefined ? 0 : getFloat(state.published);
                        var price = state.price == undefined ? 0 : state.price;
                        if (price == "") price = 0;
                        obj.price = parseFloat(price);
                        obj.newurl = rootcom.newkey + '/' + view;
                        obj.newkey = rootcom.newkey + '-' + view;
                        if (id != '') {

                            db.core_components.update({ _id: ObjectId(id) }, { $set: obj });
                        } else {
                            var d = new Date();
                            id = new ObjectId();
                            obj.createDate = d.getTime();
                            obj.childrens = [];
                            obj._id = id;
                            db.core_components.insert(obj);
                        }
                        break;
                    case 'publish':
                        var published = params.published == undefined ? "" : params.published;
                        obj.published = getFloat(published);
                        if (id != '') {
                            db.core_components.update({ _id: ObjectId(id) }, { $set: obj });
                        }
                        result.obj = obj;
                        break;

                }

                result.id = id;
                var row = getItemComponentApps(params);
                result.data = row.data;
                result.total = row.total;
            } else {
                result.msg = "Bạn chưa chọn phân hệ";
                result.error = 1;
            }
        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }
        return result;
    }
});
/**
* @function updateItemApps
* @version
* @param params
*/
db.system.js.save({
    _id: 'updateItemApps',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, id: "", msg: "Cập nhập không thành công", error: 1, task: params.task };
        if (userid != '') {
            var row = params.data;
            var listItem = row.childrens;
            var childrens = [];
            var opt = row.option == undefined ? "" : row.option;
            var newurlp = row.newurl == undefined ? "" : row.newurl;
            var appid = row._id == undefined ? "" : row._id;
            if (appid != '') {
                var option = row.option;
                listItem.forEach(function (state) {
                    var obj = {};
                    obj.title = state.title;
                    obj.option = opt;
                    var groupid = state.groupid == undefined ? "" : state.groupid;
                    if (groupid != '') {
                        var group = db.core_groups.findOne({ _id: ObjectId(groupid) });
                        obj.gid = group.gid;
                        obj.groupid = ObjectId(groupid);
                    } else {
                        obj.groupid = "";
                        obj.gid = 4;
                    }
                    var view = state.view == undefined ? opt.replace("com_", "") : state.view;
                    obj.view = view;
                    var newurl = view;
                    var icon = state.icon == undefined ? "" : state.icon;
                    if (icon == '') icon = '<i class=\"fa fa-cube fa-fw\" aria-hidden=\"true\"></i>';
                    obj.icon = icon;
                    obj.version = state.version;
                    obj.author = user.fullname;
                    obj.userid = ObjectId(userid);
                    obj.username = user.fullname;
                    obj.published = state.published == undefined ? 0 : getFloat(state.published);
                    obj.menutop = getFloat(state.menutop);
                    obj.menumain = getFloat(state.menumain);
                    obj.menuleft = getFloat(state.menuleft);
                    //
                    obj.istab = getFloat(state.istab);
                    //--------
                    var listtask = state.listtask == undefined ? "" : state.listtask;
                    if (listtask != '') {
                        listtask.forEach(function (rowtask) {
                            delete rowtask['$$hashKey'];
                            if (rowtask._id == undefined || rowtask._id == '') {
                                rowtask._id = new ObjectId();
                            } else {
                                rowtask._id = ObjectId(rowtask._id);
                            }
                            var actionid = rowtask.actionid == undefined ? "" : rowtask.actionid;
                            if (actionid != '') {
                                var action = db.actions_types.findOne({ _id: ObjectId(actionid) });
                                rowtask.actionid = ObjectId(actionid);
                                rowtask.actiontitle = action.title;
                                rowtask.actionjtype = action.jtype;
                            } else {
                                rowtask.actionid = "";
                                rowtask.actiontitle = "";
                                rowtask.actionjtype = "";
                            }
                        });
                    }
                    obj.listtask = listtask;
                    var listTabPanels = state.listTabPanels == undefined ? "" : state.listTabPanels;
                    if (listTabPanels != '') {
                        listTabPanels.forEach(function (rowsc) {
                            delete rowsc['$$hashKey'];
                            if (rowsc._id == undefined || rowsc._id == '') {
                                rowsc._id = new ObjectId();
                            } else {
                                rowsc._id = ObjectId(rowsc._id);
                            }
                            rowsc.option = obj.option;
                            rowsc.newurl = obj.view + '/' + rowsc.view;
                            if (rowsc.listtask != undefined && rowsc.listtask != '') {
                                rowsc.listtask.forEach(function (rowtaskp) {
                                    delete rowtaskp['$$hashKey'];
                                    if (rowtaskp._id == undefined || rowtaskp._id == '') {
                                        rowtaskp._id = new ObjectId();
                                    } else {
                                        rowtaskp._id = ObjectId(rowtaskp._id);
                                    }
                                    var actionid = rowtaskp.actionid == undefined ? "" : rowtaskp.actionid;
                                    if (actionid != '') {
                                        var action = db.actions_types.findOne({ _id: ObjectId(actionid) });
                                        rowtaskp.actionid = ObjectId(actionid);
                                        rowtaskp.actiontitle = action.title;
                                        rowtaskp.actionjtype = action.jtype;
                                    } else {
                                        rowtaskp.actionid = "";
                                        rowtaskp.actiontitle = "";
                                        rowtaskp.actionjtype = "";
                                    }
                                });
                            }
                        });
                    }
                    obj.listTabPanels = listTabPanels;
                    var id = state._id == undefined ? "" : state._id;
                    obj.newurl = newurlp + '/' + newurl;
                    obj.newkey = newurlp.replace("/", "-") + '-' + newurl.replace("/", "-");
                    obj.description = state.description == undefined ? "" : state.description;
                    if (id != '') {
                        obj._id = ObjectId(id);
                    } else {
                        obj._id = new ObjectId();
                    }
                    childrens.push(obj);
                });
                var datas = {};
                datas.childrens = childrens;
                db.core_components.update({ _id: ObjectId(appid) }, { $set: datas });
                result.msg = "Cập nhập thành công";
                result.error = 0;
            } else {
                result.msg = "Không tìm thấy ứng dụng cần cập nhập";
            }
            result.id = appid;
            var rows = getItemApps(params);
            result.data = rows.data;
            result.total = rows.total;
        } else {
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/**
 * @function registerCustomer
 * @version
 * @param pageid, pwdid, email
 */
db.system.js.save({
    _id: 'registerCustomer',
    value: function (params) {
        var result = { data: {}, error: 1, msg: "", task: params.task };
        var state = params.data;
        var obj = {};
        var device = params.device == undefined ? 0 : params.device;
        var firstname = state.firstname == undefined ? '' : state.firstname;
        var lastname = state.lastname == undefined ? '' : state.lastname;
        var avatar = state.avatar == undefined ? '' : state.avatar;
        var fullname = firstname;
        if (lastname != '') fullname = fullname + ' ' + lastname;
        var email = state.email == undefined ? '' : state.email;
        var phone = state.phone == undefined ? '' : state.phone;
        var pwd = state.pwd;
        var keyCheck = state.keyCheck;
        obj.fullname = fullname;
        obj.firstname = firstname;
        obj.lastname = lastname;
        obj.email = email;
        obj.phone = phone;
        obj.keyCheck = keyCheck;
        obj.ip = state.ip;
        obj.ipclient = state.ipclient;
        obj.pwdid = pwd;
        obj.secretId = state.secretId;
        obj.apiKey = state.apiKey;
        var skuauto = getSkuAuto("customers");
        obj.sku = skuauto;
        obj.skuauto = skuauto;
        obj.published = 0;
        obj.verifies = 1;
        //
        var row = db.customers.findOne({ email: email });
        if (row != undefined && row != '') {
            result.msg = "Email đã được đăng ký trước đó";
            result.error = 1;
            return result;
        }
        var d = new Date();
        var id = new ObjectId();
        obj._id = id;
        obj.domain = params.domain == undefined ? "" : params.domain;
        obj.grid = ObjectId("59be44f7e25bed7d18b091d1");
        obj.groupname = "Admin";
        obj.gid = 5.0;
        obj.roles = "admin";
        obj.isApp = 1.0;
        obj.isAdmin = 1;
        obj.packageid = ObjectId("5b6ef14a6b16a70360c65ba1");
        obj.packagename = "Cơ bản";
        obj.packagetime = "365";
        obj.adminlimit = 1.0;
        obj.groupid = ObjectId("59be44f7e25bed7d18b091d1");
        obj.jtypeid = 1.0;
        obj.device = device;
        obj.avatar = avatar;
        obj.createDate = d.getTime();
        obj.day = d.getDate();
        obj.month = d.getMonth() + 1;
        obj.year = d.getFullYear();
        db.customers.insert(obj);
        //
        var comApis = {};
        comApis.secretId = state.secretId;
        comApis.apiKey = state.apiKey;
        comApis.domain = params.domain;
        comApis.cusid = id;
        comApis.cusname = fullname;
        comApis.avatar = obj.avatar;
        db.components_apikeys.insert(comApis);
        //
        result.data = db.customers.findOne({ _id: id });
        result.error = 0;
        result.msg = "Đăng ký thành công";
        return result;
    }
});
/**
* @function sendMessage
* @version
* @param params
*/
db.system.js.save({
    _id: 'sendMessage',
    value: function (params) {
        var state = params.data;
        var result = { data: [], error: 0, msg: "Gửi thành công" };
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var d = new Date();
        if (userid != '') {
            var state = params.data;
            var obj = {};
            obj.content = state.content == undefined ? "" : state.content;
            var datestart = state.datestart == undefined ? "" : state.datestart;
            var datestarttime = getDateTotime(datestart);
            var dateend = state.dateend == undefined ? "" : state.dateend;
            var dateendtime = getDateTotime(dateend);
            var listObjects = state.listObjects == undefined ? "" : state.listObjects;
            obj.datestart = datestart;
            obj.datestarttime = datestarttime;
            obj.dateend = dateend;
            obj.dateendtime = dateendtime;
            if (listObjects != '') {
                listObjects.forEach(function (row) {
                    delete row['$$hashKey'];
                    obj.objid = ObjectId(row._id);
                    obj.objname = row.title;
                    obj.companyid = ObjectId(row.companyid);
                    obj.companyname = row.companyname;
                    obj.companysku = row.companysku;
                    obj.companykyhieu = row.companykyhieu;
                    obj.companylogo = row.companylogo == undefined ? "" : row.companylogo;

                    obj.catid = ObjectId(row.catid);
                    obj.catname = row.catname;
                    obj.catsku = row.catsku;

                    obj.regid = ObjectId(row.regid);
                    obj.regname = row.regname;
                    obj.regsku = row.regsku;

                    obj.blockid = ObjectId(row.blockid);
                    obj.blockname = row.blockname;
                    obj.blocksku = row.blocksku;
                    //
                    if (row.depid != undefined && row.depid != '') obj.depid = ObjectId(row.depid);
                    else obj.depid = "";
                    obj.depname = row.depname;
                    obj.depsku = row.depsku;
                    //
                    if (row.subdepid != undefined && row.subdepid != '') obj.subdepid = ObjectId(row.subdepid);
                    else obj.subdepid = "";
                    obj.subdepname = row.subdepname;
                    obj.subdepsku = row.subdepsku == undefined ? "" : row.subdepsku;
                    obj.levelid = row.levelid;
                    //
                    obj.rootid = ObjectId(rootid);
                    obj.userid = ObjectId(userid);
                    obj.username = user.fullname;
                    obj.createDate = d.getTime();
                    db.employees_messages.insert(obj);
                    //
                });
            }
            result.obj = { title: obj.content, content: obj.content, listObjects: listObjects };
        }
        else {
            result.msg = 'Bạn không có quyền này';
            result.error = 1;
        }
        return result;
    }
});
/**
* @function getMessage
* @version
* @param params
*/
db.system.js.save({
    _id: 'getMessage',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        if (isValidObjectId(userid)) {
            var rootid = getRootId(user);
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 20 : params.limit;
            var unlimit = params.unlimit == undefined ? false : params.unlimit;
            var strSearch = '';
            var verify = params.verify == undefined ? "" : params.verify;
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
                companyid = params.search.companyid == undefined ? '' : params.search.companyid;
            }
            var result = { data: [], total: 0 };
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            if (companyid != '') condition.companyid = ObjectId(companyid);
            condition.objid = ObjectId(userid);  //objid
            condition.rootid = ObjectId(rootid);
            if (strSearch != '') {
                condition.content = whereNE;
            }
            if (verify != '') {
                condition.verify = { $ne: 1 };
            }
            result.total = db.employees_messages.count(condition);
            if (unlimit)
                result.data = db.employees_messages.find(condition).sort({ '_id': 1 }).toArray();
            else
                result.data = db.employees_messages.find(condition).sort({ '_id': 1 }).skip(page).limit(numPage).toArray();
        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }
        return result;
    }
});
//getMyItemNotification
db.system.js.save({
    _id: "getMyItemNotification",
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var result = { msg: "", error: 0, data: [], employer: { notifications: 0, birthday: 0, total: 0 } };
        if (userid != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '';
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var condition = {};
            condition.rootid = ObjectId(rootid);
            condition.employeeid = ObjectId(userid);
            condition.news = 1;
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            if (strSearch != '') {
                condition.title = whereNE;
            }
            result.total = db.employees_alerts.count(condition);
            if (unlimit == 2)
                result.data = db.employees_alerts.find(condition).sort({ '_id': -1 }).toArray();
            else
                result.data = db.employees_alerts.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();

        }
        return result;
    }
});
/**
* @function
* @verifyItemWork
* @version
* @param params
*/
db.system.js.save({
    _id: 'verifyItemWork',
    value: function (params) {
        var user = params.user;
        var userid = user._id;
        var result = { data: [], total: 0, msg: "", error: 0 };
        var state = params.data;
        var rootid = getRootId(user);
        if (userid != '') {
            var d = new Date();
            var id = state._id == undefined ? "" : state._id;
            var objid = state.objid == undefined ? "" : state.objid;
            if (objid != '' && id != '') {
                var obj = {};
                obj.status = 1;
                db.works_tasksblocks.update({ _id: ObjectId(objid), rootid: ObjectId(rootid) }, { $set: obj });
                //
                var objs = {};
                objs.verify = 1;
                db.employees_alerts.update({ _id: ObjectId(id), rootid: ObjectId(rootid) }, { $set: objs });
                //
                var objs = {};
                objs.verify = 1;
                db.employees_messages.update({ _id: ObjectId(id), rootid: ObjectId(rootid) }, { $set: objs });
                //
                var condition = {};
                condition.rootid = ObjectId(rootid);
                condition._id = ObjectId(objid);
                db.employees_vacationtimes.update(condition, { $set: { status: 1 } });
            }
            result.obj = state;
            params.verify = 1;
            var row = getMessage(params);
            result.data = row.data;
            result.total = row.total;
        } else {
            result.msg = "Bạn không có quyền ngày";
            result.error = 1;
        }
        return result;
    }
});
/**
 * @function saveChangePassword
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'saveChangePassword',
    value: function (params) {
        var state = params.data;
        var result = { data: [], error: 0, msg: "" };
        var obj = {};
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var roles = user.roles == undefined ? "" : user.roles;
        var rootid = user.rootid == undefined ? "" : user.rootid;
        var d = new Date();
        if (isValidObjectId(userid)) {
            var pwdold = state.old == undefined ? "" : state.old;
            var codition = {};
            codition.pwdid = pwdold;
            codition.published = 1;
            codition.verifies = 2;
            //codition.keyid = keyCheck;
            var fieldView = { _id: 1, email: 1, gid: 1, roles: 1, firstname: 1, lastname: 1, fullname: 1 };
            var status = db.customers.findOne(codition, fieldView);
            if (status) {
                var newpwd = state.newpwd == undefined ? "" : state.newpwd;
                var renewpwd = state.renewpwd == undefined ? "" : state.renewpwd;
                if (newpwd != '' && newpwd == renewpwd) {
                    var obj = {};
                    obj.pwdId = renewpwd;
                    var st = db.customers.update({ "_id": ObjectId(userid) }, { $set: obj });
                    result.stutus = st;
                    if (st.nModified == 1) {
                        result.msg = 'Mật khẩu mới cập nhập thành công';
                        result.error = 0;
                    }
                    else {
                        result.msg = 'Cập nhập mật khẩu mới chưa thành công';
                        result.error = 0;
                    }
                }
                else {
                    result.msg = 'Mật khẩu mới nhập chưa chính xác';
                    result.error = -2;
                }
            }
            else {
                result.msg = 'Mật khẩu cũ chưa đúng';
                result.error = -1;
            }
        }
        else {
            result.msg = 'Không thể tìm thấy định danh cập nhập';
            result.error = -3;
        }
        return result;
    }
});
/**
 * @function 
 * @getItemComponents
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getItemComponents',
    value: function (params) {
        var user = params.user;
        var userid = getUserId(user);
        var rootid = getRootId(user);
        if (rootid == '') rootid = userid;
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 2 : params.unlimit;
        var strSearch = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
        }
        var result = { data: [], total: 0 };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        condition.rootid = ObjectId(rootid);
        condition.userid = ObjectId(userid);
        //condition.published = 1;
        result.total = db.components_roots.count(condition);
        var rootData = db.components_roots.find({ published: 1 }).toArray();
        if (rootData) {
            rootData.forEach(function (row) {
                condition.rootcomponentid = row._id;
                row.listModules = db.components.find(condition).sort({ '_id': 1 }).toArray();
            });
        }
        result.data = rootData;

        return result;
    }
});

/**
 * @function 
 * @getMyItemComponents
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getMyItemComponents',
    value: function (params) {
        var user = params.user;
        var userid = getUserId(user);
        var rootid = getRootId(user);
        if (rootid == '') rootid = userid;
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 2 : params.unlimit;
        var strSearch = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
        }
        var result = { data: [], total: 0 };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        condition.rootid = ObjectId(rootid);
        condition.userid = ObjectId(userid);
        //condition.published = 1;
        result.total = db.components.count(condition);
        //var rootData = db.getCollection("components_roots").find({ published: 1 }).toArray();
        //if (rootData) {
        //    rootData.forEach(function (row) {
        //        condition.rootcomponentid = row._id;    
        //        row.listModules = db.components.find(condition).sort({ '_id': 1 }).toArray();
        //    });
        //}
        //result.data = rootData;
        if (unlimit == 2)
            result.data = db.components.find(condition).sort({ '_id': 1 }).toArray();
        else
            result.data = db.components.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();


        return result;
    }
});

/**
 * @function getRootApps
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getRootApps',
    value: function (params) {
        var user = params.user;
        var rootid = getRootId(user);
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 2 : params.unlimit;
        var strSearch = '', rootcomponentid = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
        }
        var result = { data: [], total: 0 };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        result.total = db.components_roots.count(condition);
        var data = [];
        if (unlimit == 2)
            data = db.components_roots.find(condition).sort({ '_id': 1 }).toArray();
        else
            data = db.components_roots.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();

        result.data = data;

        return result;
    }
});
/**
 * @function getApps
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getApps',
    value: function (params) {
        var user = params.user;
        var rootid = getRootId(user);
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 2 : params.unlimit;
        var strSearch = '', rootcomponentid = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            rootcomponentid = params.search.rootcomponentid == undefined ? '' : params.search.rootcomponentid;
        }
        var result = { data: [], total: 0 };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        if (rootcomponentid != '') {
            condition.rootcomponentid = ObjectId(rootcomponentid);
        }
        condition.published = 1;
        result.total = db.core_components.count(condition);
        var data = [];
        if (unlimit == 2)
            data = db.core_components.find(condition).sort({ '_id': 1 }).toArray();
        else
            data = db.core_components.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();

        if (rootid != undefined && rootid != '') {
            var listComponentId = [];
            data.forEach(function (row) {
                var conditions = {};
                conditions.rootid = ObjectId(rootid);
                conditions.appid = row._id;
                var rows = db.components.findOne(conditions);
                if (rows != undefined && rows != '') {
                    row.isInstall = 1;
                } else {
                    row.isInstall = 0;
                }
            });

        }
        result.data = data;

        return result;
    }
});
/**
* @function installApp
* @version
* @param params
*/
db.system.js.save({
    _id: 'installApp',
    value: function (params) {
        var user = params.user;
        var userid = getUserId(user);
        var rootid = getRootId(user);
        var username = user.fullname == undefined ? "" : user.fullname;
        var avatar = user.avatar == undefined ? "" : user.avatar;
        var stateApp = params.data;
        if (rootid == '') rootid = userid;
        var appid = stateApp._id == undefined ? "" : stateApp._id;
        var result = { data: [], total: 0, task: 'install', error: 0, msg: "Cập nhập thành công" };
        var rootcomponentid = stateApp.rootcomponentid == undefined ? "" : stateApp.rootcomponentid;
        if (appid != '' && rootcomponentid != '') {
            var d = new Date();
            var obj = {};
            obj.title = stateApp.title;
            var rootcom = db.components_roots.findOne({ _id: ObjectId(rootcomponentid) });
            obj.rootcomponentid = ObjectId(rootcomponentid);
            obj.rootcomponentname = rootcom.title;
            obj.rootcomponentnewurl = rootcom.newurl;
            obj.rootcomponentoption = rootcom.option;
            obj.rootcomponentview = rootcom.view;
            obj.rootcomponentnewkey = rootcom.newkey;
            obj.rootcomponenticon = rootcom.icon;
            obj.rootcomponentshorttitle = rootcom.shorttitle;

            obj.newurl = stateApp.newurl;
            obj.newkey = stateApp.newkey;
            obj.gid = stateApp.gid;
            obj.option = stateApp.option;
            obj.view = stateApp.view;
            obj.task = stateApp.task == undefined ? "" : stateApp.task;
            obj.icon = stateApp.icon;
            obj.version = stateApp.version;
            obj.author = stateApp.author;
            obj.userid = ObjectId(userid);
            obj.rootid = ObjectId(rootid);
            obj.username = username;

            if (obj.groupid != '' && obj.groupid != undefined)
                obj.groupid = ObjectId(obj.groupid);
            var childrens = stateApp.childrens;
            if (childrens.length > 0) {
                childrens.forEach(function (row) {
                    delete row['$$hashKey'];
                    if (row._id != undefined && row != '') {
                        row._id = ObjectId(row._id);
                    }
                    if (row.userid != undefined && row.userid != '') {
                        row.userid = ObjectId(row.userid);
                    }
                    var listtask = row.listtask == undefined ? "" : row.listtask;
                    if (listtask) {
                        listtask.forEach(function (rowtask) {
                            delete rowtask['$$hashKey'];
                            if (rowtask._id != '' && rowtask._id != undefined)
                                rowtask._id = ObjectId(rowtask._id);
                            if (rowtask.groupid != '' && rowtask.groupid != undefined)
                                rowtask.groupid = ObjectId(rowtask.groupid);
                            if (rowtask.userid != '' && rowtask.userid != undefined)
                                rowtask.userid = ObjectId(rowtask.userid);
                        });
                    }
                    row.listtask = listtask;
                    var listTabPanels = row.listTabPanels == undefined ? "" : row.listTabPanels;
                    if (listTabPanels) {
                        listTabPanels.forEach(function (rowp) {
                            delete rowp['$$hashKey'];
                            if (rowp._id != '' && rowp._id != undefined)
                                rowp._id = ObjectId(rowp._id);
                            if (rowp.groupid != '' && rowp.groupid != undefined) rowp.groupid = ObjectId(rowp.groupid);
                            if (rowp.listtask != undefined && rowp.listtask != '') {
                                rowp.listtask.forEach(function (rowtaskp) {
                                    delete rowtaskp['$$hashKey'];
                                    if (rowtaskp._id != '' && rowtaskp._id != undefined)
                                        rowtaskp._id = ObjectId(rowtaskp._id);
                                    if (rowtaskp.userid != '' && rowtaskp.userid != undefined)
                                        rowtaskp.userid = ObjectId(rowtaskp.userid);
                                });
                            }
                        });
                    }
                    row.listTabPanels = listTabPanels;
                });
            }

            var state = db.components.findOne({ appid: ObjectId(appid), rootid: ObjectId(rootid), rootcomponentid: ObjectId(rootcomponentid) });
            if (state) {
                obj.childrens = childrens;
                db.components.update({ _id: state._id, rootid: ObjectId(rootid), rootcomponentid: ObjectId(rootcomponentid) }, { $set: obj });
                db.customers.update({ _id: ObjectId(userid) }, { $set: { isApp: 1 } });
            } else {
                obj._id = new ObjectId();
                obj.appid = ObjectId(appid);
                obj.createDate = d.getTime();
                obj.childrens = childrens;
                db.components.insert(obj);
                db.customers.update({ _id: ObjectId(userid) }, { $set: { isApp: 1 } });
            }
            var rowc = getComponents(params);
            result.data = rowc.data;
            result.total = rowc.total;
            user.isApp = 1;
            result.user = user;
        }
        return result;
    }
});
/**
 * @function getComponents
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getComponents',
    value: function (params) {
        var user = params.user;
        var userid = getUserId(user);
        var rootid = getRootId(user);
        if (rootid == '') rootid = userid;
        var page = params.limitstart == undefined ? 0 : params.limitstart;
        var numPage = params.limit == undefined ? 10 : params.limit;
        var unlimit = params.unlimit == undefined ? 2 : params.unlimit;
        var strSearch = '';
        if (params.search != undefined && params.search != null) {
            strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
        }
        var result = { data: [], total: 0 };
        var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
        var condition = {};
        if (strSearch != '') {
            condition.title = whereNE;
        }
        condition.rootid = ObjectId(rootid);
        condition.userid = ObjectId(userid);
        result.total = db.components.count(condition);
        if (unlimit == 2)
            result.data = db.components.find(condition).sort({ '_id': 1 }).toArray();
        else
            result.data = db.components.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();
        return result;
    }
});
/**
* @function
* @getMyStateCompany
* @version
* @param params
*/
db.system.js.save({
    _id: 'getMyStateCompany',
    value: function (params) {
        var user = params.user;
        var userid = getUserId(user);
        var result = { data: {}, setting: {}, settingCondition: {}, total: 0, msg: "", error: 0 };
        if (userid != '') {
            var d = new Date();
            var companyid = params.companyid == undefined ? "" : params.companyid;
            var condition = {};
            var rootid = getRootId(user);
            condition.rootid = ObjectId(rootid);
            if (companyid != '') condition.companyid = ObjectId(companyid);
            var fields = params.fields == undefined ? "" : params.fields;
            if (fields != '')
                result.data = db.companys.findOne(condition, fields);
            else
                result.data = db.companys.findOne(condition);
            if (result.data != undefined && result.data != '') {
                var setting = { companyid: result.data._id, yearid: d.getFullYear(), rootid: ObjectId(rootid) };
                result.settingCondition = setting;
                result.setting = db.companys_settings.findOne(setting);
            }
        }
        return result;
    }
});
/**
* @function
* @updateCompanyInfo
* @version
* @param params
*/
db.system.js.save({
    _id: 'updateCompanyInfo',
    value: function (params) {
        var user = params.user;
        var userid = user._id;
        var result = { data: {}, datablock: [], total: 0, msg: "Câp nhập thành công", error: 0 };
        var rootid = getRootId(user);
        if (userid != '') {
            var state = params.data;
            var obj = {};
            var kyhieu = state.kyhieu == undefined ? "" : state.kyhieu;
            if (kyhieu != '') obj.kyhieu = kyhieu.toUpperCase();
            obj.fullname = state.fullname == undefined ? "" : state.fullname;
            obj.masothue = state.masothue == undefined ? "" : state.masothue;
            obj.phone = state.phone == undefined ? "" : state.phone;
            obj.email = state.email == undefined ? "" : state.email;
            obj.logo = state.logo == undefined ? "" : state.logo;
            obj.fax = state.fax == undefined ? "" : state.fax;
            obj.website = state.website == undefined ? "" : state.website;
            obj.address = state.address == undefined ? "" : state.address;

            obj.ngaythanhlap = state.ngaythanhlap == undefined ? "" : state.ngaythanhlap;
            obj.tamnhin = state.tamnhin == undefined ? "" : state.tamnhin;
            obj.sumenh = state.sumenh == undefined ? "" : state.sumenh;

            var hotennguoidaidien = state.hotennguoidaidien == undefined ? "" : state.hotennguoidaidien;
            var diachinguoidaidien = state.diachinguoidaidien == undefined ? "" : state.diachinguoidaidien;
            var dienthoainguoidaidien = state.dienthoainguoidaidien == undefined ? "" : state.dienthoainguoidaidien;
            if (hotennguoidaidien != '') obj.hotennguoidaidien = hotennguoidaidien;
            if (diachinguoidaidien != '') obj.diachinguoidaidien = diachinguoidaidien;
            if (dienthoainguoidaidien != '') obj.dienthoainguoidaidien = dienthoainguoidaidien;
            var chucvunguoidaidien = state.chucvunguoidaidien == undefined ? "" : state.chucvunguoidaidien;
            if (chucvunguoidaidien != '') obj.chucvunguoidaidien = chucvunguoidaidien;
            var interview = state.interview == undefined ? "" : state.interview;
            if (interview != '') obj.interview = interview;

            var d = new Date();
            var id = state._id == undefined ? "" : state._id;
            if (id != '') {
                db.companys.update({ _id: ObjectId(id) }, { $set: obj });
            } else {
                id = new ObjectId();
                obj._id = id;
                var skuauto = getSkuAuto('companys', state, rootid);
                obj.skuauto = skuauto;
                var sku = skuauto.toString();
                if (skuauto < 10) sku = '0' + skuauto.toString();
                obj.skuauto = skuauto;
                obj.sku = sku;
                obj.rootid = ObjectId(rootid);
                obj.createDate = d.getTime();
                db.companys.insert(obj);
            }
            var row = getMyStateCompany(params);
            result.data = row.data;
            result.settingCondition = row.settingCondition;
            result.setting = row.setting;

        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }

        return result;
    }
});

/**
* @function
* @updateCompanySetting
* @version
* @param params
*/
db.system.js.save({
    _id: 'updateCompanySetting',
    value: function (params) {
        var user = params.user;
        var userid = user._id;
        var result = { data: {}, datablock: [], total: 0, task: "setting", msg: "Câp nhập thành công", error: 0 };
        var rootid = getRootId(user);
        if (userid != '') {
            var d = new Date();
            var state = params.data;
            var companyid = state.companyid == undefined ? "" : state.companyid;
            var obj = {};
            var salary = state.salary == undefined ? "" : state.salary;
            if (salary != '') {
                salary.forEach(function (rows) {
                    delete rows['$$hashKey'];
                    var price = rows.price == undefined ? "" : rows.price;
                    if (price != '')
                        rows.price = getFloat(rows.price);
                });
            } else {
                salary = {};
            }
            obj.yearid = getFloat(state.yearid ? d.getFullYear() : state.yearid);
            obj.rootid = ObjectId(rootid);
            obj.companyid = ObjectId(companyid);
            obj.salary = salary;
            var rows = db.companys_settings.findOne({ companyid: ObjectId(companyid), rootid: ObjectId(rootid), yearid: d.getFullYear() });
            if (rows != undefined && rows != '') {
                db.companys_settings.update({ _id: rows._id }, { $set: obj });
            } else {
                obj.userid = ObjectId(userid);
                obj.createDate = d.getFullYear();
                db.companys_settings.insert(obj);
            }
            params.companyid = companyid;
            var row = getSetting(params);
            result.data = row.data;
            result.total = row.total;
        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }
        return result;
    }
});
/**
* @function
* @getSetting
* @version
* @param params
*/
db.system.js.save({
    _id: 'getSetting',
    value: function (params) {
        var user = params.user;
        var userid = user._id;
        var result = { data: {}, total: 0, msg: "", error: 0 };
        var state = params.data;
        var companyid = params.companyid == undefined ? "" : params.companyid;
        if (userid != '') {
            var d = new Date();
            var rootid = getRootId(user);
            var conditions = {};

            conditions.yearid = d.getFullYear();
            conditions.rootid = ObjectId(rootid);
            conditions.companyid = ObjectId(companyid);
            // conditions.rootid = ObjectId(rootid);
            result.data = db.companys_settings.findOne(conditions);
        } else {
            result.msg = "Bạn không có quyền ngày";
            result.error = 1;
        }
        return result;
    }
});
/**
* @function
* @getMyCareers
* @version
* @param params
*/
db.system.js.save({
    _id: 'getMyCareers',
    value: function (params) {
        var user = params.user;
        var userid = user._id;
        var result = { data: {}, total: 0, msg: "", error: 0 };
        var state = params.data;
        if (userid != '') {
            var rootid = getRootId(user);
            var conditions = {};
            // conditions.rootid = ObjectId(rootid);
            result.data = db.employees_careers.find(conditions).toArray();
        } else {
            result.msg = "Bạn không có quyền ngày";
            result.error = 1;
        }
        return result;
    }
});
/**
* @function
* @saveMyCareers
* @version
* @param params
*/
db.system.js.save({
    _id: 'saveMyCareers',
    value: function (params) {
        var user = params.user;
        var userid = user._id;
        var result = { data: [], total: 0, msg: "Câp nhập thành công", error: 0 };
        var rootid = getRootId(user);
        var d = new Date();
        if (userid != '') {
            var task = params.task == undefined ? "" : params.task;
            if (task == 'remove') {
                var stateRow = params.data;
                var regid = stateRow._id == undefined ? "" : stateRow._id;
                if (regid != '') {
                    db.recruitments_sections.remove({ _id: ObjectId(regid) });
                    result.msg = "Xóa thành công";
                }
            } else {
                var row = params.data == undefined ? "" : params.data;
                var obj = {};
                obj.title = row.title == undefined ? "" : row.title;
                obj.description = row.description == undefined ? "" : row.description;
                var company = getMyCompanyInfo(params);
                obj.companyid = company.companyid == undefined ? "" : company.companyid;
                obj.companyname = company.fullname == undefined ? "" : company.fullname;
                //obj.listStatus = row.listStatus;
                var _id = row._id == undefined ? "" : row._id;
                obj.rootid = ObjectId(rootid);
                if (_id != '') {
                    db.employees_careers.update({ _id: ObjectId(_id), rootid: ObjectId(rootid) }, { $set: obj });
                } else {
                    var rowsc = db.employees_careers.findOne({ title: row.title, rootid: ObjectId(rootid) });
                    if (!rowsc) {
                        obj.rootid = ObjectId(rootid);
                        obj.createDate = d.getTime();
                        db.employees_careers.insert(obj);
                    } else {
                        db.employees_careers.update({ _id: rowsc._id, rootid: ObjectId(rootid) }, { $set: obj });
                    }
                }
            }
            var state = getMyCareers(params);
            result.data = state.data;
        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }
        return result;
    }
});

/**
* @function
* @getAccountEmployee
* @version
* @param params
*/
db.system.js.save({
    _id: 'getAccountEmployee',
    value: function (params) {
        var user = params.user;
        var gid = user.gid == undefined ? 0 : user.gid;
        var userid = getUserId(user);
        var result = { data: [], total: 0, msg: "", error: 0, task: params.task };
        if (userid != '') {
            var rootid = getRootId(user);
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '', companyid = '', grid = '';
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
                grid = params.search.grid == undefined ? '' : params.search.grid;
                companyid = params.search.companyid == undefined ? '' : params.search.companyid;
            }

            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            if (strSearch != '') {
                condition.title = whereNE;
            }
            if (companyid != '') {
                condition.companyid = ObjectId(companyid);
            }
            if (grid != '') {
                condition.grid = ObjectId(grid);
            }
            //condition.gid = { $lte: parseInt(gid) };
            condition._id = { $ne: ObjectId(userid) };
            condition.rootid = ObjectId(rootid);
            result.total = db.employees_accounts.count(condition);
            if (unlimit == 2)
                result.data = db.employees_accounts.find(condition).sort({ 'ordering': 1 }).toArray();
            else
                result.data = db.employees_accounts.find(condition).sort({ 'ordering': 1 }).skip(page).limit(numPage).toArray();

        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }
        return result;
    }
});
/**
 * @function 
 * @saveAccountEmployee
 * @version
 * @param 
 */
db.system.js.save({
    _id: 'saveAccountEmployee',
    value: function (params) {
        var user = params.user;
        var userid = getUserId(user);
        var task = params.task;
        var result = { error: 0, msg: "Cập nhập thành công", data: [], id: "", task: task };
        if (userid != '') {
            var rootid = getRootId(user);
            var state = params.data;
            var status = false;
            switch (task) {
                case 'save':
                case 'apply':
                case 'savenew':
                case 'saveclose':
                    var id = state.posjobid == undefined ? "" : state.posjobid;
                    var companyid = state.companyid == undefined ? "" : state.companyid;
                    if (id != '' && companyid != '') {
                        var rowUser = db.companys_posjobs.findOne({ _id: ObjectId(id), companyid: ObjectId(companyid), rootid: ObjectId(rootid) });
                        if (rowUser != undefined && rowUser != '') {
                            var obj = {};
                            obj.sku = rowUser.sku;
                            obj.skuauto = rowUser.skuauto;
                            obj.companyid = ObjectId(companyid);
                            obj.companyname = rowUser.companyname;
                            obj.companykyhieu = rowUser.companykyhieu;
                            obj.blockid = rowUser.blockid;
                            obj.blockname = rowUser.blockname;
                            obj.blocksku = rowUser.blocksku;
                            obj.depid = rowUser.depid;
                            obj.depname = rowUser.depname;
                            obj.depsku = rowUser.depsku;
                            obj.subdepid = rowUser.subdepid;
                            obj.subdepname = rowUser.subdepname;
                            obj.subdepsku = rowUser.subdepsku;
                            obj.catid = rowUser.catid;
                            obj.catname = rowUser.catname;
                            obj.catsku = rowUser.catsku;
                            obj.regid = rowUser.regid;
                            obj.regname = rowUser.regname;
                            obj.regsku = rowUser.regsku;
                            obj.firstname = state.firstname == undefined ? "" : state.firstname;
                            obj.lastname = state.lastname == undefined ? "" : state.lastname;
                            obj.fullname = obj.firstname + ' ' + obj.lastname;
                            obj.gender = state.gender == undefined ? "" : state.gender;
                            obj.email = state.email;
                            obj.published = state.published == undefined ? 0 : parseInt(state.published);
                            obj.ordering = state.ordering == undefined ? 0 : state.ordering;
                            var jpermissionid = state.jpermissionid == undefined ? "" : state.jpermissionid;
                            obj.jpermissionid = getFloat(jpermissionid);
                            obj.accessid = getFloat(state.accessid);
                            var cityids = '', cityname = '', gid = 1, roles = 'guest';
                            var groupid = state.groupid == undefined ? "" : state.groupid;
                            if (groupid != '') {
                                gr = db.core_groups.findOne({ "_id": ObjectId(groupid) });
                                obj.groupid = ObjectId(groupid);
                                obj.groupname = gr.title;
                           
                                obj.roles = gr.roles;
                            } else {
                                obj.groupname = "";
                                obj.groupid = "";
                                obj.roles = "";
                            }
                            obj.gid = getFloat(state.gid);
                            //rootId
                            obj.verifies = 2;
                            obj.keyid = state.keyid == undefined ? "" : state.keyid;
                            obj.ip = state.ip == undefined ? "" : state.ip;
                            obj.jtypeid = state.jtypeid == undefined ? 1 : state.jtypeid;
                            var pwdid = state.pwdid == undefined ? "" : state.pwdid;
                            if (pwdid != '') {
                                obj.pwdid = state.pwdid;
                            }
                            obj.email = state.email;
                            obj.username = state.email;
                            obj.ordering = state.ordering == undefined ? 0 : state.ordering;
                            obj.published = state.published == undefined ? "" : state.published;

                            obj.posjobid = rowUser._id;
                            obj.posjobname = rowUser.title;
                            obj.posjobsku = rowUser.skuauto;
                            //
                            var rows = db.employees_accounts.findOne({ _id: ObjectId(id) });
                            if (rows) {
                                db.employees_accounts.update({ _id: rows._id }, { $set: obj });
                            } else {
                                obj._id = ObjectId(id);
                                obj.rootid = ObjectId(rootid);
                                obj.remove = 0;
                                obj.trash = 0;
                                obj.agentid = ObjectId(userid);
                                obj.agentname = user.fullname;
                                db.employees_accounts.insert(obj);
                            }
                            db.companys_posjobs.update({ _id: rowUser._id }, { $set: { lock: 1 } });
                        } else {
                            result.msg = "Chúng tôi không tìm thấy employee";
                            result.error = 1;
                        }
                    }
                    break;
                case 'remove':
                case 'publish':
                case 'order':
                    var aid = state._id == undefined ? "" : state._id;
                    if (aid != undefined && aid != null) {
                        var emdata = {};
                        if (task == 'remove') {
                            status = db.employees_accounts.update({ '_id': ObjectId(aid) }, { $set: { 'remove': 1 } });
                            db.employees.update({ _id: ObjectId(aid) }, { $set: { remove: 1 } });
                        } else if (task == 'publish') {
                            var published = parseInt(params.published);
                            status = db.employees_accounts.update({ '_id': ObjectId(aid) }, { $set: { 'published': published } });
                            emdata["account.published"] = published;
                            db.employees.update({ _id: ObjectId(aid) }, { $set: emdata });
                        } else if (task == 'order') {
                            var ordering = parseInt(params.ordering);
                            status = db.employees_accounts.update({ '_id': ObjectId(aid) }, { $set: { 'ordering': ordering } });
                            emdata["account.ordering"] = ordering;
                            db.employees.update({ _id: ObjectId(aid) }, { $set: emdata });
                        }
                    }
                    break;
            }
            var actions = {};
            addActions(params, actions);
            var rows = getAccountEmployee(params);
            result.total = rows.total;
            result.data = rows.data;
        } else {
            result.msg = "Bạn không có quyền này";
            result.error = 1;
        }
        return result;
    }
});
/**
 * @function 
 * @saveFeedback
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'saveFeedback',
    value: function (params) {
        var result = { data: [], error: 0, msg: "" };
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var d = new Date();
        if (isValidObjectId(userid)) {
            var obj = {};
            var state = params.data;
            var companyid = state.companyid == undefined ? "" : state.companyid;
            var userAdmin = db.users.findOne({ gid: 8 });
            obj.content = state.content == undefined ? "" : state.content;
            obj.cusid = ObjectId(userid);
            obj.cusname = user.fullname;
            obj.cusavatar = user.avatar == undefined ? "" : user.avatar;
            obj.companyid = ObjectId(companyid);
            obj.cusrootid = ObjectId(rootid);
            obj.userid = userAdmin._id;
            obj.username = userAdmin.fullname;
            obj.year = d.getFullYear();
            obj.month = d.getMonth() + 1;
            obj.day = d.getDate();
            obj.createDate = d.getTime();
            db.users_feedbacks.insert(obj);
            result.obj = obj;
        }
        else {
            result.msg = 'Không thể tìm thấy định danh cập nhập';
            result.error = -3;
        }
        return result;
    }
});

/**
 * @function 
 * @saveNewFeed
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'saveNewFeed',
    value: function (params) {
        var result = { data: [], error: 0, msg: "Cập nhập thành công" };
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var d = new Date();
        if (isValidObjectId(userid)) {
            var obj = {};
            var state = params.data;
            var companyid = state.companyid == undefined ? "" : state.companyid;
            obj.title = state.title == undefined ? "" : state.title;
            obj.images = state.images == undefined ? "" : state.images;
            obj.content = state.content == undefined ? "" : state.content;
            obj.userid = ObjectId(userid);
            obj.username = user.fullname;
            obj.avatar = user.avatar == undefined ? "" : user.avatar;
            obj.rootid = ObjectId(rootid);
            obj.companyid = ObjectId(companyid);
            obj.year = d.getFullYear();
            obj.month = d.getMonth() + 1;
            obj.day = d.getDate();
            obj.createDate = d.getTime();
            obj.option = params.option == undefined ? "" : params.option;
            obj.view = params.view == undefined ? "" : params.view;
            obj.ip = params.ip == undefined ? "" : params.ip;
            obj.sessionid = params.sessionid;
            obj.ipserver = params.ipserver == undefined ? "" : params.ipserver;
            obj.task = params.task == undefined ? "" : params.task;
            obj.pwd = params.pwd == undefined ? "" : params.pwd;
            obj.device = params.device == undefined ? 0 : getFloat(params.device);
            obj.local = params.local == undefined ? "" : params.local;
            db.actions.insert(obj);
            var condition = {};
            condition.rootid = ObjectId(rootid);
            condition.companyid = ObjectId(companyid);
            result.employees = db.employees_accounts.find(condition, { _id: 1, fullname: 1, avatar: 1 }).toArray();
            params.limit = 10;
            params.unlimit = 1;
            var row = getActions(params);
            result.data = row.data;
            result.total = row.total;
        }
        else {
            result.msg = 'Không thể tìm thấy định danh cập nhập';
            result.error = 1;
        }
        return result;
    }
});
/**
* @function 
* @getItemEmployeeProcess
* @version
* @param params
*/
db.system.js.save({
    _id: 'getItemEmployeeProcess',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var task = params.task == undefined ? "" : params.task;
        var result = { data: [], msg: "", error: 0, task: task };
        var state = {};
        if (rootid != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 1 : params.unlimit;
            var condition = {};
            condition.rootid = ObjectId(rootid);
            condition.employeeid = ObjectId(userid);
            result.total = db.employees_taskprocess.count(condition);
            if (unlimit == 2)
                result.data = db.employees_taskprocess.find(condition).sort({ month: 1 }).toArray();
            else
                result.data = db.employees_taskprocess.find(condition).sort({ month: 1 }).skip(page).limit(numPage).toArray();
        }
        return result;
    }
});
/**
* @function 
* @saveItemLisFunction
* @version
* @param params
*/
db.system.js.save({
    _id: 'saveItemLisFunction',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var task = params.task == undefined ? "" : params.task;
        var result = { data: [], msg: "", error: 0, task: task };
        var d = new Date();
        var state = {};
        if (rootid != '') {
            var conditions = {};
            conditions.rootid = ObjectId(rootid);
            conditions.userid = ObjectId(userid);
            var components = db.components.find(conditions).toArray();
            if (components) {
                components.forEach(function (row) {
                    var childrens = row.childrens == undefined ? "" : row.childrens;
                    if (childrens) {
                        childrens.forEach(function (rows) {
                            var obj = {};
                            if (typeof rows._id == 'string') obj._id = ObjectId(rows._id);
                            else obj._id = rows._id;
                            obj.title = rows.title;
                            obj.jsfile = rows.jsfile == undefined ? "" : rows.jsfile;
                            obj.option = row.option;
                            obj.view = rows.view;
                            obj.task = rows.task == undefined ? "" : rows.task;
                            obj.gtask = 2;
                            obj.newurl = rows.newurl;
                            obj.icon = rows.icon;
                            obj.maqt = "";
                            obj.componentid = row._id;
                            obj.componentname = row.title;
                            obj.componentnewurl = row.newurl;
                            var condition = {};
                            condition.rootid = ObjectId(rootid);
                            condition._id = row._id;
                            var rowc = db.libs_fuctions.findOne(condition);
                            if (rowc) {
                                db.libs_fuctions.update({ _id: rowc._id }, { $set: obj });
                            } else {
                                obj.rootid = ObjectId(rootid);
                                obj.userid = ObjectId(userid);
                                obj.username = user.fullname;
                                obj.createDate = d.getTime();
                                db.libs_fuctions.insert(obj);
                            }
                        });
                    }
                });
            }
            result.error = 0;
            result.msg = "Cập nhập mới thành công";
            var rowdata = getItemLisFunction(params);
            result.data = rowdata.data;
            result.total = rowdata.total;
        } else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});

/**
 * @function 
 * @getItemLisFunction
 * @version
 * @param params
 */
db.system.js.save({
    _id: 'getItemLisFunction',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var rootid = getRootId(user);
        var task = params.task == undefined ? "" : params.task;
        var result = { data: [], msg: "", error: 0, task: task };
        var state = {};
        if (rootid != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '';
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var condition = {};
            condition.rootid = ObjectId(rootid);
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            if (strSearch != '') {
                condition.title = whereNE;
            }
            result.total = db.libs_fuctions.count(condition);
            if (unlimit == 2)
                result.data = db.libs_fuctions.find(condition).sort({ '_id': 1 }).toArray();
            else
                result.data = db.libs_fuctions.find(condition).sort({ '_id': 1 }).skip(page).limit(numPage).toArray();

        }
        return result;
    }
});
/**
* @function
* getStateCompany
* @version
* @param params
*/
db.system.js.save({
    _id: 'getStateCompany',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var task = params.task == undefined ? "" : params.task;
        var rootid = getRootId(user);
        var result = { data: [], total: 0, task: task, error: 0, msg: "" };
        if (userid != '') {
            var d = new Date();
            var condition = {};
            condition.rootid = ObjectId(rootid);
            result.data = db.companys.findOne(condition);
            result.setting = db.companys_settings.findOne({ companyid: result.data._id, yearid: d.getFullYear(), rootid: ObjectId(rootid) });
        }
        return result;
    }
});
/**
* @function
* getAccounting
* @version
* @param params
*/
db.system.js.save({
    _id: 'getAccounting',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var task = params.task == undefined ? "" : params.task;
        var rootid = getRootId(user);
        var result = { data: [], total: 0, task: task, error: 0, msg: "" };
        var companyid = params.companyid == undefined ? "" : params.companyid;
        if (userid != '' && companyid != '') {
            var search = params.search == undefined ? "" : params.search;
            var level = '';
            if (search != '') {
                level = search.accountinglevel == undefined ? "" : search.accountinglevel;
            }
            var d = new Date();
            var condition = {};
            condition.rootid = ObjectId(rootid);
            condition.companyid = ObjectId(companyid); 
            if (level != '') {
                condition.level = { $lte: getFloat(level) };
            }
            result.data = db.companys_accountings.find(condition).toArray();
        }
        return result;
    }
});

/**
* @function
* getVirAccounting
* @version
* @param params
*/
db.system.js.save({
    _id: 'getVirAccounting',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var task = params.task == undefined ? "" : params.task;
        var rootid = getRootId(user);
        var result = { data: [], total: 0, task: task, error: 0, msg: "" };
        var companyid = params.companyid == undefined ? "" : params.companyid;
        if (userid != '' && companyid != '') {
            var search = params.search == undefined ? "" : params.search;
            var level = '';
            if (search != '') {
                level = search.accountinglevel == undefined ? "" : search.accountinglevel;
            }
            var d = new Date();
            var condition = {};
            condition.rootid = ObjectId(rootid);
            condition.companyid = ObjectId(companyid);
            if (level != '') {
                condition.level = { $lte: getFloat(level) };
            }
            result.data = db.companys_viraccountings.find(condition).toArray();
        }
        return result;
    }
});