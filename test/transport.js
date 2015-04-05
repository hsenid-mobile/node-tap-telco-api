var transport = require("../lib/transport");
var assert = require('chai').assert;

var sms = require('../lib/sms')

describe("Request creation should be successful", function(){
    it("Request creation should be successful", function(){

        sms.requestCreator({applicationId : "APP_000101", password : "password"}).broadcast("test", function(mtReq){
            transport.createRequest({hostname: '127.0.0.1', port: 7000, path: '/sms/send'}, mtReq, function(request){
                transport.httpClient(request, function(result){
                    result.statusCode
                    console.log(result)
                })
            });
        })
    })
});