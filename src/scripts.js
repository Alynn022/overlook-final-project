import { fetchApiData } from './apiCalls';
import Bookings from './classes/Bookings';
import Customer from './classes/Customer';
import './domUpdates.js';
import './css/base.scss';
import './images/img1.jpg'
import './images/img2.jpg'
import './images/img3.jpg'
import './images/thankyou.jpg'


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
const loginForm = document.getElementById('loginForm')
const start = document.getElementById('start')
const justBookedDisplay = document.getElementById('justBookedDisplay')

//BUTTONS
const bookARoomBtn = document.getElementById('bookARoomBtn')
const dateSelectBtn = document.getElementById('dateSelectBtn')
const dropDownBtn = document.getElementById('dropDownBtn');
const myDropdown = document.getElementById('myDropdown');
const homeBtn = document.getElementById('homeBtn')
const customerLoginBtn = document.getElementById('customerLoginBtn')
const loginFormBtn = document.getElementById('loginFormBtn')
const usernameText = document.getElementById('username')
const passwordText = document.getElementById('password')
const customerDashboardBtn = document.getElementById('customerDashboardBtn')

var today = new Date().toISOString().slice(0, 10).split('-').join('/') 
var dateControl = document.querySelector('input[type="date"]');

let customer;
let bookings;



const loadPage = () => {
  getData()
  .then((data) => {
    bookings = new Bookings(data[1].bookings)
  })
  hide([homeBtn])
  todaysDateCalendar ();
};

const getData = () => {
  return Promise.all([fetchApiData('customers'), fetchApiData('bookings')])
};

const customerLogin = (event) => {
  event.preventDefault();
  disableLoginButton();
  getData()
  .then((data) => { 
    let newCustomer = data[0].customers.find((elem) => (usernameText.value === `customer${elem.id}`) && (passwordText.value === "overlook2021"))
    customer = new Customer(newCustomer)
  })
  .then(() => {
    displayCustomerRoomDashboard()
  }) 
}

const bookThisRoomPostApi = (roomNumber) => {
  let splitDate = dateControl.value.split("-")
  let joinDate = splitDate.join("/")
  let newRoomNumber = parseInt(roomNumber)
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "userID": customer.id,
      "date": joinDate,
      "roomNumber": newRoomNumber,
    })
  })
    .then(response => displaySuccessMessage(response))
    .catch(err => {
      displayServerErrorMessage(err)
    });
  displayRoomHasBeenBooked();
}

const displaySuccessMessage = () => {
  return `Booking with ${customer.id} successfully posted`
}
  
const displayServerErrorMessage = (err) => {
  errorLine.innerText = err.message;
}

const todaysDateCalendar = () => {
  var formatToday = new Date().toISOString().slice(0, 10)
  start.min = formatToday
}

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

const displayNewDashBoard = () => {
  displayCustomerDashboardView();
  customer.findNewBookings().then(() => {
    pastReservationsSection.insertAdjacentHTML('afterEnd', ``)
    upcomingReservationsSection.insertAdjacentHTML('afterEnd', ``)
    customer.rearrangeDate();
    customer.getTotalAmountSpentOnRooms().then(() => {
      let totalCost = customer.calculateRoomTotal();
      totalAmountSpentDisplay.innerText = `$${totalCost}`
      let endIndex = customer.upcomingReservations.length -1
        showJustBookedHeader();
        justBookedDisplay.insertAdjacentHTML('afterEnd', `
        <p>Date of your Stay: ${customer.upcomingReservations[endIndex].date} Room Number: ${customer.upcomingReservations[endIndex].roomNumber}`)
      })
    })
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
        <p>Room Type: ${room.roomType}</p> 
        <p>Has a Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number Of Beds: ${room.numBeds}</p> 
        <p>Cost Per Night: $${room.costPerNight}</p>
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

const disableLoginButton = () => {
  if (!passwordText.value || !usernameText.value) {
    loginFormBtn.disabled = true
    alert("Please Enter A Valid Username or Password")
    loginFormBtn.disabled = false
  } else if ((!usernameText.value.includes('customer') || passwordText.value !== "overlook2021")) {
    loginFormBtn.disabled = true
    alert("Please Enter A Valid Username or Password")
    loginFormBtn.disabled = false
  }
};

const disableSubmitButton = () => {
  if (!dateControl.value) {
    dateSelectBtn.disabled = true
    alert("Please choose a valid date")
    dateSelectBtn.disabled = false
  }
};

const searchByRoomTypes = (event) => {
  event.preventDefault();
  myDropdown.innerHTML = ``
  roomsAvailableDisplay.innerHTML = ``
  bookings.assignImageToRoomType();
  bookings.roomsAvailable.forEach((room) => {
    if (event.target.className === room.roomType) {
      roomsAvailableDisplay.innerHTML += `<section class="room-display"><img src=${room.image} style="float:left" tabindex= "0">
      <p>Room Type: ${room.roomType}</p> 
      <p>Has a Bidet: ${room.bidet}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number Of Beds: ${room.numBeds}</p> 
      <p>Cost Per Night: $${room.costPerNight}</p>
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
};


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
  show([roomHasBeenBookedDisplay, homeBtn, customerDashboardBtn])
  hide([roomsAvailableDisplay, dropDownBtn])
}

const displayBookARoomOnSubmit = () => {
  show([roomsAvailableDisplay, dropDownBtn, homeBtn])
  hide([roomHasBeenBookedDisplay])
}

const displayHomePage = () => {
  show([homePageView, customerLoginBtn])
  hide([homeBtn, customerDashboardView, bookARoomView, roomsAvailableDisplay, roomHasBeenBookedDisplay, bookARoomBtn])
}

const displayCustomerDashboardView = () => {
  show([customerDashboardView, homeBtn, bookARoomBtn])
  hide([homePageView, customerLoginBtn, loginForm, roomHasBeenBookedDisplay, customerDashboardBtn, bookARoomView])
}

const displayLoginForm = () => {
  show([loginForm])
}

const showJustBookedHeader = () => {
  show([justBookedDisplay])
}

//EVENT LISTENERS

window.addEventListener('load', loadPage);
bookARoomBtn.addEventListener('click', displayBookARoomCalendar);
dateSelectBtn.addEventListener('click', displayBookARoomInformation);
dropDownBtn.addEventListener('click', showDropDown)
myDropdown.addEventListener('click', searchByRoomTypes);
homeBtn.addEventListener('click', displayHomePage);
customerLoginBtn.addEventListener('click', displayLoginForm);
loginFormBtn.addEventListener('click', customerLogin);
customerDashboardBtn.addEventListener('click', displayNewDashBoard)