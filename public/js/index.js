import { findPokemon, displayPokemonCard } from './helpers';

const input = document.querySelector('input');
const btnFind = document.getElementById('btn-find');
const btnRandom = document.getElementById('btn-random');

btnFind.addEventListener('click', async function (e) {
  e.preventDefault();
  const found = await findPokemon(input.value);
  if (!found) {
    input.value = '';
  } else {
    displayPokemonCard(found);
    input.value = '';
  }
});

btnRandom.addEventListener('click', async function (e) {
  e.preventDefault();
  const random = String(Math.trunc(Math.random() * (798 - 1) + 1));
  const found = await findPokemon(random);
  displayPokemonCard(found);
});
