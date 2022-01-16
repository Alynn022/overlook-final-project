import chai from 'chai';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import Bookings from '../src/classes/Bookings';
const { bookingsData } = require("../data/bookings");
const expect = chai.expect;

describe('Customer', function() {
  let customer1, customer2, booking1, booking2, bookings;

  beforeEach(() => {
    bookings = new Bookings([bookingsData[0], bookingsData[1], bookingsData[3]])

    booking1 = new Booking({"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2022/02/05","roomNumber":12,"roomServiceCharges":[]})
    booking2 = new Booking({"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2022/01/11","roomNumber":20,"roomServiceCharges":[]})

    customer1 = new Customer({"id":1,"name":"Leatha Ullrich"})
    customer2 = new Customer({"id":2,"name":"Rocio Schuster"})
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

  it('Should be able to find customers bookings by customer Id', function() { 
   
    expect(customer1.findBookings()).to.include.members([booking1, booking2])
  });

});
