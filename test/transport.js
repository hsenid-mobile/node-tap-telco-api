var transport = require("../lib/transport");
var assert = require('chai').assert;

describe("Request creation should be successful", function(){
    it("Request creation should be successful", function(){
        transport.createRequest({hostname: 'www.google.com', port: 80, path: '/upload'}, {msg: "hello"}, function(request){
            assert.equal(request.options.headers['Content-Type'], "application/json");
        });
    })
});