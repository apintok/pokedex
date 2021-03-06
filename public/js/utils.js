import runtime, { async } from 'regenerator-runtime';
import { generations } from './gens';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const spinner = document.querySelector('.lds-dual-ring');
const pkCard = document.querySelector('.pk-card');
const pkCardError = document.querySelector('.pk-card-error');
const mainContainer = document.querySelector('.container-display');
const containerCol = document.querySelector('.container-col');
let pokemonCollection = [];
let clicked = false;

export const findPokemon = async pokemon => {
  // ? The parameter 'pokemon' is either an ID or a NAME;
  try {
    if (pokemon) {
      const res = await fetch(`${BASE_URL}${pokemon.toLowerCase().trim()}`);

      if (!res.ok)
        throw new Error(`pokémon <span>${pokemon}</span> not found!`);

      const pokeData = await res.json();

      const newPokemon = {
        id: pokeData.id,
        name: pokeData.name,
        exp: pokeData.base_experience,
        weight: pokeData.weight,
        height: pokeData.height,
        front: pokeData.sprites.front_default,
        back: pokeData.sprites.back_default,
        type: getPokemonType(pokeData.types),
        gen: getPokemonGeneration(pokeData.id),
      };

      return newPokemon;
    } else {
      alert('Please enter a value or a id');
      return undefined;
    }
  } catch (error) {
    // console.log('Func - findPokemon: ', error.message);
    displayError(error.message);
  }
};

export const displayPokemonCard = pokemon => {
  pkCard.innerHTML = '';
  const outputHTML = `<div class="img">
      <img id="pk-img" src="${pokemon.front}" />
      <div>
        <button class="pk-btn btn-small btn-invert" id="btn-img">
          back
        </button>
      </div>
    </div>
    <div id="pk-name">name: ${pokemon.name}</div>
    <div id="pk-id">#${pokemon.id}</div>
    <div id="pk-type">type: ${pokemon.type}</div>
    <div id="pk-gen">${pokemon.gen}</div>
    <div id="pk-height">height: ${precise(pokemon.height, 2)} m</div>
    <div id="pk-weight">weight: ${precise(pokemon.weight, 3)} kgs</div>
    <div>
      <button class="pk-btn btn-small btn-invert" id="btn-catch">
        catch
      </button>
    </div>`;
  pkCard.insertAdjacentHTML('afterbegin', outputHTML);
  pkCard.style.display = 'grid';
  pkCardError.style.display = 'none';
  const btnCatch = document.getElementById('btn-catch');
  btnCatch.addEventListener('click', function () {
    displayPokemonCollection(pokemon);
  });
  const btnBackImg = document.getElementById('btn-img');
  const pkImg = document.getElementById('pk-img');

  btnBackImg.addEventListener('click', function () {
    switchCardImage(this, pkImg, pokemon.front, pokemon.back);
  });
};

const displayPokemonCollection = pokemon => {
  if (!pokemon) return;

  pokemonCollection.push(pokemon);
  console.log(pokemonCollection);
  containerCol.insertAdjacentHTML(
    'beforeend',
    `<div class="pk-card-col">
    <div>
      <img src="${pokemon.front}">
    </div>
    <div>${pokemon.name}</div>
    <div>${pokemon.id}</div>
    <div>${pokemon.type}</div>
    <a href="https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pokémon)" target="_blank" id="btn-info" class="pk-btn btn-small">info</a>
    <button id="btn-remove" class="pk-btn btn-small">x</button>
  </div>`
  );
  containerCol.style.display = 'flex';
  removeFromCollection(pokemonCollection);
};

const removeFromCollection = pokemonCollection => {
  console.log('COL-BEFORE-REMOVING:\n', pokemonCollection);

  const removeBtn = containerCol.querySelectorAll('#btn-remove');

  removeBtn.forEach(btn => {
    btn.addEventListener('click', function () {
      const pkCardName = this.parentElement.children[1].innerHTML;
      const index = pokemonCollection.indexOf(
        pokemonCollection.find((pk, i) => pk.name === pkCardName)
      );
      if (index > -1) {
        pokemonCollection.splice(index, 1);
      }
      this.parentElement.remove();
      console.log('COL-AFTER-REMOVING:\n', pokemonCollection);
    });
  });
};

const getPokemonType = types => {
  const [type1, type2] = types;

  return types.length < 2
    ? `${type1.type.name}`
    : `${type1.type.name}/${type2.type.name}`;
};

const getPokemonGeneration = id => {
  for (let i = 0; i < generations.length; i++) {
    if ((id => generations[i].starts) && id <= generations[i].ends) {
      return generations[i].name;
    }
  }
};

const precise = (number, precision) => {
  const toDecimal = 0.1;
  return Number.parseFloat(number * toDecimal).toPrecision(precision);
};

const switchCardImage = (btnBackImg, pkImg, frontImage, backImage) => {
  if (!backImage) {
    btnBackImg.disabled = true;
    btnBackImg.classList.toggle('btn-disabled');
  } else {
    if (!clicked) {
      pkImg.src = backImage;
      btnBackImg.innerText = 'front';
      return (clicked = true);
    } else {
      pkImg.src = frontImage;
      btnBackImg.innerText = 'back';
      return (clicked = false);
    }
  }
};

const displayError = errorMsg => {
  pkCardError.innerHTML = pkCard.innerHTML = '';
  const outputHTML = `<p>${errorMsg}</p>`;
  pkCardError.insertAdjacentHTML('afterbegin', outputHTML);
  pkCardError.style.display = 'grid';
  pkCard.style.display = 'none';
};

const renderSpinner = function (parentEl) {
  const outputHTML = `<div class="lds-dual-ring"></div>`;
  //parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', outputHTML);
};
