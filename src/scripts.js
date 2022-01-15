// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchApiData } from './apiCalls';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GET ELEMENTS BY ID 





const loadPage = () => {
  suggestedRecipe.innerHTML = '';
  getData()
  .then((data) => {
    let randomUser = data[0][getRandomIndex(data[0])];
    newUser = new User(randomUser);
    rooms = new Rooms(data[1]);
    bookings = new Bookings(data[2]);
  })
};

const getData = () => {
  return Promise.all([fetchApiData('customers'), fetchApiData('rooms'), fetchApiData('bookings')])
};

//EVENT LISTENERS

window.addEventListener('load', loadPage);