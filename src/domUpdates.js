import { fetchApiData } from './apiCalls';
import Bookings from './classes/Bookings';
import Customer from './classes/Customer';
import './css/base.scss';
import './images/img1.jpg'
import './images/img2.jpg'
import './images/img3.jpg'
import './images/thankyou.jpg'

//DISPLAYS
const customerDashboardView = document.getElementById('customerDashboardView')
const bookARoomView = document.getElementById('bookARoomView')
const roomsAvailableDisplay = document.getElementById('roomsAvailableDisplay')
const roomHasBeenBookedDisplay = document.getElementById('roomHasBeenBookedDisplay')
const errorLine = document.getElementById('errorLine')
const homePageView = document.getElementById('homePageView')
const loginForm = document.getElementById('loginForm')
const start = document.getElementById('start')

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

var today = new Date().toISOString().slice(0, 10).split('-').join('/') 
var dateControl = document.querySelector('input[type="date"]');

let customer;
let bookings;

let domUpdates = {
  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },
  
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  loadPage() {
    domUpdates.getData()
    .then((data) => {
      bookings = new Bookings(data[1].bookings)
    })
    domUpdates.hide([homeBtn])
    domUpdates.todaysDateCalendar();
  },
  
  getData() {
    return Promise.all([fetchApiData('customers'), fetchApiData('bookings')])
  },
  
  bookThisRoomPostApi(roomNumber) {
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
      .then(response => domUpdates.displaySuccessMessage(response))
      .catch(err => {
        domUpdates.displayServerErrorMessage(err)
      });
      domUpdates.displayRoomHasBeenBooked();
  },

  displaySuccessMessage() {
    return `Booking with ${customer.id} successfully posted`
  },
    
  displayServerErrorMessage(err) {
    errorLine.innerText = err.message;
  },
  
  todaysDateCalendar() {
    var formatToday = new Date().toISOString().slice(0, 10)
    start.min = formatToday
  },

  
  disableLoginButton() {
    if (!passwordText.value || !usernameText.value) {
      loginFormBtn.disabled = true
      alert("Please Enter A Valid Username or Password")
      loginFormBtn.disabled = false
    } else if ((!usernameText.value.includes('customer') || passwordText.value !== "overlook2021")) {
      loginFormBtn.disabled = true
      alert("Please Enter A Valid Username or Password")
      loginFormBtn.disabled = false
    }
  },

  disableSubmitButton() {
    if (!dateControl.value) {
      dateSelectBtn.disabled = true
      alert("Please choose a valid date")
      dateSelectBtn.disabled = false
    }
  },

  displayBookARoomCalendar() {
    domUpdates.showBookARoomView();
  },
  
  showBookARoomView() {
    domUpdates.show([bookARoomView, homeBtn])
    domUpdates.hide([customerDashboardView, bookARoomBtn, homePageView, roomsAvailableDisplay, roomHasBeenBookedDisplay])
  },
  
  displayRoomHasBeenBooked() {
    domUpdates.show([roomHasBeenBookedDisplay, homeBtn])
    domUpdates.hide([roomsAvailableDisplay, dropDownBtn])
  },
  
  displayBookARoomOnSubmit() {
    domUpdates.show([roomsAvailableDisplay, dropDownBtn, homeBtn])
    domUpdates.hide([roomHasBeenBookedDisplay])
  },
  
  displayHomePage() {
    domUpdates.show([homePageView, customerLoginBtn])
    domUpdates.hide([homeBtn, customerDashboardView, bookARoomView, roomsAvailableDisplay, roomHasBeenBookedDisplay, bookARoomBtn])
  },
  
  displayCustomerDashboardView() {
    domUpdates.show([customerDashboardView, homeBtn, bookARoomBtn])
    domUpdates.hide([homePageView, customerLoginBtn, loginForm])
  },
  
  displayLoginForm() {
    domUpdates.show([loginForm])
  },
};

window.addEventListener('load', domUpdates.loadPage);
bookARoomBtn.addEventListener('click', domUpdates.displayBookARoomCalendar);
dateSelectBtn.addEventListener('click', domUpdates.displayBookARoomInformation);
myDropdown.addEventListener('click', domUpdates.searchByRoomTypes);
dropDownBtn.addEventListener('click', domUpdates.showDropDown);
homeBtn.addEventListener('click', domUpdates.displayHomePage);
customerLoginBtn.addEventListener('click', domUpdates.displayLoginForm);
loginFormBtn.addEventListener('click', domUpdates.customerLogin);

export default  domUpdates;