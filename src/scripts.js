// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';
import Customers from './classes/Customers';
import Bookings from './classes/Bookings';
import Rooms from './classes/Rooms';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GET ELEMENTS BY ID 
const customerDashboardView = document.getElementById('customerDashboardView')

let customers;
let rooms;
let bookings;



const loadPage = () => {
  getData()
  .then((data) => {
    let randomUser = data[0].customers[getRandomIndex(data[0].customers.length)];
    customers = new Customers(randomUser);
    console.log(customers)
    rooms = new Rooms(data[1]);
    bookings = new Bookings(data[2]);
  })
};

const getData = () => {
  return Promise.all([fetchApiData('customers'), fetchApiData('rooms'), fetchApiData('bookings')])
};

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

//EVENT LISTENERS

window.addEventListener('load', loadPage);