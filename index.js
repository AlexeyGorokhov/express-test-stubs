'use strict';

const stampit = require('@stamp/it');
const sinon = require('sinon');

const DefaultReq = require('./lib/Req');
const DefaultRes = require('./lib/Res');

module.exports = stampit()
  .init((opts = {}, { instance }) => {
    const {
      req: Req = DefaultReq,
      res: Res = DefaultRes
    } = opts;

    instance.req = Req();
    instance.res = Res();
    instance.next = sinon.spy();

    instance[Symbol.iterator] = function () {
      let index = 0;
      const stubs = [this.req, this.res, this.next];

      return {
        [Symbol.iterator] () {
          return this;
        },
        next () {
          if (index < stubs.length) {
            return {
              value: stubs[index++],
              done: false
            };
          } else {
            return { done: true };
          }
        }
      };
    };
  })
  .statics({
    Req: DefaultReq,
    Res: DefaultRes
  });
