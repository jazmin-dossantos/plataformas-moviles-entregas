const pokemonContainer = document.getElementById('pokemon-container');
const loadingSpinner = document.getElementById('loading-spinner');
const btnLoadMore = document.getElementById('btn-load-more');
const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonModal'));
const modalBodyContent = document.getElementById('modal-body-content');
const pokemonModalLabel = document.getElementById('pokemonModalLabel');
const btnCloseModal = document.getElementById('btn-close-modal');

let offset = 0;
const limit = 20;


document.addEventListener('DOMContentLoaded', () => {
  fetchPokemons(offset, limit);
});


btnLoadMore.addEventListener('click', () => {
  offset += limit;
  fetchPokemons(offset, limit);
});

btnCloseModal.addEventListener('click', () => {
  pokemonModal.hide();
});

async function fetchPokemons(offset, limit) {
  showSpinner();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    
    for (const pokemon of data.results) {
      const detail = await fetchPokemonData(pokemon.url);
      renderPokemonCard(detail);
    }
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  } finally {
    hideSpinner();
  }
}


async function fetchPokemonData(urlOrId) {
  const url = typeof urlOrId === 'number' || (typeof urlOrId === 'string' && !urlOrId.startsWith('http'))
    ? `https://pokeapi.co/api/v2/pokemon/${urlOrId}`
    : urlOrId;
  const response = await fetch(url);
  return await response.json();
}


function renderPokemonCard(pokemon) {
  const col = document.createElement('div');
  col.className = 'col';

  const typesBadges = pokemon.types
    .map(t => `<span class="badge bg-secondary badge-type">${t.type.name}</span>`)
    .join('');

  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${pokemon.sprites.front_default || 'https://via.placeholder.com/150'}" class="card-img-top p-3" alt="${pokemon.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-capitalize fw-bold">#${pokemon.id} ${pokemon.name}</h5>
        <div class="mb-3">${typesBadges}</div>
        <button class="btn btn-outline-danger mt-auto" onclick="showPokemonDetails(${pokemon.id})">Ver Detalles</button>
      </div>
    </div>
  `;
  pokemonContainer.appendChild(col);
}


async function showPokemonDetails(id) {
  showSpinner();
  try {
    const pokemon = await fetchPokemonData(id);
    
    pokemonModalLabel.textContent = `#${pokemon.id} ${pokemon.name}`;
    
    const types = pokemon.types.map(t => t.type.name).join(', ');
    const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
    const moves = pokemon.moves.slice(0, 4).map(m => m.move.name).join(', ');

    modalBodyContent.innerHTML = `
      <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" class="img-fluid mb-3" style="max-height: 200px;" alt="${pokemon.name}">
      <div class="text-start">
        <p><strong>Tipos:</strong> <span class="text-capitalize">${types}</span></p>
        <p><strong>Habilidades:</strong> <span class="text-capitalize">${abilities}</span></p>
        <p><strong>Movimientos principales:</strong> <span class="text-capitalize">${moves}</span></p>
      </div>
    `;
    
    pokemonModal.show();
  } catch (error) {
    console.error('Error al obtener detalles del Pokemon:', error);
  } finally {
    hideSpinner();
  }
}


function showSpinner() {
  loadingSpinner.classList.remove('d-none');
}

function hideSpinner() {
  loadingSpinner.classList.add('d-none');
}
