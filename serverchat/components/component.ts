var fs = require("fs");
var path = require('path');
var config = require('config');
var _: UnderscoreStatic = require('underscore');
var _s: UnderscoreStringStatic = require('underscore.string');
var clone = require('clone');

module JMath {
    export class DefaultRoute implements IRoute {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        /**
         * init
         * @param app
         * @param passport
         */
        public init(app, passport) {
            //
            global.logger.trace('Socket.init');
            // Setup the ready route, and emit talk event.
            app.io.on('connection', function (socket) {
                var ioRouteDir = path.join(__dirname, 'controllers');
                var files: string[] = fs.readdirSync(ioRouteDir);
                _.each(files, file => {
                    if (!_s.endsWith(file, '.js')) return;
                    var route: IRoute = require(path.join(ioRouteDir, file));
                    app.socket = socket;
                    route.init(socket, passport);
                });
            });
        }
        /**
         * @param err
         * @param req
         * @param res
         * @param next
         */
        private logErrors(err, req, res, next) {
            global.logger.error(err.stack);
            next(err);
        }
        /**
         * clientErrorHandler
         * @param err
         * @param req
         * @param res
         * @param next
         */
        //private clientErrorHandler(err, req, res, next) {
        //    if (req.xhr) {
        //        res.send(500, { error: 'Something blew up!' });
        //    } else {
        //        next(err);
        //    }
        //}
        /**
         * errorHandler
         * @param err
         * @param req
         * @param res
         * @param next
         */
        //private errorHandler(err, req, res, next) {
        //    res.status(500);
        //    res.render('error', { error: err });
        //}
    }
}

module.exports = new JMath.DefaultRoute();