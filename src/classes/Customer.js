const { bookingsData } = require("../data/bookings");
import Bookings from "./Bookings";

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
  }

  findBookings(bookings) {
   let bookingDetails = bookings.filter((detail) => {
    if (this.id === detail.userID) { 
      return detail
    }
  })
  return bookingDetails
  }
}


export default Customer; 