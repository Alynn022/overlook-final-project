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
      console.log('rooms', rooms.roomsInformation)
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

// if (room.roomType === 'residential suite') {
//   roomsAvailableDisplay.innerHTML += `<img src='./images/Residential-Suite.jpg'>
//   <h1>Room Type: ${room.roomType} Has a Bidet: ${room.bidet}
//   Bed Size: ${room.bedSize} Number Of Beds: ${room.numBeds}</h1>`
//   }
//   if (room.roomType === 'junior suite') {
//     roomsAvailableDisplay.innerHTML += `<img src='./images/Junior-Suite.jpg'>
//     <h1>Room Type: ${room.roomType} Has a Bidet: ${room.bidet}
//     Bed Size: ${room.bedSize} Number Of Beds: ${room.numBeds}</h1>`
//   }
//   if (room.roomType === 'single room') {
//     roomsAvailableDisplay.innerHTML += `<img src='./images/Single-Room.jpg'>
//     <h1>Room Type: ${room.roomType} Has a Bidet: ${room.bidet}
//     Bed Size: ${room.bedSize} Number Of Beds: ${room.numBeds}</h1>`
//   }
//   if (room.roomType === 'suite') {
//     roomsAvailableDisplay.innerHTML += `<img src='./images/Suite.jpg'>
//     <h1>Room Type: ${room.roomType} Has a Bidet: ${room.bidet}
//     Bed Size: ${room.bedSize} Number Of Beds: ${room.numBeds}</h1>`

export default Bookings;