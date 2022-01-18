import { fetchApiData } from '../apiCalls';
import Rooms from './Rooms';
import '../images/Junior-Suite.jpg'
import '../images/Residential-Suite.jpg'
import '../images/Single-Room.jpg'
import '../images/Suite.jpg'

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
        
        results.forEach((elem) => {
          if (!this.roomTypesAvailable.includes(elem.roomType))
          this.roomTypesAvailable.push(elem.roomType)
      })
    })
  }
  assignImageToRoomType() {
    this.roomsAvailable.forEach((elem) => {
      if (elem.roomType === 'residential suite') {
        let residentialSuiteImage = '../images/Residential-Suite.jpg'
        elem['image'] = residentialSuiteImage
        
      }
      if (elem.roomType === 'junior suite') {
        let juniorSuiteImage = '../images/Junior-Suite.jpg'
        elem['image'] = juniorSuiteImage
        
      }
      if (elem.roomType === 'single room') {
        let singleRoomImage = '../images/Single-Room.jpg'
        elem['image'] = singleRoomImage
        
      }
      if (elem.roomType === 'suite') {
        let suiteImage = '../images/Suite.jpg'
        elem['image'] = suiteImage
      }
    })
  }
  
}

//I want to make the bookThisRoomBtn.value dynamic by passing in the value as 
  //parameter 
  //I want to creat a fetch and post method for the individual info. 
  //based on the customer UserID 
  //I need this to post 
  //{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }

export default Bookings;