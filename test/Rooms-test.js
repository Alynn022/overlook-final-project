import chai from 'chai';
import Room from '../src/classes/Room';
const expect = chai.expect;

describe('Room', function() {
  let room;

  this.beforeEach(() => {
    room = new Room({"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4})
  })

  it('Should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('Should be an instance of Bookings', function() {
    expect(room).to.be.an.instanceOf(Room);
  });
});