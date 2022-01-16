import chai from 'chai';
import Rooms from '../src/classes/Rooms';
const expect = chai.expect;

describe('Rooms', function() {
  let rooms;

  this.beforeEach(() => {
    rooms = new Rooms({"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4})
  })

  it('Should be a function', function() {
    expect(Rooms).to.be.a('function');
  });

  it('Should be an instance of Bookings', function() {
    expect(rooms).to.be.an.instanceOf(Rooms);
  });
});