// domain.js

var t = require('tcomb');

// a subtype is a pair (type, predicate)
// where predicate is a function with signature (x) -> boolean
var Password = t.subtype(t.Str, function (s) {
  return s.length >= 6;
});

// enum
var Locale = t.enums.of('it_IT en_US');

// a struct is a type containing properties (i.e. a class)
var SignUpInput = t.struct({
  username: t.Str,          // string type
  password: Password,
  locale:   t.maybe(Locale) // maybe means optional
});

var SignUpOutput = t.struct({
  id:       t.Num,          // number type
  username: t.Str,
  locale:   t.maybe(Locale)
});

module.exports = {
  Password:     Password,
  Locale:       Locale,
  SignUpInput:  SignUpInput,
  SignUpOutput: SignUpOutput
};