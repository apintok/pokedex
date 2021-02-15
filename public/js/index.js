import p from 'pokemon';
import { findPokemon, addPokemonToCollection } from './utils';

const input = document.querySelector('input');
const btnFind = document.getElementById('btn-find');
const btnRandom = document.getElementById('btn-random');
const btnCatch = document.getElementById('btn-catch');

input.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    findPokemon(input.value);
  }
});

btnFind.addEventListener('click', function (e) {
  findPokemon(input.value);
});

btnRandom.addEventListener('click', function (e) {
  const randPokemon = p.random();
  findPokemon(randPokemon);
});

btnCatch.addEventListener('click', function (e) {
  addPokemonToCollection();
});
