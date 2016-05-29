"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var multipart = require('co-multipart');

var home_controller = [{
  method: "get",
  url: "/",
  handler: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ctx.render('index');

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function handler(_x, _x2) {
      return ref.apply(this, arguments);
    }

    return handler;
  }()
}, {
  method: "get",
  url: "/upload",
  handler: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return ctx.render('upload');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function handler(_x3, _x4) {
      return ref.apply(this, arguments);
    }

    return handler;
  }()
}, {
  method: "post",
  url: "/upload",
  handler: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // const files = await multipart(ctx)
              ctx.body = "test";

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function handler(_x5, _x6) {
      return ref.apply(this, arguments);
    }

    return handler;
  }()
}];

exports.default = home_controller;