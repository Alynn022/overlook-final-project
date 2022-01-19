import chai from 'chai';
import Customer from '../src/classes/Customer';

const expect = chai.expect;

describe('Customer', function() {
  let customer1, customer2;

  beforeEach(() => {
    customer1 = new Customer({"id": 1, "name": "Leatha Ullrich"})
    customer2 = new Customer({"id": 2, "name": "Rocio Schuster"})
  }); 

  it('Should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('Should be an instance of Customer', function() {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('Should have an id', function() {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it('Should have a name', function() {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
  });

  it('Should be able to rearrange dates to another format', function() { 
    customer1.pastReservations.push({"id": "5fwrgu4i7k55hl6x8", "userID": 1, "date": "2022/01/11", "roomNumber": 20, "roomServiceCharges": []})
    customer1.rearrangeDate();

    expect(customer1.pastReservations[0].date).to.deep.equal("01/11/2022")
  });

  it('Should be able to calculate the room total', function() { 
    customer1.pastReservations.push({"id": "5fwrgu4i7k55hl6x8", "userID": 1, "date": "2022/01/11", "roomNumber": 20, "roomServiceCharges": [], "costOfRoom": 207.67})
    customer1.pastReservations.push({"id": "5fwrgu4i7k55hl6t8", "userID": 1, "date": "2022/02/05", "roomNumber": 12, "roomServiceCharges": [], "costOfRoom": 300.00})
    customer1.calculateRoomTotal();

    expect(customer1.calculateRoomTotal()).to.deep.equal('507.67')
  });

});
