import { fetchApiData } from '../apiCalls';
import Bookings from './Bookings';

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.customerBookings = [];
  }
  
  getData = () => {
    return Promise.resolve(fetchApiData('bookings'))
  }

  findBookings() {
    return this.getData()
    .then((data) => {
      let bookings = new Bookings(data.bookings)
      bookings.bookingsData.forEach((detail) => {
        if (this.id === detail.userID) { 
          this.customerBookings.push(detail)
        }
      })
      // console.log('class', this.customerBookings)
    // return this.customerBookings
    })
  }
}




export default Customer; 