var ussd_ctx_repo = require("../lib/ussd/ussd_ctx_repo");
var assert = require('chai').assert;

describe("Validate cache config", function(){
    it("Cache config should be validated successfully.", function(){
        var config = { stdTTL: 100, checkperiod: 120 };

        ussd_ctx_repo.validateCacheConfig(config, function(){
            assert.ok(true, "Success")
        }, function() {
            assert.ok(false, "Failure")
        })
    });
    it("Cache invalid config should be invalidated successfully.", function(){
        var config = { std: 100, checkperiod: 120 };

        ussd_ctx_repo.validateCacheConfig(config, function(){
            assert.ok(false, "Failure")
        }, function() {
            assert.ok(true, "Success")
        })
    })

    var config = { stdTTL: 100, checkperiod: 120 };
    var repo = ussd_ctx_repo.repo(config);

    it("Save cache should be success", function(){
        repo.save("uidjdj", {mobileNo : "tel:89282728"}, function(){
            assert.ok(true, "Success")
        }, function() {
            assert.ok(false, "Failure")
        })
    })
    it("Retrieve from cache should be success", function(){
        repo.get("uidjdj", function(value){
            assert.equal(value.uidjdj.mobileNo, "tel:89282728");
            assert.ok(true, "Success")
        }, function() {
            assert.ok(false, "Failure")
        })
    })
});
