class Booking {
  constructor(bookingDetail) {
    this.id = bookingDetail.id;
    this.userID = bookingDetail.userID;
    this.date = bookingDetail.date;
    this.roomNumber = bookingDetail.roomNumber;
    this.roomServiceCharges = bookingDetail.roomServiceCharges;
  }
  sortDate() {
    let splitDate = this.date.split('/') 
    splitDate.splice(0, 0, splitDate[2]);
    splitDate.pop();
    splitDate.splice(0, 0, splitDate[2]);
    splitDate.pop();
    this.date = splitDate.join('/')
    console.log(this.date)
  }
}

export default Booking;