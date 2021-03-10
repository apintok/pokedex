import p from 'pokemon';
import { findPokemon, displayPokemonCard } from './utils';

const input = document.querySelector('input');
const btnFind = document.getElementById('btn-find');
const btnRandom = document.getElementById('btn-random');
const btnCatch = document.getElementById('btn-catch');
const infoLink = document.getElementById('info-link');

input.addEventListener('keyup', async function (e) {
  if (e.key === 'Enter') {
    const found = await findPokemon(input.value);
    if (!found) {
      this.value = '';
    } else {
      displayPokemonCard(found);
      this.value = '';
    }
  }
});

btnFind.addEventListener('click', async function (e) {
  const found = await findPokemon(input.value);
  if (!found) {
    input.value = '';
  } else {
    displayPokemonCard(found);
    input.value = '';
  }
});

btnRandom.addEventListener('click', async function (e) {
  const randPokemon = p.random();
  const found = await findPokemon(randPokemon);
  displayPokemonCard(found);
});

infoLink.addEventListener('click', function (e) {
  // Modal Window Code
});
