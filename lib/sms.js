var clone = require('./utils').clone;

var t = require('tcomb');

var DeliveryReportRequired = t.enums.of('0 1');

var Encoding = t.enums.of('0 240 245');

var Version = t.enums.of('1.0 2.0');

var mtReq = t.struct({
  applicationId : t.Str,
  password : t.Str,
  version : t.maybe(t.Str),
  destinationAddresses : t.Arr,
  message : t.Str,
  sourceAddress : t.maybe(t.Str),
  deliveryStatusRequest : t.maybe(DeliveryReportRequired),
  encoding : t.maybe(Encoding),
  chargingAmount : t.maybe(t.Str),
  binaryHeader : t.maybe(t.Str)
});

var mtResp = t.struct({
  statusCode : t.Str,
  statusDetail : t.Str,
  requestId : t.Str,
  version : t.maybe(Version)
});

var moReq = t.struct({
  message : t.Str,
  sourceAddress : t.Str,
  requestId : t.Str,
  encoding : t.Str,
  version : t.Str
});

var moResp = t.struct({
  statusCode : t.Str,
  statusDetail : t.Str
});

/* config {

}
* applicationId
* password
* */

var requestCreator = function(config) {
  var single = function(mobileNo, message, cb) {
    var sms = clone(config);
    sms.message = message;
    sms.destinationAddresses = [mobileNo]
    cb(sms)
  };

  var broadcast = function(message, cb) {
    var sms = clone(config);
    sms.message = message;
    sms.destinationAddresses = ["tel:all"]
    cb(sms)
  };

  return {
    single : single,
    broadcast : broadcast
  }
};

var successMoResponse = {
  statusCode:"S1000",
  statusDetail:"Successful."
};

module.exports = {
  mtReq : mtReq,
  mtResp : mtResp,
  moReq : moReq,
  moResp : moResp,
  requestCreator : requestCreator,
  successResponse : successMoResponse
};