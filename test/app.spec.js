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
  it("should edit an address on PATCH", function() {
    const newItem = { id: 444, street: "999 Stanson Rd", city: "Dougal", state: "California" };
    return supertest(app)
      .patch("/api/addresses/444")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should delete an address on DELETE", function() {
    const newItem = { id: 444, street: "999 Stanson Rd", city: "Dougal", state: "California" };
    return supertest(app)
      .delete("/api/addresses/444")
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
  it("should add an lists on POST", function() {
    const newItem = { name: "TrialList", gpId: "yes", nsId: "1" };
    return supertest(app)
      .post("/api/lists")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should edit an lists on PATCH", function() {
    const newItem = { id: 333, name: "DoubleTrialList", gpId: "yes", nsId: "1" };
    return supertest(app)
      .patch("/api/lists/333")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should delete an lists on DELETE", function() {
    const newItem = { id: 333, name: "DoubleTrialList", gpId: "yes", nsId: "1" };
    return supertest(app)
      .delete("/api/lists/333")
      .send(newItem)
      .then(function(res) { 
        expect(202);
      });
  });

});