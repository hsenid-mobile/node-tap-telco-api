var NodeCache = require('node-cache');
var t = require('tcomb');
var tValidate = require('tcomb-validation');

var cacheConfig = t.struct({
    stdTTL : t.Num,
    checkperiod : t.maybe(t.Num)
});

var repo = function(config){
    if(tValidate.validate(config, cacheConfig).isValid()) {
        var nodeCache = new NodeCache(config);

        return {
            save : function(key, obj, cb) {
                nodeCache.set(key, obj, config.stdTTL, cb)
            },
            get : function(key, success, error) {
                nodeCache.get(key, function(err, value) {
                    if(!err && !(value[key] === undefined)) {
                        success(value);
                    } else {
                        error();
                    }
                })
            },
            del : function(key) {
                nodeCache.del(key, function(err, count){})
            }

        }
    } else {
        throw "Initialization configuration error."
    }
};


var validateCacheConfig = function(config, success, error) {
    tValidate.validate(config, cacheConfig).isValid()  ? success() : error()
};

module.exports = {
    validateCacheConfig : validateCacheConfig,
    repo : repo
};