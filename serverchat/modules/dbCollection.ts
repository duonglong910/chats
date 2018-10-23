var path = require('path');
var ObjectID = require('mongoskin').ObjectID;

module JMath {
    export class DbCollection {
        public dbAccess: DbAccess;
        private collectionName: string;
        constructor(connectionName: string, dbAccess?: DbAccess) {
            this.collectionName = connectionName;
            this.dbAccess = dbAccess || global.dbAccess;
        }
        public create(document: any, cb: { (err, docs: any[]): void }): void {
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.insert(document, (err, docs) => {
                if (err) global.logger.error('DbCollection.create', err);
                if (global.util.isFunction(cb))
                    cb(err, docs);
            });
        }
        public update(expression: Object, document: Object, options: Object, cb?: { (err, docs: any[], db?): void }): void {
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.update(expression, document, options, (err, docs) => {
                if (err) global.logger.error('DbCollection.update', err);
                if (global.util.isFunction(cb))
                    cb(err, docs);
            });
        }
        public updateById(id: string, document: Object, cb: { (err, doc: any, db?): void }): void {
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.updateById(id, document, (err, doc) => {
                if (err) global.logger.error('DbCollection.updateById', err);
                if (global.util.isFunction(cb))
                    cb(err, doc);
            });
        }

        public find(expression: Object, cb: { (cursor): void }): void {
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            var cursor = collection.find(expression);
            if (global.util.isFunction(cb))
                cb(cursor);
        }

        public findOne(expression: Object, cb: { (err, doc: any, db?): void }): void {
            global.logger.trace('DbCollection.findOne', expression);
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.findOne(expression, (err, doc: any) => {
                if (err) global.logger.error('DbCollection.findOne', err);
                if (global.util.isFunction(cb))
                    cb(err, doc);
            });
        }
        public findById(id: string, cb: { (err, doc: any, db?): void }): void {
            global.logger.trace('DbCollection.findById', id);
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.findOne({ _id: new ObjectID(id) }, (err, doc: any) => {
                if (err) global.logger.error('DbCollection.findById', err);
                if (global.util.isFunction(cb))
                    cb(err, doc);
            });
        }

        public remove(expression: Object, cb: { (err, totalEffectedItems: number, db?): void }): void {
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.remove(expression, (err, totalEffectedItems) => {
                if (err) global.logger.error('DbCollection.remove', err);
                if (global.util.isFunction(cb))
                    cb(err, totalEffectedItems);
            });
        }
        public removeById(id: string, cb: { (err, totalEffectedItems: number, db?): void }): void {
            var db = this.dbAccess.connect();
            var collection = db.collection(this.collectionName);
            collection.remove(id, (err, totalEffectedItems) => {
                if (err) global.logger.error('DbCollection.removeById', err);
                if (global.util.isFunction(cb))
                    cb(err, totalEffectedItems);
            });
        }
    }
}

module.exports = JMath.DbCollection;