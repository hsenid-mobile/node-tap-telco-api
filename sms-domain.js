var t = require('tcomb');

var DeliveryReportRequired = t.enums.of('0 1');

var Encoding = t.enums.of('0 240 245');

var moMsg = t.struct({
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

module.exports = {
  moMsg : moMsg
};