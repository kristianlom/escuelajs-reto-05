const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
const myStorage = window.localStorage;
const keyStorage = 'next_fetch';

myStorage.setItem(keyStorage, API);

const getData = api => {
   fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      myStorage.setItem(keyStorage, response.info.next);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" alt="${character.name}"/>
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(new Error(error)));
};

const loadData = async api => {
 await getData(api);
};

const intersectionObserver = new IntersectionObserver(entries => {

    if (myStorage.getItem(keyStorage) === '' || myStorage.getItem(keyStorage) === null) {
        console.log(`Ya no hay más personajes`);
    } else if (entries[0].isIntersecting) {
        loadData(myStorage.getItem(keyStorage));
    }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.onunload(function () {
    myStorage.clear();
});
