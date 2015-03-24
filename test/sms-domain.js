var smsDomain = require("../sms-domain.js");
var expect = require('chai').expect;
var t = require('tcomb-validation');


describe("Validate Request", function(){
    it("Validation should be successful.", function(){
        var mo = {
            "message":"Hello",
            "destinationAddresses":["tel:94232323232"],
            "password":"password",
            "applicationId":"APP_999999"
        };

        var result = t.validate(mo, smsDomain.moMsg).isValid()
        console.log(result)
        expect(result).to.be.ok;
    })
})
