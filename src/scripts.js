// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';
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

let customer;


const loadPage = () => {
  getData()
  .then((data) => {
    customer = new Customer(data.customers[0]);
    displayCustomerRoomDashboard();
  })
};

const getData = () => {
  return Promise.resolve(fetchApiData('customers'))
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






//EVENT LISTENERS

window.addEventListener('load', loadPage);
