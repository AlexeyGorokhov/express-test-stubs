# express-test-stubs

A helper factory function that produces test fakes for the need of unit-testing Express endpoints.

This module makes use of [stampit](https://github.com/stampit-org/stampit) library - an implementation of [Stamp Specification](https://github.com/stampit-org/stamp-specification).

Some properties of objects produced by this factory are [sinon](http://sinonjs.org) spies.


## Installation

```bash
$ npm install --save-dev express-test-stubs
```


## Usage Example

Using default stubs provided by `express-test-stubs`:

```js
/* my-endpoint-handler.test.js */
const test = require('tape');
const ExpressStubs = require('express-test-stubs');

const self = require('./path/to/my-endpoint-handler');

test('normal scenario', async t => {
  try {
    const expressStubs = ExpressStubs();
    const expectedResponsePayload = { foo: 'bar '};

    await self(...expressStubs);

    t.equal(
      expressStubs.res.status.calledWith(200),
      true,
      'should respond with 200 OK'
    );

    t.deepEqual(
      expressStubs.res.json.getCall(0).args[0],
      expectedResponsePayload,
      'should send foo set to bar'
    );

    t.equal(
      expressStubs.next.called,
      false,
      'should not propagate any error'
    );

    t.end();
  } catch (err) {
    t.end(err);
  }
});
```

Using custom stubs:

```js
/* ... */

const expressStubs = ExpressStubs({
  req: ExpressStubs.Req
    .props({
      body: { userId: 'baz' }
    })
});

/* ... */
```


## API Reference

```js
const ExpressStubs = require('express-test-stubs');
```

### {Stamp} ExpressStubs

The main factory function. This is a stampit stamp. Although you can utilize all the features stampit provides, below are the features added to the stamp by `express-test-stubs`.

### Creating default stubs

Just calling `ExpressStubs` factory function without any arguments produces a default object containing default stubs for `req` and `res` objects, and `next` callback function that are usually passed in Express endpoint handlers.

```js
const expressStubs = ExpressStubs();
// or
const { req, res, next } = ExpressStubs();
```

#### {Object} expressStubs

An object with `req`, `res`, and `next` properties that are default stubs.

For your convenience, the `expressStubs` object is iterable over these three properties. So you can use it with destructuring:

```js
myExpressEndpointHandler(...expressStubs);
```


##### {Object} expressStubs.req

Request stub with the default set of properties (see below how you can customize them).

###### {Object} expressStubs.req.body

An empty POJO.

###### {Object} expressStubs.req.query

An empty POJO.



##### {Object} expressStubs.res

Response stub with the following properties:

###### {sinon.spy} expressStubs.res.status

Sinon spy function with an implementation that returns `this` when called by production code - just like Express\` method `status()`.

###### {sinon.spy} expressStubs.res.send

Sinon spy function with empty implementation.

###### {sinon.spy} expressStubs.res.json

Sinon spy function with empty implementation.


### {Stamp} ExpressStubs.Req

Helper static property referencing default stamp that is used internally for producing `req` stubs. Use it as base stamp to compose your own custom stamp to be passed in `ExpressStubs` factory (see below).


### Creating custom stubs

You can pass your custom implementation of the request stamp to `ExpressStubs` factory function to produce an object with your custom implementation of `req` stub. It's recommended to use `ExpressStubs.Req` as the basics for composition:

```js
const expressStubs = ExpressStubs({
  req: ExpressStubs.Req
    .props({
      body: { userId: 'baz' }
    })
});
```
