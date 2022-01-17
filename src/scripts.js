// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
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


const displayBookARoomInformation = () => {
  bookings.showUserRoomAvailibility(userInput) 
}



//EVENT LISTENERS

window.addEventListener('load', loadPage);
bookARoomBtn.addEventListener('click', displayBookARoomInformation);
