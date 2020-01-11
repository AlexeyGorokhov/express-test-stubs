'use strict';

const stampit = require('@stamp/it');
const sinon = require('sinon');

module.exports = stampit()
  .init((_, { instance }) => {
    instance.status = instance.status || sinon.spy(function () { return this; });
    instance.end = instance.end || sinon.spy();
    instance.json = instance.json || sinon.spy();
    instance.send = instance.send || sinon.spy();
  });
