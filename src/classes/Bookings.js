import { fetchApiData } from '../apiCalls';

class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData;
    
  }
  getData = () => {
    return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers')])
  }
  //by user input, the user will select a date for which they'd like to book a room.
    //when they select a date, a list of room details for only rooms that are available on that date
    //we need to iterate through the bookings array, and return a filtered list of all the rooms 
    //that are booked on that day. 
    //if it is booked, then the user is not able to see that room available.  
  showUserRoomAvailability(userInput) {
    return this.getData()
    .then((data) => {
      let bookings = new Bookings(data[0].bookings)
     let listofBookings = bookings.bookingsData.filter((elem) => {
        if (elem.date === userInput) {
          return elem
        }
      })
    })
  }
}


export default Bookings;