export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => 
      response.json())
    .catch(error => console.log('fetch error', error))
};
