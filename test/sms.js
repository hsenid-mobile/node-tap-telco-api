var smsDomain = require("../lib/tap.js").sms;
var assert = require('chai').assert;
var t = require('tcomb-validation');


describe("Validate Request", function(){
    it("Mt Request Validation should be successful.", function(){
        var mtReq = {
            "message":"Hello",
            "destinationAddresses":["tel:94232323232"],
            "password":"password",
            "applicationId":"APP_999999"
        };

        var result = t.validate(mtReq, smsDomain.mtReq).isValid()
        assert.ok(result, "Result is okey");
    })
    it("Mt Response validation should be successful.", function(){
        var mtResp = {
            "statusCode":"S1000",
            "statusDetail":"Success",
            "requestId":"MSG_000111",
            "version":"1.0"
        }
        var result = t.validate(mtResp, smsDomain.mtResp).isValid()
        assert.ok(result, "Result is okey");
    })
    it("Mo request validation should be successful", function() {
        var moReq = {
            "message":"my testing message from app1",
            "sourceAddress":"tel:94232323232",
            "requestId":"APP_000001",
            "encoding":"0",
            "version":"1.0"
        }
        var result = t.validate(moReq, smsDomain.moReq)
        assert.ok(result, "Result is okey");
    })
    it("Mo response validation should be successful", function() {
        var moResp = {
            "statusCode":"S1000",
            "statusDetail":"Success"
        };
        var result = t.validate(moResp, smsDomain.moResp)
        assert.ok(result, "Result is okey");
    })
})
