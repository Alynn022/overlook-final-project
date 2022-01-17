// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// import { ContextReplacementPlugin } from 'webpack';
import { fetchApiData } from './apiCalls';
import Bookings from './classes/Bookings';
import Customer from './classes/Customer';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GET ELEMENTS BY ID 
const customerDashboardView = document.getElementById('customerDashboardView')
const allRoomBookings = document.getElementById('allRoomBookings')
const pastReservationsSection = document.getElementById('pastReservationsSection')
const upcomingReservationsSection = document.getElementById('upcomingReservationsSection')
const totalAmountSpentDisplay = document.getElementById('totalAmountSpentDisplay')
const bookARoomBtn = document.getElementById('bookARoomBtn')
const bookARoomView = document.getElementById('bookARoomView')
const dateSelectBtn = document.getElementById('dateSelectBtn')
const roomsAvailableDisplay = document.getElementById('roomsAvailableDisplay')
const dropDownButton = document.getElementById('dropDownButton');
const myDropdown = document.getElementById("myDropdown");


let customer;
let bookings;


const loadPage = () => {
  getData()
  .then((data) => {
    customer = new Customer(data[0].customers[0]);
    bookings = new Bookings(data[1].bookings)
    displayCustomerRoomDashboard();
  })
};

const getData = () => {
  return Promise.all([fetchApiData('customers'), fetchApiData('bookings')])
};

const displayCustomerRoomDashboard = () => {
  customer.findBookings().then(() => {
  customer.rearrangeDate();
  customer.getTotalAmountSpentOnRooms().then(() => {
    let totalCost = customer.calculateRoomTotal();
      totalAmountSpentDisplay.innerText = `$${totalCost}`

    customer.pastReservations.forEach((elem) => {
      pastReservationsSection.insertAdjacentHTML('afterEnd', `
        <p>Date of your Stay: ${elem.date} Room Number: ${elem.roomNumber}`)
     })
    customer.upcomingReservations.forEach((elem) => {
      upcomingReservationsSection.insertAdjacentHTML('afterEnd', `
        <p>Date of your Stay: ${elem.date} Room Number: ${elem.roomNumber}`)
      })
    })
  })
}


const displayBookARoomCalendar = () => {
  showBookARoomView();
}

var dateControl = document.querySelector('input[type="date"]');

const disableSubmitButton = () => {
  if (!dateControl.value) {
    dateSelectBtn.disabled = true
    alert("Please choose a valid date")
    dateSelectBtn.disabled = false
  }
}

const displayBookARoomInformation = () => {
  disableSubmitButton();
  roomsAvailableDisplay.innerHTML = `` 
  let splitDate = dateControl.value.split("-")
  let joinDate = splitDate.join("/")
  bookings.showCustomerRoomAvailability(joinDate).then(() => {
    if (bookings.roomsAvailable) {
      bookings.roomsAvailable.forEach((room) => {
        roomsAvailableDisplay.innerHTML += `<h1>Room Type: ${room.roomType} Has a Bidet: ${room.bidet}
        Bed Size: ${room.bedSize} Number Of Beds: ${room.numBeds}</h1>`
      })
    }
    if (!bookings.roomsAvailable) {
      roomsAvailableDisplay.innerHTML += `<h1>We are so sorry!! No Rooms are available for this date... Please try a different date!</h1>`
    }
  })
}

const showDropDown = () => {
  myDropdown.innerHTML = ``
  myDropdown.classList.toggle("show");
  bookings.roomTypesAvailable.forEach((roomType) => {
    myDropdown.insertAdjacentHTML('afterBegin', `<a class ="${roomType}" href="#${roomType}">${roomType.toUpperCase()}</a>`)
  })
};

const searchByRoomTypes = (event) => {
  console.log(event.target.className)
  event.preventDefault();
  roomsAvailableDisplay.innerHTML = ``
  bookings.roomsAvailable.forEach((roomType) => {
    if (event.target.className === roomType.roomType) {
      roomsAvailableDisplay.innerHTML += `<h1>Room Type: ${roomType.roomType} Has a Bidet: ${roomType.bidet}
        Bed Size: ${roomType.bedSize} Number Of Beds: ${roomType.numBeds}</h1>`
    }
  })
}

//HELPER FUNCTIONS
const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
};

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
};

const showBookARoomView = () => {
  show([bookARoomView])
  hide([customerDashboardView])
}

//EVENT LISTENERS

window.addEventListener('load', loadPage);
bookARoomBtn.addEventListener('click', displayBookARoomCalendar);
dateSelectBtn.addEventListener('click', displayBookARoomInformation);
myDropdown.addEventListener('click', searchByRoomTypes);
dropDownButton.addEventListener('click', showDropDown);