'use strict';

const test = require('tape');

const Self = require('../');
const Req = require('../lib/Req');
const Res = require('../lib/Res');

test('default "req" prop', t => {
  const expectedReqProp = Req();

  const expressStubs = Self();

  t.deepEqual(
    expressStubs.req,
    expectedReqProp,
    'should have "req" prop with default value'
  );

  t.end();
});

test('custom "req" prop', t => {
  const CustomReqStub = Req
    .props({ additionalProp: Symbol('') });
  const expectedReqProp = CustomReqStub();

  const expressStubs = Self({
    req: CustomReqStub
  });

  t.deepEqual(
    expressStubs.req,
    expectedReqProp,
    'should have "req" prop with passed value'
  );

  t.end();
});

test('"res" prop', t => {
  const expectedResProp = Res();

  const expressStubs = Self();

  t.deepEqual(
    Object.keys(expressStubs.res),
    Object.keys(expectedResProp),
    'should have "res" prop with default value'
  );

  t.end();
});

test('"next" prop', t => {
  const expressStubs = Self();

  expressStubs.next();

  t.equal(
    expressStubs.next.called,
    true,
    'should have "next" prop which is a spy'
  );

  t.end();
});

test('iteration', t => {
  const expressStubs = Self();
  const expectedResult = [expressStubs.req, expressStubs.res, expressStubs.next];

  const result = [...expressStubs];

  t.deepEqual(
    result,
    expectedResult,
    'should correctly iterate over props'
  );

  t.end();
});

test('static helpers', t => {
  t.equal(
    Self.Req,
    Req,
    'should include "Req" static helper'
  );

  t.end();
});
