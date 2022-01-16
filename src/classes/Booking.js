class Booking {
  constructor(bookingDetail) {
    this.id = bookingDetail.id;
    this.userID = bookingDetail.userID;
    this.date = bookingDetail.date;
    this.roomNumber = bookingDetail.roomNumber;
    this.roomServiceCharges = bookingDetail.roomServiceCharges;
  }
}

export default Booking;