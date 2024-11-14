const card = JSON.parse(window.localStorage.getItem('showDetails')); 
const img = document.querySelector('.character-image');
img.src = card.image;

const cardName = document.querySelector('.name');
cardName.textContent = `Name: ${card.name}`;

const status = document.querySelector('.status');
status.textContent = `Status: ${card.status}`;

const species = document.querySelector('.species');
species.textContent = `Species: ${card.species}`;

const gender = document.querySelector('.gender');
gender.textContent = `Gender: ${card.gender}`;

const origin = document.querySelector('.origin');
origin.textContent = `Origin: ${card.origin.name}`;

const a = document.querySelector('.location');
a.textContent = `Location: ${card.location.name}`;

const ep = document.querySelector('.ep-number');
ep.textContent = `Number of episodes the character was in: ${card.episode.length}`;

const back = document.querySelector('.goback');
back.addEventListener('click', ()=>{
    location.replace('./index.html')
})