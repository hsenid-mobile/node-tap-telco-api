var ussd = require("../lib/tap.js").ussd;
var assert = require('chai').assert;

describe("Session flow should work", function(){
    it("Session flow ", function(){

        var appConfig = {
            applicationId : "APP_000101",
            password : "password"
        };

        var config = { stdTTL: 100, checkperiod: 120 };


       var  flow = {
           'index' : {
               message : function(req, ctx){
                    return {message : "Welcome to node tap info \n1. Source Location \n2. Report Issue \n99. End"}
               },
               handle : function(req, ctx) {
                    if(req.message === "1") {
                        ctx.view = 'source'
                    }
                    if(req.message === "2") {
                       ctx.view = 'report'
                    }
                    if (req.message === "99"){
                       ctx.view = "end"
                   }
               }
           },

           'source' : {
               message : function(req, ctx){
                   return {message : "https://github.com/isuruanu/node-tap-telco-api.git \n0. Back\n99. End"}
               },
               handle : function(req, ctx) {
                   if(req.message === "0") {
                       ctx.view = "index"
                   }
                   if (req.message === "99"){
                       ctx.view = "end"
                   }
               }
           },

           'report' : {
               message : function(req, ctx){
                   return {message : "https://github.com/isuruanu/node-tap-telco-api/issues \n0. Back\n99. End"}
               },
               handle : function(req, ctx) {
                   if(req.message === "0") {
                       ctx.view = "index"
                   }
                   if (req.message === "99"){
                       ctx.view = "end"
                   }
               }
           },

           'end' : {
               message : function(req, ctx){
                   return {message : "Bye Bye", end:true}
               }
           }

       };

        var sessions = ussd.sessions(flow, config, appConfig);

/*        sessions.resolve( {
            message: "*141#",
            ussdOperation: "mo-cont",
            requestId: "1330933229901",
            sessionId: "1330929317043",
            encoding: "440",
            sourceAddress: "tel:94232323232",
            applicationId: "APP_000001",
            version: "1.0"
        }, function(ussdMtRequest){
            assert.equal(ussdMtRequest.ussdOperation, "mt-fin")
        })*/


        sessions.resolve( {
            message: "*141#",
            ussdOperation: "mo-init",
            requestId: "1330933229901",
            sessionId: "1330929317043",
            encoding: "440",
            sourceAddress: "tel:94232323232",
            applicationId: "APP_000001",
            version: "1.0"
        }, function(ussdMtRequest){
            console.log(ussdMtRequest)
            assert.equal(ussdMtRequest.ussdOperation, "mt-cont")
        })

        sessions.resolve( {
            message: "1",
            ussdOperation: "mo-cont",
            requestId: "1330933229901",
            sessionId: "1330929317043",
            encoding: "440",
            sourceAddress: "tel:94232323232",
            applicationId: "APP_000001",
            version: "1.0"
        }, function(ussdMtRequest){
            console.log(ussdMtRequest)
            assert.equal(ussdMtRequest.ussdOperation, "mt-cont")
        })

        sessions.resolve( {
            message: "0",
            ussdOperation: "mo-cont",
            requestId: "1330933229901",
            sessionId: "1330929317043",
            encoding: "440",
            sourceAddress: "tel:94232323232",
            applicationId: "APP_000001",
            version: "1.0"
        }, function(ussdMtRequest){
            console.log(ussdMtRequest)
            assert.equal(ussdMtRequest.ussdOperation, "mt-cont")
        })

        sessions.resolve( {
            message: "2",
            ussdOperation: "mo-cont",
            requestId: "1330933229901",
            sessionId: "1330929317043",
            encoding: "440",
            sourceAddress: "tel:94232323232",
            applicationId: "APP_000001",
            version: "1.0"
        }, function(ussdMtRequest){
            console.log(ussdMtRequest)
            assert.equal(ussdMtRequest.ussdOperation, "mt-cont")
        })

        sessions.resolve( {
            message: "99",
            ussdOperation: "mo-cont",
            requestId: "1330933229901",
            sessionId: "1330929317043",
            encoding: "440",
            sourceAddress: "tel:94232323232",
            applicationId: "APP_000001",
            version: "1.0"
        }, function(ussdMtRequest){
            console.log(ussdMtRequest)
            assert.equal(ussdMtRequest.ussdOperation, "mt-fin")
        })

    })
});

