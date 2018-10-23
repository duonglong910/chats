var path = require('path');
module JMath {
    export class JCpanelModelCpanel {
        /**
         * getBusiness
         * @param params
         * @param cb
         */
        public getBusiness(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getBusiness...');
            global.db.callFunc('getBusiness',
                [params],
                (error, result) => {
                    // global.logger.info("getBusiness--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getBusiness->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getGroups
         * @param params
         * @param cb
         */
        public saveAccountCompany(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.saveAccountCompany...');
            var pwd = global.util.createPasswordRandom(params.data.email, params.data.pwd);
            var apikey = global.util.createPasswordRandom(params.data.email, params.domain);
            var secretId = global.util.createPasswordRandom(params.data.domain, params.domain);
            var keyCheck = global.util.createPasswordRandom(secretId, apikey);
            params.data.pwd = pwd;
            params.data.apikey = apikey;
            params.data.secretId = secretId;
            params.data.keyCheck = keyCheck;
            params.data.ipserver = global.util.getIpAddress();
            params.data.ip = global.util.getIpClient();
            params.data.ipclient = params.ipClientId == undefined ? "" : global.util.getIpClient();

            global.db.callFunc('saveAccountCompany',
                [params],
                (error, result) => {
                    // global.logger.info("saveAccountCompany--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.saveAccountCompany->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getGroups
         * @param params
         * @param cb
         */
        public getGroups(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getGroups...');
            global.db.callFunc('getGroups',
                [params],
                (error, result) => {
                    // global.logger.info("getGroups--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getGroups->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getListApp
         * @param params
         * @param cb
         */
        public getListApp(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getListApp...');
            global.db.callFunc('getListApp',
                [params],
                (error, result) => {
                    //global.logger.info("getListApp--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getListApp->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
       * getItemLisFunction
       * @param params
       * @param cb
       */
        public getItemLisFunction(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getItemLisFunction...');
            global.db.callFunc('getItemLisFunction',
                [params],
                (error, result) => {
                    global.logger.info("getItemLisFunction--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getItemLisFunction->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveItemTcode
         * @param params
         * @param cb
         */
        public saveItemTcode(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.saveItemTcode...');
            global.db.callFunc('saveItemTcode',
                [params],
                (error, result) => {
                    //global.logger.info("saveItemTcode--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.saveItemTcode->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getItemLisFunction
         * @param params
         * @param cb
         */
        public getItemListProcess(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getItemListProcess...');
            global.db.callFunc('getItemListProcess',
                [params],
                (error, result) => {
                    //global.logger.info("getItemListProcess--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getItemListProcess->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //
        /**
         * saveTaskProcess
         * @param params
         * @param cb
         */
        public saveTaskProcess(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.saveTaskProcess...');
            global.db.callFunc('saveTaskProcess',
                [params],
                (error, result) => {
                    global.logger.info("saveTaskProcess--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.saveTaskProcess->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getItemEmployeeProcess
         * @param params
         * @param cb
         */
        public getItemEmployeeProcess(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getItemEmployeeProcess...');
            global.db.callFunc('getItemEmployeeProcess',
                [params],
                (error, result) => {
                    //global.logger.info("getItemEmployeeProcess--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getItemEmployeeProcess->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * checkPermission
         * @param params
         * @param cb
         */
        public checkPermission(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.checkPermission...');
            global.db.callFunc('checkPermission',
                [params],
                (error, result) => {
                    //global.logger.info("checkPermission--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.checkPermission->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getCountry
         * @param params
         * @param cb
         */
        public getCountry(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getCountry...');
            global.db.callFunc('getCountry',
                [params],
                (error, result) => {
                    //global.logger.info("getCountry--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getCountry->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveCountry
         * @param params
         * @param cb
         */
        public saveCountry(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveCountry...');
            global.db.callFunc('saveCountry',
                [params],
                (error, result) => {
                    //global.logger.info("saveCountry--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveCountry->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getItemComponents
         * @param params
         * @param cb
         */
        public getItemComponents(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getItemComponents...');
            global.db.callFunc('getItemComponents',
                [params],
                (error, result) => {
                    //global.logger.info("getItemComponents--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getItemComponents->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
        * getMyItemComponents
        * @param params
        * @param cb
        */
        public getMyItemComponents(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getMyItemComponents...');
            global.db.callFunc('getMyItemComponents',
                [params],
                (error, result) => {
                    //global.logger.info("getMyItemComponents--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getMyItemComponents->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getListCity
         * @param params
         * @param cb
         */
        public getCity(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getCity...');
            global.db.callFunc('getCity',
                [params],
                (error, result) => {
                    //global.logger.info("getCity--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getCity->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveCity
         * @param params
         * @param cb
         */
        public saveCity(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.savecity...', params);
            global.db.callFunc('saveCity',
                [params],
                (error, result) => {
                    global.logger.info("savecity--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.savecity->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }

        /**
         * getDistrict
         * @param params
         * @param cb
         */
        public getDistrict(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getDistrict...');
            global.db.callFunc('getDistrict',
                [params],
                (error, result) => {
                    //global.logger.info("getDistrict--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getDistrict->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveDistrict
         * @param params
         * @param cb
         */
        public saveDistrict(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveDistrict...');
            global.db.callFunc('saveDistrict',
                [params],
                (error, result) => {
                    //global.logger.info("saveDistrict--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveDistrict->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getCareer
         * @param params
         * @param cb
         */
        public getCareer(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getCareer...');
            global.db.callFunc('getCareer',
                [params],
                (error, result) => {
                    //global.logger.info("getCareer--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getCareer->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveCareer
         * @param params
         * @param cb
         */
        public saveCareer(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveCareer...');
            global.db.callFunc('saveCareer',
                [params],
                (error, result) => {
                    //global.logger.info("saveCareer--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveCareer->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
       * getKyapdung
       * @param params
       * @param cb
       */
        public getKyapdung(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getKyapdung...');
            global.db.callFunc('getKyapdung',
                [params],
                (error, result) => {
                    //global.logger.info("getKyapdung--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getKyapdung->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveKyapdung
         * @param params
         * @param cb
         */
        public saveKyapdung(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveKyapdung...');
            global.db.callFunc('saveKyapdung',
                [params],
                (error, result) => {
                    //global.logger.info("saveKyapdung--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveKyapdung->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getListUser
         * @param params
         * @param cb
         */
        public getListUser(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getListUser...');
            global.db.callFunc('getListUser',
                [params],
                (error, result) => {
                    //global.logger.info("getListUser--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getListUser->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveUser
         * @param params
         * @param cb
         */
        public saveUser(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveUser...');
            var pwdid = "";
            if (params.data.pwd == undefined || params.data.pwd == '' || params.data.pwd == null) {
                pwdid = "";
            } else {
                pwdid = global.util.createPasswordRandom(params.data.email, params.data.pwd);
            }
            var apikey = global.util.createPasswordRandom(params.user.email, params.domain);
            var secretId = global.util.createPasswordRandom(params.user.domain, params.domain);
            var keyCheck = global.util.createPasswordRandom(secretId, apikey);
            params.data.keyid = keyCheck;
            params.data.ip = global.util.getIpClient();
            params.ipclient = params.ipClientId;
            params.ipserver = global.util.getIpAddress();
            params.data.pwdid = pwdid;
            global.db.callFunc('saveUser',
                [params],
                (error, result) => {
                    //global.logger.info("saveUser--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveUser->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
          * getItemApps
          * @param params
          * @param cb
          */
        public getItemApps(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getItemApps...');
            global.db.callFunc('getItemApps',
                [params],
                (error, result) => {
                    //global.logger.info("getItemApps--->", getItemApps);
                    if (error) global.logger.error('JCpanelModelCpanel.getItemApps->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveSetting
        public getSetting(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getSetting...');
            global.db.callFunc('getSetting',
                [params],
                (error, result) => {
                    //global.logger.info("login--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getSetting->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveSetting
        public saveSetting(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveSetting...');
            global.db.callFunc('saveSetting',
                [params],
                (error, result) => {
                    //global.logger.info("login--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveSetting->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //updateItemAppUsers
        public updateItemAppUsers(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.updateItemAppUsers...');
            global.db.callFunc('updateItemAppUsers',
                [params],
                (error, result) => {
                    //global.logger.info("updateItemAppUsers--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.updateItemAppUsers->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getAlertCalendar
        public getAlertCalendar(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getAlertCalendar...');
            global.db.callFunc('getAlertCalendar',
                [params],
                (error, result) => {
                    //global.logger.info("getAlertCalendar--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getAlertCalendar->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getItemGroups
        public getItemGroups(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getItemGroups...');
            global.db.callFunc('getItemGroups',
                [params],
                (error, result) => {
                    //global.logger.info("getItemGroups--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getItemGroups->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getItemGroups
        public saveItemApps(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveItemApps...');
            global.db.callFunc('saveItemApps',
                [params],
                (error, result) => {
                    //global.logger.info("saveItemApps--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveItemApps->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //-updateItemApps
        public updateItemApps(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.updateItemApps...');
            global.db.callFunc('updateItemApps',
                [params],
                (error, result) => {
                    //global.logger.info("updateItemApps--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.updateItemApps->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //-getActions
        public getActions(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getActions...');
            global.db.callFunc('getActions',
                [params],
                (error, result) => {
                    //global.logger.info("getActions--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getActions->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //updateLibsFunctions
        public saveItemLisFunction(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveItemLisFunction...');
            global.db.callFunc('saveItemLisFunction',
                [params],
                (error, result) => {
                    //global.logger.info("saveItemLisFunction--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveItemLisFunction->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getMyItemNotification
        public getMyItemNotification(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getMyItemNotification...');
            global.db.callFunc('getMyItemNotification',
                [params],
                (error, result) => {
                    //global.logger.info("getMyItemNotification--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getMyItemNotification->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //verifyItemWork
        public verifyItemWork(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.verifyItemWork...');
            global.db.callFunc('verifyItemWork',
                [params],
                (error, result) => {
                    //global.logger.info("verifyItemWork--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.verifyItemWork->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getMyEmployeesCompany
        public getMyEmployeesCompany(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getMyEmployeesCompany...');
            global.db.callFunc('getMyEmployeesCompany',
                [params],
                (error, result) => {
                    //global.logger.info("getMyEmployeesCompany--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getMyEmployeesCompany->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveItemComponent
        public saveItemComponent(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveItemComponent...');
            global.db.callFunc('saveItemComponent',
                [params],
                (error, result) => {
                    //global.logger.info("saveItemComponent--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveItemComponent->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getItemComponentApps
        public getItemComponentApps(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getItemComponentApps...');
            global.db.callFunc('getItemComponentApps',
                [params],
                (error, result) => {
                    //global.logger.info("getItemComponentApps--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getItemComponentApps->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveVerifyCompany
        public saveVerifyCompany(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveVerifyCompany...');
            global.db.callFunc('saveVerifyCompany',
                [params],
                (error, result) => {
                    //global.logger.info("saveVerifyCompany--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveVerifyCompany->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getItemComponnets
        public getItemComponnets(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getItemComponnets...');
            global.db.callFunc('getItemComponnets',
                [params],
                (error, result) => {
                    //global.logger.info("getItemComponnets--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getItemComponnets->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //installModulesCompany
        public installModulesCompany(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.installModulesCompany...');
            global.db.callFunc('installModulesCompany',
                [params],
                (error, result) => {
                    //global.logger.info("installModulesCompany--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.installModulesCompany->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //updateOrganizationmapCompany
        public updateOrganizationmapCompany(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.updateOrganizationmapCompany...');
            global.db.callFunc('updateOrganizationmapCompany',
                [params],
                (error, result) => {
                    //global.logger.info("updateOrganizationmapCompany--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.updateOrganizationmapCompany->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getRootApps
        public getRootApps(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JUsersModelUsers.getRootApps...');
            global.db.callFunc('getRootApps',
                [params],
                (error, result) => {
                    //global.logger.info("getRootApps--->", result);
                    if (error) global.logger.error('JUsersModelUsers.getRootApps->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getApps
        public getApps(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JUsersModelUsers.getApps...');
            global.db.callFunc('getApps',
                [params],
                (error, result) => {
                    //global.logger.info("getApps--->", result);
                    if (error) global.logger.error('JUsersModelUsers.getApps->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
          * installApp
          * @param params
          * @param cb
          */
        public installApp(params, cb?: { (err, docs: any[]): void }): void {
            global.db.callFunc('installApp',
                [params],
                (error, result) => {
                    //  global.logger.info("installApp--->", result);
                    if (error) global.logger.error('JUsersModelUsers.installApp->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getSalary
        public getQuoctich(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.getQuoctich...');
            global.db.callFunc('getQuoctich',
                [params],
                (error, result) => {
                    global.logger.info("getQuoctich--->");
                    if (error) global.logger.error('JCpanelModelCpanel.getQuoctich->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveSalary
        public saveQuoctich(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.saveQuoctich...');
            global.db.callFunc('saveQuoctich',
                [params],
                (error, result) => {
                    global.logger.info("saveQuoctich--->");
                    if (error) global.logger.error('JCpanelModelCpanel.saveQuoctich->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getSalary
        public getTongiao(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.getTongiao...');
            global.db.callFunc('getTongiao',
                [params],
                (error, result) => {
                    global.logger.info("getTongiao--->");
                    if (error) global.logger.error('JCpanelModelCpanel.getTongiao->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveTongiao
        public saveTongiao(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.saveTongiao...');
            global.db.callFunc('saveTongiao',
                [params],
                (error, result) => {
                    global.logger.info("saveTongiao--->");
                    if (error) global.logger.error('JCpanelModelCpanel.saveTongiao->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getDantoc
        public getDantoc(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.getDantoc...');
            global.db.callFunc('getDantoc',
                [params],
                (error, result) => {
                    global.logger.info("getDantoc--->");
                    if (error) global.logger.error('JCpanelModelCpanel.getDantoc->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveDantoc
        public saveDantoc(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.saveDantoc...');
            global.db.callFunc('saveDantoc',
                [params],
                (error, result) => {
                    global.logger.info("saveDantoc--->");
                    if (error) global.logger.error('JCpanelModelCpanel.saveDantoc->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }

        /**
         * getTinhoc
         * @param params
         * @param cb
         */
        public getTinhoc(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getTinhoc...');
            global.db.callFunc('getTinhoc',
                [params],
                (error, result) => {
                    //global.logger.info("getTinhoc--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getTinhoc->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveTinhoc
         * @param params
         * @param cb
         */
        public saveTinhoc(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveTinhoc...');
            global.db.callFunc('saveTinhoc',
                [params],
                (error, result) => {
                    //global.logger.info("saveTinhoc--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveTinhoc->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //getDoluong
        public getDoluong(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.getDoluong...');
            global.db.callFunc('getDoluong',
                [params],
                (error, result) => {
                    global.logger.info("getDoluong--->");
                    if (error) global.logger.error('JCpanelModelCpanel.getDoluong->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //saveDoluong
        public saveDoluong(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JCpanelModelCpanel.saveDoluong...');
            global.db.callFunc('saveDoluong',
                [params],
                (error, result) => {
                    global.logger.info("saveDoluong--->");
                    if (error) global.logger.error('JCpanelModelCpanel.saveDoluong->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
     * getHocvan
     * @param params
     * @param cb
     */
        public getHocvan(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getHocvan...');
            global.db.callFunc('getHocvan',
                [params],
                (error, result) => {
                    //global.logger.info("getHocvan--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getHocvan->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveTinhoc
         * @param params
         * @param cb
         */
        public saveHocvan(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveHocvan...');
            global.db.callFunc('saveHocvan',
                [params],
                (error, result) => {
                    //global.logger.info("saveHocvan--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveHocvan->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
        * getLanguages
        * @param params
        * @param cb
        */
        public getLanguages(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JCpanelModelCpanel.getLanguages...');
            global.db.callFunc('getLanguages',
                [params],
                (error, result) => {
                    //global.logger.info("login--->", result);
                    if (error) global.logger.error('JCpanelModelCpanel.getLanguages->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveLanguages
         * @param params
         * @param cb
         */
        public saveLanguages(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveLanguages...');
            global.db.callFunc('saveLanguages',
                [params],
                (error, result) => {
                    //global.logger.info("saveLanguages--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveLanguages->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
       * getUnits
       * @param params
       * @param cb
       */
        public getUnits(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getUnits...');
            global.db.callFunc('getItemUnit',
                [params],
                (error, result) => {
                    //global.logger.info("getUnits--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getUnits->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
     * saveUnits
     * @param params
     * @param cb
     */
        public saveUnits(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveUnits...');
            global.db.callFunc('saveUnits',
                [params],
                (error, result) => {
                    //global.logger.info("saveUnits--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveUnits->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
      * getItemUnitPrice
      * @param params
      * @param cb
      */
        public getItemUnitPrice(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getItemUnitPrice...');
            global.db.callFunc('getItemUnitPrice',
                [params],
                (error, result) => {
                    //global.logger.info("getItemUnitPrice--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getItemUnitPrice->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * saveUnitPrice
         * @param params
         * @param cb
         */
        public saveUnitPrice(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.saveUnitPrice...');
            global.db.callFunc('saveUnitPrice',
                [params],
                (error, result) => {
                    //global.logger.info("saveUnitPrice--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.saveUnitPrice->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getTypeMoney
         * @param params
         * @param cb
         */
        public getTypeMoney(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getTypeMoney...');
            global.db.callFunc('getTypeMoney',
                [params],
                (error, result) => {
                    //global.logger.info("getTypeMoney--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getTypeMoney->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getAccounting
         * @param params
         * @param cb
         */
        public getAccounting(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getAccounting...');
            global.db.callFunc('getAccounting',
                [params],
                (error, result) => {
                    //global.logger.info("getAccounting--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getAccounting->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
       * getVirAccounting
       * @param params
       * @param cb
       */
        public getVirAccounting(params, cb?: { (err, docs: any): void }): void {
            global.logger.info('JCpanelModelCpanel.getVirAccounting...');
            global.db.callFunc('getVirAccounting',
                [params],
                (error, result) => {
                    //global.logger.info("getVirAccounting--->", result);
                    if (error) { global.logger.error('JCpanelModelCpanel.getVirAccounting->', error); }
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //----------------------------------------------------------
    }
}
module.exports = new JMath.JCpanelModelCpanel();