var path = require('path');
var config = require('config');
var redis = require('redis');
var domain = require('domain').create();  
var server = require(path.join(path.resolve(__dirname), 'modules', 'server'));
function onError(e) {
    //var log = global.logger !== undefined ? global.logger.error : console.error;
    var log = console.error;
    log(e);
}
process.on('uncaughtException', onError);
domain.on('error', onError);         
domain.run(() => {
    // defines         
    global.appRoot = path.resolve(__dirname);
    global.pathComponents = path.join(global.appRoot, 'components');
    global.pathController = path.join(global.appRoot, 'components', 'controllers');
    global.pathModel = path.join(global.appRoot, 'components', 'models');
    global.pathModules = path.join(global.appRoot, 'modules');
    global.pathModelPC = path.join(global.pathModel, 'pc');
    global.pathModelMobile = path.join(global.pathModel, 'mobiles');
    global.config = { dbInfo: config.get('dbInfo'), cacheInfo: config.get('cacheInfo'), mail: config.get("mail"), server: config.get('server') };
    global.util = require(path.join(global.appRoot, 'modules', 'util'));
    global.mail = require(path.join(global.appRoot, 'modules', 'mailler'));
    global.prefix = global.config.server.prefixhost == undefined ? 'http' : global.config.server.prefixhost;
    global.ssl = global.config.server.ssl == undefined ? '' : global.config.server.ssl;
    global.host = global.config.server.host == undefined ? 'localhost' : global.config.server.host;
    global.port = global.config.server.port == undefined ? 2828 : global.config.server.port;
    global.location = global.prefix + global.ssl + ':' + global.host + ':' + global.port;
    global.socketPort = global.config.server.socketPort;
    //config log
    var log4Js = require('log4js');
    log4Js.configure(path.join(global.appRoot, 'config', 'log.conf'), { reloadSecs: 300 });
    var domain = config.get('server.servername');
    global.logger = log4Js.getLogger(domain);
    global.logger.setLevel(config.get('server.logLevel'));
    //
    if (global.util.isNullOrUndefined(global.db)) {
        global.dbAccess = require(path.join(global.appRoot, 'modules', 'dbAccess'));
        global.db = global.dbAccess;
    }
    global.cache = require(path.join(global.pathModules, 'cacheAccess'));
    global.notify = require(path.join(global.pathModules, 'notification'));
    global.users = require(path.join(global.pathModules, 'users'));
    global.modelmailer = require(path.join(global.pathModel, 'model-mailer'));

    // running server
    global.appServer = new server();
    global.appServer.init();
    global.appServer.start();
});