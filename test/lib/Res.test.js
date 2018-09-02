'use strict';

const test = require('tape');

const Res = require('../../lib/Res');

test('"status" prop', t => {
  const res = Res();

  const resCallResult = res.status();

  t.equal(
    res.status.called,
    true,
    'should have "status" prop which is a spy'
  );

  t.equal(
    resCallResult,
    res,
    'should return this'
  );

  t.end();
});

test('"end" prop', t => {
  const res = Res();

  res.end();

  t.equal(
    res.end.called,
    true,
    'should have "end" prop which is a spy'
  );

  t.end();
});

test('"json" prop', t => {
  const res = Res();

  res.json();

  t.equal(
    res.json.called,
    true,
    'should have "json" prop which is a spy'
  );

  t.end();
});

test('"send" prop', t => {
  const res = Res();

  res.send();

  t.equal(
    res.send.called,
    true,
    'should have "send" prop which is a spy'
  );

  t.end();
});

test('with additional props', t => {
  const additionalPropStub = Symbol('');

  const res = Res
    .props({ additionalProp: additionalPropStub })
    .create();

  t.equal(
    res.additionalProp,
    additionalPropStub,
    'should add additionalProp with passed value'
  );

  t.end();
});
