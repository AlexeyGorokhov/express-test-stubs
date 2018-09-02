'use strict';

const stampit = require('stampit');
const sinon = require('sinon');

module.exports = stampit()
  .init((_, { instance }) => {
    instance.status = sinon.spy(function () { return this; });
    instance.end = sinon.spy();
    instance.json = sinon.spy();
    instance.send = sinon.spy();
  });
