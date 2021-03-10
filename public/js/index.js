import { findPokemon, displayPokemonCard } from './utils';

const input = document.querySelector('input');
const btnFind = document.getElementById('btn-find');
const btnRandom = document.getElementById('btn-random');

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

btnFind.addEventListener('click', async function () {
  const found = await findPokemon(input.value);
  if (!found) {
    input.value = '';
  } else {
    displayPokemonCard(found);
    input.value = '';
  }
});

btnRandom.addEventListener('click', async function () {
  const random = String(Math.trunc(Math.random() * (798 - 1) + 1));
  const found = await findPokemon(random);
  displayPokemonCard(found);
});
