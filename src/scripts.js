// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';
import Customer from './classes/Customer';
import Booking from './classes/Booking';
import Bookings from './classes/Bookings';
import Room from './classes/Room';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GET ELEMENTS BY ID 
const customerDashboardView = document.getElementById('customerDashboardView')
const allRoomBookings = document.getElementById('allRoomBookings')

let customer;
let room;
let booking;
let bookings;


const loadPage = () => {
  getData()
  .then((data) => {
    let randomUser = data[0].customers[getRandomIndex(data[0].customers.length)];
    console.log('randomUser', randomUser)
    customer = new Customer(randomUser);
    console.log('cust', customer)
    room = new Room(data[1]);
    booking = new Booking(data[2]);
    bookings = new Bookings(data[2]);
    displayCustomerRoomDashboard();
  })
};

const getData = () => {
  return Promise.all([fetchApiData('customers'), fetchApiData('rooms'), fetchApiData('bookings')])
};

const displayCustomerRoomDashboard = () => {
  customer.findBookings(bookings)
  console.log(customer.findBookings(bookings))
  // allRoomBookings.insertAdjacentHTML('afterend', ``)
}

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

//EVENT LISTENERS

window.addEventListener('load', loadPage);
