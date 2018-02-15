'use strict';

const test = require('tape');

const Req = require('../../lib/Req');

test('ordinary usage', t => {
  const req = Req();

  t.deepEqual(
    req.body,
    {},
    'should include "body" prop set to an empty object'
  );

  t.deepEqual(
    req.query,
    {},
    'should include "query" prop set to an empty object'
  );

  t.end();
});

test('with overwriting default props', t => {
  const bodyStub = {};
  const queryStub = {};

  const req = Req
    .props({
      body: bodyStub,
      query: queryStub
    })
    .create();

  t.equal(
    req.body,
    bodyStub,
    'should override "body" prop with passed value'
  );

  t.equal(
    req.query,
    queryStub,
    'should override "query" prop with passed value'
  );

  t.end();
});

test('with additional props', t => {
  const additionalPropStub = {};

  const req = Req
    .props({
      additionalProp: additionalPropStub
    })
    .create();

  t.equal(
    req.additionalProp,
    additionalPropStub,
    'should add additional prop with passed value'
  );

  t.end();
});
