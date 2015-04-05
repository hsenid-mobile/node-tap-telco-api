var transport = require("../lib/transport");
var assert = require('chai').assert;

describe("Request creation should be successful", function(){
    it("Request creation should be successful", function(){

        var mtReq = {
            message:"Hello",
            password:"password",
            sourceAddress:"77000",
            destinationAddresses:["tel:94232323232"],
            applicationId:"APP_999999",
            encoding:"0",
            version:"1.0"
        };

        transport.createRequest({hostname: '127.0.0.1', port: 7000, path: '/sms/send'}, mtReq, function(request){
            transport.httpClient(request, function(result){
                console.log(result)
            })
        });
    })
});