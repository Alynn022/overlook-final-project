import chai from 'chai';
import Customers from '../src/classes/Customers';
const expect = chai.expect;

describe('Customers', function() {
  let customers

  beforeEach(() => {
    customers = new Customers({"id":2,"name":"Rocio Schuster"})
  }); 

  it('Should be a function', function() {
    expect(Customers).to.be.a('function');
  });

  it('Should be an instance of Customer', function() {
    expect(customers).to.be.an.instanceOf(Customers);
  });
});
