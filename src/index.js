const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
const myStorage = window.localStorage;
myStorage.setItem('next_page', API);

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      myStorage.setItem('next_page', response.info.next);
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
    .catch(error => console.log(error));
};

const loadData =  api => {
    getData(api);
};

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData(myStorage.getItem('next_page'));
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
