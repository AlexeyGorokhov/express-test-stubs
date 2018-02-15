'use strict';

const stampit = require('stampit');
const sinon = require('sinon');

const DefaultReq = require('./lib/Req');
const DefaultRes = require('./lib/Res');

module.exports = stampit()
  .init((opts = {}, { instance }) => {
    const { req: Req = DefaultReq } = opts;

    instance.req = Req();
    instance.res = DefaultRes();
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
    Req: DefaultReq
  });
