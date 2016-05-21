"use strict";

require("babel-polyfill");

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _controllers = require("./transform/controllers");

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongo = require('koa-mongo');
var convert = require('koa-convert');
var router = require('koa-router')();
var app = new _koa2.default();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _controllers2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var item = _step.value;

    router[item.method](item.url, item.handler);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

app.use(convert(mongo({
  host: '52.11.71.140',
  port: 27017,
  user: 'quincy',
  pass: 'dd422',
  db: 'photos_dd'
})));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
