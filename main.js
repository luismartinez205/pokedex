import './modulos/navbar.js'
import './modulos/skeleton.js'
const pokemonVideos = {

  bulbasaur: "https://youtu.be/BACKGiNpf-4?si=ujoWLC6SI5YciFDn",
  venusaur: "https://youtu.be/nBInN5VbKyA?si=qA21j9OG8iCPwxfP",
  pikachu: "https://youtu.be/Dic-RmdOSFs?si=2EWNZtDSXvF1PZ4o",
  blastoise: "https://youtu.be/Zy1Ds-2q2bM?si=-YouRJ2hmdoDHlTU",
  charizard: "https://youtu.be/irxk7OadJtQ?si=WGIPvgDN7wT9loR8",
  mewtwo: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  gengar: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  snorlax: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  dragonite: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  charmander: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  squirtle: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  jigglypuff: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  psyduck: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  eevee: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  meowth: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  psyduck: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  machamp: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  gengar: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  alakazam: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  onix: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  hitmonlee: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  hitmonchan: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  gyarados: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  lapras: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  ditto: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d",
  eevee: "https://youtu.be/9n8sXo2l7jA?si=0a3e5b1c9c8e4b1d", 
  nidoking: "https://youtu.be/g2wi22iGx0w?si=9JSZ6YoXDXyk1vqp", 

};

const arrow = document.querySelector('.icon');
const sub = document.querySelector('.submenus');
const main = document.querySelector('#root');
const sidebar = document.querySelector('.side');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const searchInput = document.querySelector('input[type="search"]');

let allPokemons = [];

let offset = 0;
const limit = 40;


// MENU
arrow.addEventListener("click", (event) => {
  event.stopPropagation();
  sub.classList.toggle('active');
  arrow.style.transform = sub.classList.contains('active')    ? 'rotate(180deg)'
    : 'rotate(0deg)';
});

document.addEventListener("click", () => {
  sub.classList.remove('active');
});

main.addEventListener("click", (event) => {
  event.stopPropagation();
  main.classList.toggle('togl');
});


// CARGAR POKEMONS
async function loadPokemons() {



  allPokemons = [];

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const data = await res.json();

  for (const pokemon of data.results) {

    const pokeRes = await fetch(pokemon.url);

    const pokeData = await pokeRes.json();

    allPokemons.push(pokeData);

  }

  showPokemons(allPokemons);

}


// MOSTRAR POKEMONS
function showPokemons(pokemons) {

  main.innerHTML = '';

  pokemons.forEach(pokeData => {

    const card = document.createElement('div');

    card.classList.add('card');

    card.innerHTML = `
      <h2>${pokeData.name}</h2>

      <img src="${pokeData.sprites.front_default}">

      <p style="font-weight:700">
        #00${pokeData.id}
      </p>

      <ul>
        <p>Habilidades</p>

        ${pokeData.abilities.map(ability => `
          <li class="btn-primary">
            ${ability.ability.name}
          </li>
        `).join('')}
      </ul>

      <ul>
        <p>Tipos</p>

        ${pokeData.types.map(type => `
          <li>
            ${type.type.name}
          </li>
        `).join('')}
      </ul>
    `;


    // CLICK CARD
    card.addEventListener('click', () => {
      const video = pokemonVideos[pokeData.name];
      sidebar.classList.add('show');

      sidebar.innerHTML = `
        <button class="close-side">
          Cerrar
        </button>
         <button 
        class="fightBtn"
        onclick="window.open('${video}', '_blank')"
      >
        Ver pelea
      </button>

        <h1>${pokeData.name}</h1>

        <img 
          src="${pokeData.sprites.other['official-artwork'].front_default}"
          width="200"
        >

        <p>
          ID: <strong>${pokeData.id}</strong>
        </p>

        <p>
          <strong>Altura:</strong> ${pokeData.height} Mts
        </p>

        <p>
          <strong>Peso:</strong> ${pokeData.weight} Kg
        </p>

        <h3>Habilidades</h3>

        <ul>
          ${pokeData.abilities.map(ability => `
            <li>${ability.ability.name}</li>
          `).join('')}
        </ul>

        <h3>Tipos</h3>

        <ul>
          ${pokeData.types.map(type => `
            <li>${type.type.name}</li>
          `).join('')}
        </ul>

        <h3>Estadísticas</h3>

        <ul>
          ${pokeData.stats.map(stat => `
            <li>
              ${stat.stat.name}: ${stat.base_stat}
            </li>
          `).join('')}
        </ul>
      `;

      const closeBtn = document.querySelector('.close-side');

      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('show');
      });

    });

    main.appendChild(card);

  });

}


// INICIAR
loadPokemons();


// PAGINACION
nextBtn.addEventListener('click', () => {

  offset += limit;

  loadPokemons();

});

prevBtn.addEventListener('click', () => {

  if (offset >= limit) {

    offset -= limit;

    loadPokemons();

  }

});


// SCROLL SIDEBAR
window.addEventListener('scroll', () => {

  let scroll = window.scrollY;

  let limite = Math.min(scroll, 800);

  sidebar.style.transform =
    `translate(-50%, -50%) translateY(${limite}px)`;

});


// BUSCADOR
searchInput.addEventListener("input", () => {

  const value = searchInput.value
    .toLowerCase()
    .trim();

  const filtered = allPokemons.filter(poke => {

    // ID
    const matchId =
      poke.id.toString().includes(value);

    // NOMBRE
    const matchName =
      poke.name.includes(value);

    // HABILIDADES
    const matchAbility =
      poke.abilities.some(ability =>
        ability.ability.name.includes(value)
      );

    // TIPOS
    const matchType =
      poke.types.some(type =>
        type.type.name.includes(value)
      );

    return (
      matchId ||
      matchName ||
      matchAbility ||
      matchType
    );

  });

  showPokemons(filtered);

});

