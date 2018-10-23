import { ObjectID } from "mongodb";

/**
* @function
* @getListFriends
* @version
* @param params
*/
db.system.js.save({
    _id: 'getListFriends',
    value: function (params) {
        var user = params.user;
        var userId = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, error: 0, msg: "" };
        if (userId != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '', isNoFriends = 0;
            var listUsers = params.listUsers == undefined ? "" : params.listUsers;
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            var condition1 = {};
            var condition2 = {};
            condition1.userid = ObjectId(userId);
            condition1.connected = 1;
            if (strSearch != '') {
                condition1.fullname = whereNE;
            }
            condition2.uid = ObjectId(userId);
            condition2.connected = 1;
            if (strSearch != '') {
                condition2.fullname = whereNE;
            }
            condition = { $or: [condition1, condition2] };
            var data = [];
            result.total = db.users_friends.count(condition);
            if (unlimit > 1)
                data = db.users_friends.find(condition).toArray();
            else
                data = db.users_friends.find(condition).skip(page).limit(numPage).toArray();
            //---------------------------------------------------------------------------------------------------
            var listUserId = [];
            if (data) {
                data.forEach(function (row) {
                    if (row.uid != undefined && row.uid != '') {
                        if (userId != row.uid)
                            listUserId.push(row.uid);
                    }
                    if (row.userid != undefined && row.userid != '') {
                        if (userId != row.userid)
                            listUserId.push(row.userid);
                    }
                });
                var listUserIds = [];
                if (listUsers) {
                    listUsers.forEach(function (row) {
                        if (row.userid != undefined && row._id != '') {
                            listUserIds.push(ObjectId(row.userid));
                        }
                    });
                }
                var conditions = {};
                conditions._id = { $in: listUserId, $nin: listUserIds };
                result.listUserIds = listUserIds;
                //conditions.gid = { $lte: 4 };
                result.data = db.users.find(conditions).sort({ 'lastEdit': -1 }).toArray();
                result.data.forEach(function (row) {
                    var p1 = { $or: [{ uerid: row._id }, { friendid: row._id }] };
                    var st = db.chats.findOne(p1, { _id: 1 });
                    if (st) {
                        var p2 = { $or: [{ uerid: row._id, chatid: st._id, ready: 0 }, { friendid: row._id, chatid: st._id, ready: 0 }] };
                        row.hits = db.chats_items.count(p2);
                    }
                });
            }
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/**
* @function
* @getListCutomers
* @version
* @param params
*/
db.system.js.save({
    _id: 'getListCutomers',
    value: function (params) {
        var user = params.user;
        var userId = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, error: 0, msg: "" };
        var gid = user.gid == undefined ? 0 : user.gid;
        if (userId != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '', isNoFriends = 0;
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            condition.rootId = ObjectId(getRootId(params));
            condition.gid = { $lte: gid };
            if (strSearch != '') {
                condition.fullname = whereNE;
            }
            var data = [];
            result.total = db.customers.count(condition);
            if (unlimit > 1)
                result.data = db.customers.find(condition).toArray();
            else
                result.data = db.customers.find(condition).skip(page).limit(numPage).toArray();
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @addChatStore
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'addJoinChat',
    value: function (params) {
        var d = new Date();
        var result = { data: {}, total: 0, id: "", error: 0, task: 'addChat', msg: 'Cập nhập thành công' };
        var obj = {};
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var guest = params.guest;
        var listUsers = guest.listUsers == undefined ? "" : guest.listUsers;
        var friendid = '', groupid = '';
        if (listUsers.length > 0) {
            groupid = guest._id;
        }
        else {
            friendid = guest._id;
        }
        var chatid = "";
        if (userid != "") {
            obj.lastEdit = d.getTime();
            var states = getChats(userid, friendid, groupid);
            if (states) {
                chatid = states._id;
                obj.hits = { $inc: 1 };
                db.chats.update({ _id: states._id }, { $set: obj });
                saveChatItems(chatid, params);
            }
            else {
                obj.userid = ObjectId(userid);
                obj.username = user.fullname == undefined ? "" : user.fullname;
                obj.useravatar = user.avatar == undefined ? "" : user.avatar;
                //-----------------------------------------------------------------
                if (friendid != '') {
                    obj.friendid = ObjectId(friendid);
                    obj.friendname = guest.fullname == undefined ? "" : guest.fullname;
                    obj.friendavatar = guest.avatar == undefined ? "" : guest.avatar;
                }
                else {
                    if (groupid != '') {
                        obj.groupid = ObjectId(groupid);
                    }
                    else {
                        obj.groupid = '';
                        obj.friendid = '';
                        obj.friendname = '';
                        obj.friendavatar = '';
                    }
                }
                obj.createDate = d.getTime();
                obj.day = d.getDate();
                obj.month = d.getMonth() + 1;
                obj.year = d.getFullYear();
                var chatid = new ObjectId();
                obj._id = chatid;
                obj.hits = 1;
                db.chats.insert(obj);
                saveChatItems(chatid, params);
            }
            var row = getChatItems(chatid, params);
            result.data = row.data;
            result.total = row.total;
        }
        return result;
    }
});
/*
* @function*
* @addChatStore
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'getChats',
    value: function (userid, employeeid, rootid, companyid) {
        var condition = {};
        //if (userid != undefined && userid != '') condition.userid = ObjectId(userid);
        if (employeeid != undefined && employeeid != '') condition.employeeid = ObjectId(employeeid);
        condition.rootid = ObjectId(rootid);
        condition.companyid = ObjectId(companyid);
        var state = db.chats.findOne(condition);
        if (state) {
            return state;
        }
        else {
            return false;
        }
    }
});
/*
* @function*
* @addChatStore
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'saveChatItems',
    value: function (chatid, params) {
        var d = new Date();
        var obj = {};
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var guest = params.guest;
        var listUsers = guest.listUsers == undefined ? "" : guest.listUsers;
        var friendid = '';
        if (listUsers.length > 0) {
            var groupid = guest._id == undefined ? "" : guest._id;
        }
        else {
            friendid = guest._id == undefined ? "" : guest._id;
        }
        if (userid != "") {
            obj.userid = ObjectId(userid);
            obj.username = user.fullname == undefined ? "" : user.fullname;
            //-----------------------------------------------------------------
            if (friendid != '') {
                obj.friendid = ObjectId(friendid);
                obj.friendname = guest.fullname == undefined ? "" : guest.fullname;
            }
            else {
                obj.friendid = ObjectId(groupid);
                obj.friendname = guest.title == undefined ? "" : guest.title;
                obj.groupid = ObjectId(groupid);
                obj.groupname = guest.title == undefined ? "" : guest.title;
            }
            //
            var state = params.data;
            obj.content = state.content == undefined ? "" : state.content;
            //
            obj.createDate = d.getTime();
            obj.day = d.getDate();
            obj.month = d.getMonth() + 1;
            obj.year = d.getFullYear();
            obj.chatid = chatid;
            obj.usersend = 1;
            obj.ready = 0;
            //
            db.chats_items.insert(obj);
            return true;
        }
        else {
            return false;
        }
    }
});
/**
* @function
* @getChatItems
* @version
* @param params
*/
db.system.js.save({
    _id: 'getChatItems',
    value: function (chatid, params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, error: 0, msg: "" };
        var gid = user.gid == undefined ? 0 : user.gid;
        if (userid != '' && chatid != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '', isNoFriends = 0;
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition = {};
            //condition1.userid = ObjectId(userid);
            condition.chatid = chatid;
            // var condition2 = {};
            //  condition2.friendid = ObjectId(userid);
            //condition2.chatid = chatid;
            if (strSearch != '') {
                condition.fullname = whereNE;
            }
            //var condition = { $or: [condition1, condition2] };
            var data = [];
            result.total = db.chats_items.count(condition);
            if (unlimit > 1)
                result.data = db.chats_items.find(condition).sort({ '_id': -1 }).toArray();
            else
                result.data = db.chats_items.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});

/**
* @function
* @getListFileChat
* @version
* @param params
*/
db.system.js.save({
    _id: 'getListFileChat',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, error: 0, msg: "" };
        var gid = user.gid == undefined ? 0 : user.gid;
        if (userid != '') {
            var guest = params.guest;
            var guestid = guest._id == undefined ? "" : guest._id;
            var chat = getChats(userid, guestid);
            var chatid = chat._id;
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '', isNoFriends = 0;
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition1 = {};
            condition1.userid = ObjectId(userid);
            condition1.chatid = chatid;
            var condition2 = {};
            condition2.friendid = ObjectId(userid);
            condition2.chatid = chatid;
            if (strSearch != '') {
                condition1.fullname = whereNE;
                condition2.fullname = whereNE;
            }
            var condition = { $or: [condition1, condition2] };
            var data = [];
            result.total = db.chats_files.count(condition);
            if (unlimit > 1)
                result.data = db.chats_files.find(condition).sort({ '_id': -1 }).toArray();
            else
                result.data = db.chats_files.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @addChatStore
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'uploadFileChat',
    value: function (params) {
        var result = { data: [], total: 0, error: 0, msg: "" };
        var d = new Date();
        var obj = {};
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var guest = params.guest;
        var guestid = guest._id == undefined ? "" : guest._id;
        if (userid != "" && guestid != "") {
            var chat = getChats(userid, guestid);
            var chatid = chat._id;
            obj.userid = ObjectId(userid);
            obj.username = user.fullname == undefined ? "" : user.fullname;
            //-----------------------------------------------------------------
            obj.friendid = ObjectId(guestid);
            obj.friendname = guest.fullname == undefined ? "" : guest.fullname;
            //
            obj.filename = params.filename == undefined ? "" : params.filename;
            obj.jtype = params.jtype == undefined ? 0 : params.jtype;
            obj.jtypename = params.jtypename == undefined ? "" : params.jtypename;
            //
            obj.createDate = d.getTime();
            obj.day = d.getDate();
            obj.month = d.getMonth() + 1;
            obj.year = d.getFullYear();
            obj.chatid = chatid;
            obj.usersend = 1;
            obj.ready = 0;
            //
            db.chats_files.insert(obj);
            var row = getListFileChat(params);
            result.data = row.data;
            result.total = row.total;
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @addChatStore
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'removeFileChat',
    value: function (params) {
        var result = { data: [], total: 0, obj: params.data, task: 'remove', error: 0, msg: "" };
        var d = new Date();
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var id = params.data._id == undefined ? "" : params.data._id;
        if (userid != "" && id != "") {
            db.chats_files.remove({ "_id": ObjectId(id) });
            var row = getListFileChat(params);
            result.data = row.data;
            result.total = row.total;
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @addRowChat
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'addRowChat',
    value: function (params) {
        var result = {
            data: [], total: 0, guest: {}, obj: {}, task: 'addrowchat', error: 0, msg: ""
        };
        var d = new Date();
        var user = params.user;
        var userid = getUserId(user);
        var state = params.data;
        var local = params.local;
        var employeeid = state.employeeid == undefined ? "" : state.employeeid;
        var rootid = getRootId(user);
        var companyid = state.companyid == undefined ? "" : state.companyid;
        if (userid != "" && companyid != '') {
            var obj = {};
            var chatid = state.chatid == undefined ? "" : state.chatid;
            if (chatid == '') {
                var objChat = {};
                objChat.userid = ObjectId(userid);
                objChat.username = user.fullname == undefined ? "" : user.fullname;
                objChat.useravatar = user.avatar == undefined ? "" : user.avatar;
                objChat.local = local;
                //-----------------------------------------------------------------
                if (employeeid != '') objChat.employeeid = ObjectId(employeeid);
                objChat.employeename = state.fullname == undefined ? "" : state.fullname;
                objChat.employeeavatar = state.avatar == undefined ? "" : state.avatar;
                objChat.companyid = ObjectId(companyid);
                objChat.companyname = state.companyname == undefined ? "" : state.companyname;
                objChat.companysku = state.companysku == undefined ? "" : state.companysku;
                objChat.companylogo = state.companyname == undefined ? "" : state.companylogo;
                objChat.rootid = ObjectId(rootid);
                var row = getChats(userid, employeeid, rootid, companyid);
                if (row == undefined || row == '') {
                    row = getChats(employeeid, userid, rootid, companyid);
                }
                if (row == undefined || row == '') {
                    objChat.createDate = d.getTime();
                    objChat.day = d.getDate();
                    objChat.month = d.getMonth() + 1;
                    objChat.year = d.getFullYear();
                    chatid = new ObjectId();
                    objChat._id = chatid;
                    objChat.hits = 1;
                    db.chats.insert(objChat);
                } else {
                    chatid = row._id;
                }
                obj.chatid = chatid;
            } else {
                obj.chatid = ObjectId(chatid);
            }
            obj.userid = ObjectId(userid);
            obj.username = user.fullname == undefined ? "" : user.fullname;
            //-----------------------------------------------------------------
            if (employeeid != '') obj.employeeid = ObjectId(employeeid);
            obj.employeename = state.fullname == undefined ? "" : state.fullname;
            //
            obj.content = state.content == undefined ? "" : state.content;
            obj.filename = state.filename == undefined ? "" : state.filename;
            obj.jtypename = state.jtypename == undefined ? "" : state.jtypename;
            obj.jtype = state.jtype == undefined ? 0 : state.jtype;
            //
            obj.rootid = ObjectId(rootid);
            obj.companyid = ObjectId(companyid);
            obj.companyname = state.companyname == undefined ? "" : state.companyname;
            obj.companysku = state.companysku == undefined ? "" : state.companysku;
            obj.companylogo = state.companyname == undefined ? "" : state.companylogo;
            //
            obj.createDate = d.getTime();
            obj.day = d.getDate();
            obj.month = d.getMonth() + 1;
            obj.year = d.getFullYear();
            obj.ready = 0;
            obj.local = local;
            //
            db.chats_items.insert(obj);
            var row = getListChats(params);
            result.data = row.data;
            result.total = row.total;
            result.guest = row.guest;
            result.obj = obj;
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/**
* @function
* @getListChats
* @version
* @param params
*/
db.system.js.save({
    _id: 'getListChats',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], guest: {}, total: 0, error: 0, msg: "" };
        if (userid != '') {
            var search = params.search == undefined ? "" : params.search;
            var companyid = search.companyid == undefined ? "" : search.companyid;
            if (companyid != '') {
                var rootid = getRootId(user);
                var employeeid = search.employeeid == undefined ? "" : search.employeeid;
                var chat = getChats(userid, employeeid, rootid, companyid);
                var chatid = chat._id == undefined ? "" : chat._id; 
                var page = params.limitstart == undefined ? 0 : params.limitstart;
                var numPage = params.limit == undefined ? 10 : params.limit;
                var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
                var strSearch = '';
                if (params.search != undefined && params.search != null) {
                    strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
                }
                var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
                var condition = {};
                condition.rootid = ObjectId(rootid);
                condition.companyid = ObjectId(companyid);    
                if (chatid != '') condition.chatid = chatid;
                if (employeeid != '') {
                    condition.employeeid = ObjectId(employeeid);
                    //condition.userid = ObjectId(userid);
                    var employe = db.employees_accounts.findOne({ _id: condition.employeeid, rootid: ObjectId(rootid), companyid: ObjectId(companyid) }, {_id:1, fullname:1,avatar:1 });
                    result.guest = { _id: employeeid, fullname: employe.fullname, avatar: employe.avatar };
                } else {
                    result.guest.listUsers = getListEmployee(params).data;
                }
                if (strSearch != '') {
                    condition.fullname = whereNE;
                }
                result.total = db.chats_items.count(condition);
                if (unlimit > 1)
                    result.data = db.chats_items.find(condition).sort({ '_id': -1 }).toArray();
                else
                    result.data = db.chats_items.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();
                //  

            } else {
                result.error = 1;
                result.msg = "Chưa xác nhận";
            }
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @removeRowChat
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'removeRowChat',
    value: function (params) {
        var result = { data: [], total: 0, obj: params.data, task: 'removerowchat', error: 0, msg: "" };
        var d = new Date();
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var id = params.data._id == undefined ? "" : params.data._id;
        if (userid != "" && id != "") {
            db.chats_items.remove({ "_id": ObjectId(id), userid: ObjectId(userid) });
            var row = getListChats(params);
            result.data = row.data;
            result.total = row.total;
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/**
* @function
* @getGroupChats
* @version
* @param params
*/
db.system.js.save({
    _id: 'getGroupChats',
    value: function (params) {
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var result = { data: [], total: 0, error: 0, msg: "" };
        var gid = user.gid == undefined ? 0 : user.gid;
        if (userid != '') {
            var page = params.limitstart == undefined ? 0 : params.limitstart;
            var numPage = params.limit == undefined ? 10 : params.limit;
            var unlimit = params.unlimit == undefined ? 0 : params.unlimit;
            var strSearch = '', isNoFriends = 0;
            if (params.search != undefined && params.search != null) {
                strSearch = params.search.txtsearch == undefined ? '' : params.search.txtsearch;
            }
            var whereNE = { $regex: ".*" + strSearch + ".*", $options: "-i" };
            var condition1 = {};
            var condition2 = {};
            condition1.userid = ObjectId(userid);
            condition2["listUsers.userid"] = ObjectId(userid);
            if (strSearch != '') {
                condition1.title = whereNE;
                condition2.title = whereNE;
            }
            var condition = { $or: [condition1, condition2] };
            result.total = db.chats_groups.count(condition);
            if (unlimit > 1)
                result.data = db.chats_groups.find(condition).sort({ '_id': -1 }).toArray();
            else
                result.data = db.chats_groups.find(condition).sort({ '_id': -1 }).skip(page).limit(numPage).toArray();
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @createGroupChat
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'createGroupChat',
    value: function (params) {
        var result = { data: [], total: 0, obj: params.data, task: 'createGroupChat', error: 0, msg: "Tạo nhóm mới thành công" };
        var d = new Date();
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var id = params.data._id == undefined ? "" : params.data._id;
        if (userid != "") {
            var state = params.data;
            var title = state.title == undefined ? "" : state.title;
            var obj = {};
            obj.title = title;
            obj.lastEdit = d.getTime();
            if (id != '') {
                result.msg = "Cập nhập tên nhóm thành công";
                db.chats_groups.update({ _id: ObjectId(id) }, { $set: obj });
            }
            else {
                obj.userid = ObjectId(userid);
                obj.username = user.fullname;
                obj.listUsers = [];
                obj.createDate = d.getTime();
                obj.day = d.getDate();
                obj.month = d.getMonth() + 1;
                obj.year = d.getFullYear();
                db.chats_groups.insert(obj);
            }
            var row = getGroupChats(params);
            result.data = row.data;
            result.total = row.total;
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});
/*
* @function*
* @createGroupChat
* @version 1.0.1
* @duonglong910 @gmail.com
*/
db.system.js.save({
    _id: 'userJoinToGroup',
    value: function (params) {
        var result = { data: {}, total: 0, task: 'userJoinToGroup', error: 0, msg: "Cập nhập không thành công" };
        var d = new Date();
        var user = params.user;
        var userid = user._id == undefined ? "" : user._id;
        var state = params.data;
        var id = state._id == undefined ? "" : state._id;
        if (userid != "" && id != '') {
            var userJoin = state.user == undefined ? "" : state.user;
            var obj = {};
            var listUsers = state.listUsers == undefined ? "" : state.listUsers;
            var userJoinGroup = { userid: ObjectId(userJoin._id), fullname: userJoin.fullname, avatar: userJoin.avatar };
            result.listUsers = listUsers;
            if (listUsers == '' || listUsers.length < 1) {
                listUsers.push(userJoinGroup);
            }
            else {
                listUsers.forEach(function (rows) {
                    if (rows._id != userJoin._id) {
                        listUsers.push(userJoinGroup);
                    }
                });
            }
            obj.listUsers = listUsers;
            result.listUsers = listUsers;
            result.msg = "Cập nhập bạn vào nhóm thành công";
            db.chats_groups.update({ _id: ObjectId(id) }, { $set: obj });
            result.data = db.chats_groups.findOne({ _id: ObjectId(id) });
        }
        else {
            result.error = 1;
            result.msg = "Bạn không có quyền này";
        }
        return result;
    }
});    