import { fetchApiData } from '../apiCalls';
import Rooms from './Rooms';

class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData;
    this.roomsAvailable = [];
    this.roomTypesAvailable = [];
  }
  getData = () => {
    return Promise.all([fetchApiData('bookings'), fetchApiData('rooms'), fetchApiData('customers')])
  }

  showCustomerRoomAvailability(userInput) {
    return this.getData()
    .then((data) => {
      let bookings = new Bookings(data[0].bookings)
      let rooms = new Rooms(data[1].rooms)
      let roomsWithSameDate = bookings.bookingsData.filter((booking) => {
        if (userInput === booking.date) {
          return booking
        }
      })
        const results = rooms.roomsInformation.filter(({ number: id1 }) => 
        !roomsWithSameDate.some(({ roomNumber: id2 }) => id2 === id1));
        this.roomsAvailable = results
        console.log(this.roomsAvailable)
        
        results.forEach((elem) => {
          if (!this.roomTypesAvailable.includes(elem.roomType))
          this.roomTypesAvailable.push(elem.roomType)
        })
        })
      }
    }



export default Bookings;