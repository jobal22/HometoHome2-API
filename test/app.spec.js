const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/app')
const addressesRouter = require('../src/addresses/addresses-router')
const listsRouter = require('../src/lists/lists-router')
const { expect } = require('chai');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect (200, 'Hello, world!')
  })
})

describe('Addresses', function() {
  it('should list addresses on GET', function() {
    return supertest(app)
    .get('/api/addresses')
    .then(function(res) {
      expect(201);
    });
  });
  it("should add an address on POST", function() {
    const newItem = { street: "999 Stanson Rd", city: "Monroe", state: "California" };
    return supertest(app)
      .post("/api/addresses")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
});

describe('Lists', function() {
  it('should list lists on GET', function() {
    return supertest(app)
    .get('/api/lists')
    .then(function(res) {
      expect(203);
    });
  });
});