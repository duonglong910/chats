var path = require('path');
var config = require('config');
var express = require('express')();
var expressio = require('express.io')();
var favicon = require('serve-favicon');
var compression = require('compression');
//var minify = require('express-minify');
var redis = require('redis');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty');
var exphbs = require('express-handlebars');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var http = require('http');
var io = require('socket.io');
var fs = require("fs");
const EventEmitter = require('events');
var _: UnderscoreStatic = require('underscore');
var _s: UnderscoreStringStatic = require('underscore.string');
module JMath {
    export class JAppServer implements IAppServer {
        public redisClient;
        public server;
        public io;
        public init() {
            this.regisRedis();
        }
        private regisRedis(): void {
            var cacheInfo = global.config.cacheInfo;
            //var redisClient = this.redisClientt = redis.createClient();
            var redisClient = this.redisClient = redis.createClient(cacheInfo.port, cacheInfo.server, {});
            // if you'd like to select database 3, instead of 0 (default), call
            // client.select(3, function() { /* ... */ });
            redisClient.on('error', err => {
                global.logger.info('Error ' + err);
            });
        }
        public start() {
            var app = this.server = http.createServer(express);
            http.createServer((req, res) => {
                var host = req.headers.host;
                var parseUrl = req.url;
                switch (parseUrl) {
                    case '/':
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end("Welcome to the homepage!");
                        break;
                    case '/about':
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end("Welcome to the about page!");
                        break;
                    default:
                        res.writeHead(404, { "Content-Type": "text/plain" });
                        res.end("404 error! File not found.");
                }
            }).listen(global.port);
            //
            app.redisClient = this.redisClient;
            app.io = io(app);
            // Setup your sessions, just like normal.
            var sessionSecret = config.get('session.secret');
            express.use(cookieParser(sessionSecret));
            express.use(session({
                secret: sessionSecret,
                store: new RedisStore({
                    client: global.redisClient,
                    ttl: Number(config.get('session.timeout'))
                }),
                saveUninitialized: true,
                resave: true,
            }));
            require(path.join(global.appRoot, 'components', 'component')).init(app, passport);
            app.listen(global.socketPort, () => {
                global.logger.trace('Server started on %s port %d.', global.host, global.socketPort);
            });
        }
        public stop() {

        }
    }
}

module.exports = JMath.JAppServer;