import runtime from 'regenerator-runtime';
import axios from 'axios';
import { generations } from './gens';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const spinner = document.querySelector('.lds-dual-ring');
const pkCard = document.querySelector('.pk-card');
const pkImg = document.getElementById('pk-img');
const btnImg = document.getElementById('btn-img');
const pkName = document.getElementById('pk-name');
const pkId = document.getElementById('pk-id');
const pkType = document.getElementById('pk-type');
const containerDisplay = document.querySelector('.container-display');
const containerCol = document.querySelector('.container-col');

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
      const newPokemon = await getPokemonData(pokemon.toLowerCase());
      console.log('New Pokémon: ', newPokemon);

      if (newPokemon !== null) {
        pkCard.style.display = 'none';

        if (pokemon.match(/^\s*$/)) {
          console.error('Empty: ', pokemon);
        }

        spinner.style.display = 'grid';

        pkImg.src = newPokemon.front;

        document.getElementById(
          'pk-name'
        ).innerText = `name: ${newPokemon.name}`;
        document.getElementById('pk-id').innerText = `#${newPokemon.id}`;
        document.getElementById(
          'pk-type'
        ).innerText = `type(s): ${newPokemon.type}`;
        document.getElementById('pk-gen').innerText = newPokemon.gen;
        document.getElementById(
          'pk-height'
        ).innerText = `height: ${newPokemon.height}`;
        document.getElementById(
          'pk-weight'
        ).innerText = `weight: ${newPokemon.weight}`;
        pkCard.style.display = 'grid';
        document.querySelector('input').value = '';
        spinner.style.display = 'none';
      } else {
        alert(
          `Pokemon ${pokemon.toUpperCase()} not found. Please try another entry...`
        );
      }
    } else {
      alert('Please enter a value or a id');
    }
  } catch (error) {
    console.error('Func - findPokemon: ', error);
  }
};

export const addPokemonToCollection = () => {
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
  pkCardImg.src = pkImg.src;
  pkCardImgDiv.appendChild(pkCardImg);

  // * 4) Append the Info Elements
  pkCardName.innerText = pkName.innerText;
  pkCardCol.appendChild(pkCardName);
  pkCardId.innerText = `#${pkId.innerText}`;
  pkCardCol.appendChild(pkCardId);
  pkCardType.innerText = pkType.innerText;
  pkCardCol.appendChild(pkCardType);

  // * 5) Append the Button Elements
  btnInfo.innerText = 'more info';
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
  containerCol.style.display = 'grid';
};

const getPokemonType = types => {
  const pkTypes = [];
  for (let i = 0; i < types.length; i++) {
    pkTypes.push(types[i].type.name);
  }
  const pkTypesTest =
    pkTypes.length < 2 ? `${pkTypes[0]}` : `${pkTypes[0]}/${pkTypes[1]}`;
  return pkTypesTest;
};

const getPokemonGeneration = id => {
  for (let i = 0; i < generations.length; i++) {
    if ((id => generations[i].starts) && id <= generations[i].ends) {
      return generations[i].name;
    }
  }
};

const createPokemonCard = pokemon => {
  const pkCard = document.createElement('DIV');
  const pkCardImg = document.createElement('DIV');
  const pkCardName = document.createElement('DIV');
  const pkCardId = document.createElement('DIV');
  const pkCardType = document.createElement('DIV');
  const pkCardGen = document.createElement('DIV');
  const pkCardHeight = document.createElement('DIV');
  const pkCardWeight = document.createElement('DIV');
  const btnCatch = document.createElement('DIV');

  console.log('here');
  pkCard.classList.add('pk-card');
  containerDisplay.appendChild(pkCard);
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
