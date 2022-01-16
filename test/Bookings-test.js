import chai from 'chai';
import Bookings from '../src/classes/Bookings';
const expect = chai.expect;

describe('Bookings', function() {
  let bookings;

  this.beforeEach(() => {
    bookings = new Bookings({"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2022/04/22","roomNumber":15,"roomServiceCharges":[]})
  })

  it('Should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('Should be an instance of Bookings', function() {
    expect(bookings).to.be.an.instanceOf(Bookings);
  });
});
