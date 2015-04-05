var ussd_ctx_repo = require("./ussd_ctx_repo.js");
var t = require('tcomb');
var tValidate = require('tcomb-validation');

/*
*
* session context
* {
*   view : index,
*   mobileNo: tel:898373839,
*   sessionId : ieueie890,
*   attributes : {
*
*   }
* }
*
* */

/*
* "index" :
*
* {
*   message : function(ctx, req) {
*       return {}
*   }
*
*   handle : function(ctx, req) {
*   }
* }
*
* */
var appConfigStruct =  t.struct({
    applicationId : t.Str,
    password : t.Str
});


var ussd_operations = {
    mo_init : "mo-init",
    mo_cont : "mo-cont",
    mt_init : "mt-init",
    mt_cont : "mt-cont",
    mt_fin  : "mt-fin"
};

var flow_constants = {
    index : "index"
};

var successMoResponse = {
    statusCode:"S1000",
    statusDetail:"Successful."
};

var sessionTimeOutMtMessage = {message : "Ussd session timeout", end : true};

var sessions = function(flow, config, appConfig) {

    if(!tValidate.validate(appConfig, appConfigStruct).isValid()) {
        throw "Application configuration is invalid"
    }

    var repo = ussd_ctx_repo.repo(config);

    var resolve = function(req, callback){

        var ussdMtRequest = function(req, message, appConfig, callback) {

            var sessionNotEnd = !message.end;
            var response = {
                applicationId: appConfig.applicationId,
                password: appConfig.password,
                message: message.message,
                ussdOperation: sessionNotEnd ? ussd_operations.mt_cont : ussd_operations.mt_fin,
                destinationAddress: req.sourceAddress
            };

            if(!sessionNotEnd) {
                repo.del(req.sessionId)
            }

            callback(response)
        };

        if(req.ussdOperation === ussd_operations.mo_init) {
            //
            {
                var ctx = {
                    view : flow_constants.index,
                    mobileNo : req.sourceAddress,
                    sessionId : req.sessionId
                };

                var onSuccess = function(err, success){
                    if(!err && success) {
                        var message = flow[flow_constants.index].message(req, ctx);
                        ussdMtRequest(req, message, appConfig, callback);
                    }
                }

                repo.save(req.sessionId,
                    {view : flow_constants.index,
                        mobileNo : req.sourceAddress,
                        sessionId : req.sessionId
                    }, onSuccess);
            }

        } else {

            var onSuccess = function(value) {
                flow[value[req.sessionId].view].handle(req, value[req.sessionId]);
                repo.save(req.sessionId,
                            value[req.sessionId],
                            ussdMtRequest(req,
                                            flow[value[req.sessionId].view].message(req, value[req.sessionId]),
                                            appConfig,
                                            callback
                            )
                )
            };

            var onFailure = function() {
                ussdMtRequest(req, sessionTimeOutMtMessage, appConfig, callback);
            };

            repo.get(req.sessionId, onSuccess, onFailure);
        }
    }

    return {
        resolve : resolve
    }
};

module.exports = {
    sessions : sessions,
    successMoResponse : successMoResponse
};