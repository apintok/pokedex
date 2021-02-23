import p from 'pokemon';
import { findPokemon, addPokemonToCollection } from './utils';

const input = document.querySelector('input');
const btnFind = document.getElementById('btn-find');
const btnRandom = document.getElementById('btn-random');
const btnCatch = document.getElementById('btn-catch');

input.addEventListener('keyup', async function (e) {
  if (e.key === 'Enter') {
    const found = await findPokemon(input.value);
    if (!found) this.value = '';
  }
});

btnFind.addEventListener('click', async function (e) {
  const found = await findPokemon(input.value);
  if (!found) input.value = '';
});

btnRandom.addEventListener('click', function (e) {
  const randPokemon = p.random();
  findPokemon(randPokemon);
});

btnCatch.addEventListener('click', addPokemonToCollection);
