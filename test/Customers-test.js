import chai from 'chai';
import Customers from '../src/classes/Customers';
const expect = chai.expect;

describe('Customers', function() {
  let customer1, customer2;

  beforeEach(() => {
    customer1 = new Customers({"id":1,"name":"Leatha Ullrich"})
    customer2 = new Customers({"id":2,"name":"Rocio Schuster"})
  }); 

  it('Should be a function', function() {
    expect(Customers).to.be.a('function');
  });

  it('Should be an instance of Customer', function() {
    expect(customer1).to.be.an.instanceOf(Customers);
  });

  it('Should have an id', function() {
    expect(customer1.id).to.equal(1);
  });


});
