import runtime, { async } from 'regenerator-runtime';
import { API_URL, generations } from './config';

// const spinner = document.querySelector('.lds-dual-ring');
const pkCard = document.querySelector('.card');
// const pkCardError = document.querySelector('.pk-card-error');
const container = document.querySelector('.container');
const containerCol = document.querySelector('.container-col');
let pokemonCollection = [];
let clicked = false;

export const findPokemon = async pokemon => {
  // ? The parameter 'pokemon' is either an ID or a NAME;
  try {
    if (pokemon) {
      const res = await fetch(`${API_URL}${pokemon.toLowerCase().trim()}`);

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
    console.log('Func - findPokemon: ', error.message);
    // displayError(error.message);
  }
};

export const displayPokemonCard = pokemon => {
  console.log('pkObj > ', pokemon.type);
  container.innerHTML = '';
  const outputHTML = `<div class="card type-${pokemon.type.color}">
    <div class="card__element">
      <img
        class="card__element--img type-${pokemon.type.color}"
        src="${pokemon.front}"
        alt="Pokemon Image"
      />
    </div>
    <div class="card__element">#${pokemon.id}</div>
    <div class="card__element">${pokemon.name}</div>
    <div class="card__element">${pokemon.type.types}</div>
    <div class="card__element">${pokemon.gen}</div>
    <div class="card__element">height: ${precise(pokemon.height, 1)}</div>
    <div class="card__element">weight: ${precise(pokemon.weight, 3)}</div>
  </div>`;
  container.insertAdjacentHTML('afterbegin', outputHTML);
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

  return {
    color: type1.type.name,
    types:
      types.length < 2
        ? `${type1.type.name}`
        : `${type1.type.name}/${type2.type.name}`,
  };
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
