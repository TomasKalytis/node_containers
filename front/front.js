'use strict';

console.log('front.js file was loaded');

const containersUrl = 'http://localhost:3000/api/containers';

//atsisiusti vartotojus ir iskonsolinti

async function getContainers() {
  try {
    const resp = await fetch(containersUrl);
    console.log('resp ===', resp);
    const containersData = await resp.json();
    console.log('containersData ===', containersData);
  } catch (error) {
    console.warn(error);
  }
}
getContainers();
