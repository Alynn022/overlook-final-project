// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';
import Bookings from './classes/Bookings';
import Customer from './classes/Customer';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/img1.jpg'
import './images/img2.jpg'
import './images/img3.jpg'


//DISPLAYS
const customerDashboardView = document.getElementById('customerDashboardView')
const pastReservationsSection = document.getElementById('pastReservationsSection')
const upcomingReservationsSection = document.getElementById('upcomingReservationsSection')
const totalAmountSpentDisplay = document.getElementById('totalAmountSpentDisplay')
const bookARoomView = document.getElementById('bookARoomView')
const roomsAvailableDisplay = document.getElementById('roomsAvailableDisplay')
const roomHasBeenBookedDisplay = document.getElementById('roomHasBeenBookedDisplay')
const errorLine = document.getElementById('errorLine')
const homePageView = document.getElementById('homePageView')

//BUTTONS
const bookARoomBtn = document.getElementById('bookARoomBtn')
const dateSelectBtn = document.getElementById('dateSelectBtn')
const dropDownBtn = document.getElementById('dropDownBtn');
const myDropdown = document.getElementById('myDropdown');
const homeBtn = document.getElementById('homeBtn')
const customerLoginBtn = document.getElementById('customerLoginBtn')


var today = new Date().toISOString().slice(0, 10).split('-').join('/') 
var dateControl = document.querySelector('input[type="date"]');

let customer;
let bookings;


const loadPage = () => {
  getData()
  .then((data) => {
    customer = new Customer(data[0].customers[0]);
    bookings = new Bookings(data[1].bookings)
  })
  .then(() =>
  displayCustomerRoomDashboard());
};  

const getData = () => {
  return Promise.all([fetchApiData('customers'), fetchApiData('bookings')])
};

const displayCustomerRoomDashboard = () => {
  displayCustomerDashboardView();
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


const disableSubmitButton = () => {
  if (!dateControl.value) {
    dateSelectBtn.disabled = true
    alert("Please choose a valid date")
    dateSelectBtn.disabled = false
  }
}

const displayBookARoomInformation = () => {
  disableSubmitButton();
  displayBookARoomOnSubmit();
  roomsAvailableDisplay.innerHTML = `` 
  let splitDate = dateControl.value.split("-")
  let joinDate = splitDate.join("/")
  let bookThisRoomBtn;
    bookings.showCustomerRoomAvailability(joinDate).then(() => {
      if (bookings.roomsAvailable) {
        bookings.assignImageToRoomType();
        bookings.roomsAvailable.forEach((room) => {
          roomsAvailableDisplay.innerHTML += `<section class="room-display"><img src=${room.image} style="float:left" tabindex= "0">
          <ol>
            <li>Room Type: ${room.roomType}</li> 
            <li>Has a Bidet: ${room.bidet}</li>
            <li>Bed Size: ${room.bedSize}</li>
            <li>Number Of Beds: ${room.numBeds}</li> 
            <li>Cost Per Night: $${room.costPerNight}</li>
          </ol>
          <button class="book-btn" id="bookThisRoomBtn-${room.number}" value="${room.number}">Book This Room</button></section>`
        })
          bookings.roomsAvailable.forEach((room) => { 
          bookThisRoomBtn = document.getElementById(`bookThisRoomBtn-${room.number}`)
          bookThisRoomBtn.addEventListener('click', (e) => {
            bookThisRoomPostApi(e.target.value)
          })
        })
        if (!bookings.roomsAvailable) {
          roomsAvailableDisplay.innerHTML += `<h1>We are so sorry!! No Rooms are available for this date... Please try a different date!</h1>`
      }
    }
  })
}


const showDropDown = () => {
  myDropdown.innerHTML = ``
  myDropdown.classList.toggle("show");
  bookings.roomTypesAvailable.forEach((roomType) => {
    myDropdown.innerHTML += `<a class ="${roomType}" href="#${roomType}">${roomType.toUpperCase()}</a>`
  })
};

const searchByRoomTypes = (event) => {
  event.preventDefault();
  myDropdown.innerHTML = ``
  roomsAvailableDisplay.innerHTML = ``
  bookings.assignImageToRoomType();
  bookings.roomsAvailable.forEach((room) => {
    if (event.target.className === room.roomType) {
      roomsAvailableDisplay.innerHTML += `<section class="room-display"><img src=${room.image} style="float:left" tabindex= "0">
      <ol>
        <li>Room Type: ${room.roomType}</li> 
        <li>Has a Bidet: ${room.bidet}</li>
        <li>Bed Size: ${room.bedSize}</li>
        <li>Number Of Beds: ${room.numBeds}</li> 
        <li>Cost Per Night: $${room.costPerNight}</li>
      </ol>
      <button class="book-btn" id="bookThisRoomBtn2-${room.number}" value="${room.number}">Book This Room</button></section>`
    }
  })
  bookings.roomsAvailable.forEach((room) => { 
    if (event.target.className === room.roomType) {
    let bookThisRoomBtn2;
    bookThisRoomBtn2 = document.getElementById(`bookThisRoomBtn2-${room.number}`)
    bookThisRoomBtn2.addEventListener('click', (e) => {
      bookThisRoomPostApi(e.target.value)
    })
  }
    })
}


const bookThisRoomPostApi = (roomNumber) => {
  let newRoomNumber = parseInt(roomNumber)
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "userID": customer.id,
      "date": today,
      "roomNumber": newRoomNumber,
    })
  })
  .then(response => displaySuccessMessage(response))
  .catch(err => {
    displayServerErrorMessage(err)
  });
  displayRoomHasBeenBooked();
}

const displaySuccessMessage = (response) => {
  return `Booking with ${customer.id} successfully posted`
  }
  
  const displayServerErrorMessage = (err) => {
      errorLine.innerText = err.message;
}


//HELPER FUNCTIONS
const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
};

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
};

const displayBookARoomCalendar = () => {
  showBookARoomView();
}

const showBookARoomView = () => {
  show([bookARoomView, homeBtn])
  hide([customerDashboardView, bookARoomBtn, homePageView, roomsAvailableDisplay, roomHasBeenBookedDisplay])
}

const displayRoomHasBeenBooked = () => {
  show([roomHasBeenBookedDisplay, homeBtn])
  hide([roomsAvailableDisplay])
}

const displayBookARoomOnSubmit = () => {
  show([roomsAvailableDisplay, dropDownBtn, homeBtn])
  hide([roomHasBeenBookedDisplay])
}

const displayHomePage = () => {
  show([homePageView])
  hide([homeBtn, customerDashboardView, bookARoomView, roomsAvailableDisplay, roomHasBeenBookedDisplay])
}

const displayCustomerDashboardView = () => {
  show([customerDashboardView, homeBtn])
  hide([homePageView, customerLoginBtn])
}

//EVENT LISTENERS

window.addEventListener('load', loadPage);
bookARoomBtn.addEventListener('click', displayBookARoomCalendar);
dateSelectBtn.addEventListener('click', displayBookARoomInformation);
myDropdown.addEventListener('click', searchByRoomTypes);
dropDownBtn.addEventListener('click', showDropDown);
homeBtn.addEventListener('click', displayHomePage)
customerLoginBtn.addEventListener('click', displayCustomerRoomDashboard)
