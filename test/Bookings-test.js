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

  it('Should assign a property of image to the Booking', function() {
    bookings.roomsAvailable.push({"number": 1, "roomType": "residential suite", "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 358.4})

    bookings.assignImageToRoomType();
    expect(bookings.roomsAvailable[0].image).to.deep.equal('../images/Residential-Suite.jpg');
  });
});