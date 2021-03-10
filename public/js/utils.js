import runtime, { async } from 'regenerator-runtime';
import axios from 'axios';
import { generations } from './gens';
import pokemon from 'pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const spinner = document.querySelector('.lds-dual-ring');
const pkCard = document.querySelector('.pk-card');
const pkImg = document.getElementById('pk-img');
const pkName = document.getElementById('pk-name');
const pkId = document.getElementById('pk-id');
const pkType = document.getElementById('pk-type');
const containerCol = document.querySelector('.container-col');
let pokemonCollection = [];

const getPokemonData = async pokemon => {
  try {
    const res = await axios.get(`${BASE_URL}${pokemon}`);
    const pokeData = res.data;
    // console.log(pokeData);

    return {
      name: pokeData.name,
      id: pokeData.id,
      type: getPokemonType(pokeData.types),
      weight: pokeData.weight,
      height: pokeData.height,
      gen: getPokemonGeneration(pokeData.id),
      front: pokeData.sprites.front_default,
      back: pokeData.sprites.back_default,
    };
  } catch (error) {
    console.log('GetPokemonData - Error: ', error.message);
    return null;
  }
};

export const findPokemon = async pokemon => {
  // ? The parameter 'pokemon' is either an ID or a NAME;
  try {
    if (pokemon) {
      const newPokemon = await getPokemonData(pokemon.toLowerCase().trim());
      console.log('New Pokémon: ', newPokemon);

      if (newPokemon !== null) {
        return newPokemon;
      } else {
        alert(
          `Pokemon ${pokemon.toUpperCase()} not found. Please try another entry...`
        );
        // pkCard.style.display = 'none';
        return null;
      }
    } else {
      alert('Please enter a value or a id');
      // pkCard.style.display = 'none';
      return undefined;
    }
  } catch (error) {
    console.error('Func - findPokemon: ', error);
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
    <div id="pk-name">Name: ${pokemon.name}</div>
    <div id="pk-id">#${pokemon.id}</div>
    <div id="pk-type">type: ${pokemon.type}</div>
    <div id="pk-gen">${pokemon.gen}</div>
    <div id="pk-height">height: ${pokemon.height}</div>
    <div id="pk-weight">weight: ${pokemon.weight}</div>
    <div>
      <button class="pk-btn btn-small btn-invert" id="btn-catch">
        catch
      </button>
    </div>`;
  pkCard.insertAdjacentHTML('afterbegin', outputHTML);
  pkCard.style.display = 'grid';
  const btnCatch = document.getElementById('btn-catch');
  btnCatch.addEventListener('click', function (e) {
    displayPokemonCollection(pokemon);
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
    <button id="btn-info" class="pk-btn btn-small">info</button>
    <button id="btn-remove" class="pk-btn btn-small">x</button>
  </div>`
  );
  containerCol.style.display = 'flex';
  removeFromCollection(pokemonCollection);
};

const removeFromCollection = pokemonCollection => {
  console.log('COL-BEFORE-REMOVING:\n', pokemonCollection);

  const removeBtn = containerCol.querySelectorAll('#btn-remove');

  removeBtn.forEach((btn, i) => {
    btn.addEventListener('click', function (e) {
      const test = this.parentElement.children[1].innerHTML;
      console.log('test: ', test);
      const index = pokemonCollection.indexOf(
        pokemonCollection.find((pk, i) => pk.name === test)
      );
      if (index > -1) {
        pokemonCollection.splice(index, 1);
      }
      this.parentElement.remove();
      console.log('COL-AFTER-REMOVING:\n', pokemonCollection);
    });
  });
};

export const addPokemonToCollection = pokemon => {
  // ? Create Pokemon Collection Card
  // * 1) Define new DOM Elements
  const pkCardCol = document.createElement('DIV');
  const pkCardName = document.createElement('DIV');
  const pkCardId = document.createElement('DIV');
  const pkCardType = document.createElement('DIV');
  const pkCardImgDiv = document.createElement('DIV');
  const pkCardImg = document.createElement('IMG');
  const btnInfo = document.createElement('BUTTON');
  const btnRemove = document.createElement('BUTTON');

  // * 2) Add the Pokemon Card Container
  pkCardCol.classList.add('pk-card-col');
  containerCol.appendChild(pkCardCol);

  // * 3) Append the Image Element
  pkCardCol.appendChild(pkCardImgDiv);
  pkCardImg.src = pokemon.front;
  pkCardImgDiv.appendChild(pkCardImg);

  // * 4) Append the Info Elements
  pkCardName.innerText = pokemon.name;
  pkCardCol.appendChild(pkCardName);
  pkCardId.innerText = pokemon.id;
  pkCardCol.appendChild(pkCardId);
  pkCardType.innerText = pokemon.type;
  pkCardCol.appendChild(pkCardType);

  // * 5) Append the Button Elements
  btnInfo.innerText = 'info';
  btnInfo.setAttribute('id', 'btn-info');
  btnInfo.classList.add('pk-btn', 'btn-small');
  pkCardCol.appendChild(btnInfo);
  btnRemove.innerText = 'x';
  btnRemove.setAttribute('id', 'btn-remove');
  btnRemove.classList.add('pk-btn', 'btn-small');
  btnRemove.addEventListener('click', function (e) {
    this.parentElement.remove();
  });
  pkCardCol.appendChild(btnRemove);

  // * 6) Display the Collection Section
  containerCol.style.display = 'flex';
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

/**
 * ? Add Event Listener to pkImgBtn to swith front and back
let clicked = false;

  btnImg.addEventListener('click', function (e) {
    console.log('Back Image:', newPokemon.back);
    if (!clicked) {
      pkImg.src = newPokemon.back;
      this.innerText = 'front';
      clicked = true;
    } else {
      pkImg.src = newPokemon.front;
      this.innerText = 'back';
      clicked = false;
    }
  });
 */
