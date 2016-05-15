"use strict";

require("babel-polyfill");

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var mongo = require('koa-mongo');
var convert = require('koa-convert');

var app = new _koa2.default();
var router = (0, _koaRouter2.default)();

app.use(convert(mongo({
  host: '52.11.71.140',
  port: 27017,
  user: 'quincy',
  pass: 'dd422',
  db: 'photos_dd'
})));

app.use(function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //ctx.body = await ctx.mongo.db('photos_dd').collection('test').findOne()
            ctx.body = 'test!!';

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
}());

app.listen(3000);
