var smsDomain = require("../sms-domain.js");
var expect = require('chai').expect;
var t = require('tcomb-validation');


describe("Validate Request", function(){
    it("Validation should be successful.", function(){
        var result = t.validate({"username" : "node_lover", "password" : "passwd", "locale":"en_US"}, smsDomain.SignUpInput).isValid()
        console.log(result)
        expect(result).to.be.ok;
    })
})
