var expect = require('chai').expect;
var utils = require('../index');

describe("#max,min" , function() {
    it("finding min successfully.", function(){
        expect(utils.min(2, 3)).to.equal(2);
    });
    it("finding max successfully.", function(){
        expect(utils.max(2, 3)).to.equal(3);
    });
})