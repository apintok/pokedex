import { generations } from './gens';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const spinner = document.querySelector('.lds-dual-ring');

export const findPokemon = pokemon => {
  // The parameter 'pokemon' is either an ID or a NAME;
  const pkCard = document.querySelector('.pk-card');
  pkCard.style.display = 'none';

  if (pokemon.match(/^\s*$/)) {
    console.log('Empty: ', pokemon);
  }
  spinner.style.display = 'grid';
  const api = BASE_URL + pokemon.toLowerCase();
  fetch(api)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log('Image: ' + data.sprites.front_default);
      console.log('ID: ' + data.id);

      document.getElementById('pk-name').innerText = data.name;
      document.getElementById('pk-id').innerText = data.id;
      document.getElementById('pk-type').innerText = getPokemonType(data.types);
      document.getElementById('pk-img').src = data.sprites.front_default;
      pkCard.style.display = 'grid';
      document.querySelector('input').value = '';
      spinner.style.display = 'none';
    })
    .catch(function (err) {
      console.log('Error: ' + err);
    });
};

export const addPokemonToCollection = () => {
  const containerCol = document.querySelector('.container-col');

  const pkImg = document.getElementById('pk-img').src;
  const pkName = document.getElementById('pk-name').innerText;
  const pkId = document.getElementById('pk-id').innerText;
  const pkType = document.getElementById('pk-type').innerText;
  console.log(`Pokemon: ${pkName} - ${pkId} with type: ${pkType} `, pkImg);

  // Create Pokemon Card
  // 1) Define needed DOM Elements
  const pkCard = document.createElement('DIV');
  const pkCardName = document.createElement('DIV');
  const pkCardId = document.createElement('DIV');
  const pkCardType = document.createElement('DIV');
  const pkCardImgDiv = document.createElement('DIV');
  const pkCardImg = document.createElement('IMG');
  const btnInfo = document.createElement('BUTTON');
  const btnRemove = document.createElement('BUTTON');

  // 2) Add the Pokemon Card Container
  pkCard.classList.add('pk-card-col');
  containerCol.appendChild(pkCard);

  // 3) Append the Image Element
  pkCard.appendChild(pkCardImgDiv);
  pkCardImg.src = pkImg;
  pkCardImgDiv.appendChild(pkCardImg);

  // 4) Append the Info Elements
  pkCardName.innerText = pkName;
  pkCard.appendChild(pkCardName);
  pkCardId.innerText = `#${pkId}`;
  pkCard.appendChild(pkCardId);
  pkCardType.innerText = pkType;
  pkCard.appendChild(pkCardType);

  // 5) Append the Button Elements
  btnInfo.innerText = 'more info';
  btnInfo.setAttribute('id', 'btn-info');
  btnInfo.classList.add('pk-btn', 'btn-small');
  pkCard.appendChild(btnInfo);
  btnRemove.innerText = 'x';
  btnRemove.setAttribute('id', 'btn-remove');
  btnRemove.classList.add('pk-btn', 'btn-small');
  btnRemove.addEventListener('click', function (e) {
    btnRemove.parentElement.remove();
  });
  pkCard.appendChild(btnRemove);

  // 6) Display the Collection Section
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
