import { fetchApiData } from '../apiCalls';
import Bookings from './Bookings';
import Rooms from './Rooms';

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.upcomingReservations = [];
    this.pastReservations = [];
  }
  
  getData = () => {
    return Promise.all([fetchApiData('bookings'), fetchApiData('rooms')])
  }

  findBookings() {
    return this.getData()
    .then((data) => {
      let bookings = new Bookings(data[0].bookings)
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
  getTotalAmountSpentOnRooms() {
    return this.getData()
    .then((data) => {
      let rooms = new Rooms(data[1].rooms)
      this.pastReservations.forEach((elem) => {
        rooms.roomsInformation.forEach((detail) => {
          if (elem.roomNumber === detail.number) {
            let totalCost = detail.costPerNight
            elem['costOfRoom'] = totalCost
          }
        })
      })
    })
  }
  calculateRoomTotal() {
    let result = this.pastReservations.reduce((acc, elem) => {
      acc += elem.costOfRoom
      return acc
    }, 0)
    return result 
  }
}

//I want to get the past reservation's room number
  //I want to get the room's array and return the 'number' and cost if the room number
  //of the customer and the room's array is the same 
  //reduce and add up all the total cost of the array 



export default Customer; 