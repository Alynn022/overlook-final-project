import chai from 'chai';
import Bookings from '../src/classes/Bookings';
const expect = chai.expect;

describe('Bookings', function() {
  let bookings;

  this.beforeEach(() => {
    bookings = new Bookings({"id": "5fwrgu4i7k55hl6t8", "userID": 1, "date": "2022/02/05", "roomNumber": 12, "roomServiceCharges": []})
  });

  it('Should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('Should be an instance of Bookings', function() {
    expect(bookings).to.be.an.instanceOf(Bookings);
  });

});