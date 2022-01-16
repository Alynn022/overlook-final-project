import { fetchApiData } from '../apiCalls';
import Bookings from './Bookings';

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.upcomingReservations = [];
    this.pastReservations = [];
  }
  
  getData = () => {
    return Promise.resolve(fetchApiData('bookings'))
  }

  findBookings() {
    return this.getData()
    .then((data) => {
      let bookings = new Bookings(data.bookings)
      var today = new Date() 
      bookings.bookingsData.forEach((detail) => {
        var anotherDate = new Date(detail.date)
        if ((this.id === detail.userID) && (today < anotherDate) ) { 
          this.upcomingReservations.push(detail)
        }
        if ((this.id === detail.userID) && (today > anotherDate) ) { 
          this.pastReservations.push(detail)
        }
      })
    })
  }
  rearrangeDate() {
    this.pastReservations.sort((a,b) => {
      return Date.parse(b.date) - Date.parse(a.date)
    })
    this.pastReservations.forEach(elem => {
      let splitDate = elem.date.split('/') 
      splitDate.splice(0, 0, splitDate[2]);
      splitDate.pop();
      splitDate.splice(0, 0, splitDate[2]);
      splitDate.pop();
      elem.date = splitDate.join('/')
    })
    this.upcomingReservations.sort((a,b) => {
      return Date.parse(b.date) - Date.parse(a.date)
    })
    this.upcomingReservations.forEach(elem => {
      let splitDate = elem.date.split('/') 
      splitDate.splice(0, 0, splitDate[2]);
      splitDate.pop();
      splitDate.splice(0, 0, splitDate[2]);
      splitDate.pop();
      elem.date = splitDate.join('/')
    })
  }
}





export default Customer; 