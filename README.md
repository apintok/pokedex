**v 1.0.0** :hammer:

---

## Introduction

This small App goal is to access the data available when calling [PokéAPI](https://pokeapi.co) and display it for easy reading on the browser - kind of like a small Pokédex I'm watching a couple of courses on [Udemy](https://www.udemy.com) and taking advantage of this idea to apply my knowledge and also practice Web Development.

---

## Requirements

**This App current version requires the following dependencies:**

- NodeJS
- Express
- EJS
- [Pokemon](https://www.npmjs.com/package/pokemon)

---

## Installation

It should be a standard installation using `npm install` after downloading the code.

**_Important to note_** that most of the JS code is frontend. It has different files on the _public/js_ directory. Everything is bundled together using Parcel :package:. I'm guessing that if changes are made to JS the code, then it will need to be bundled together again.

---

## Current Funcionality :heavy_check_mark:

Type the Pokémon name/id you want to search for. The button 'GO!' will return a Pokémon image, name, id and type(s) of that Pokémon. The Random button will return a random Pokémon with the same information.
Then by clicking catch it's possible to be build a collection of Pokémons.

---

## Next Steps / Goals :construction:

- UI
  - Add functionality to the 'More Info' button;
  - Structure the card to display more information;
  - Change the button 'Catch' positioning;
- JS Code
  - Apply a better DRY principle;
  - Use JS Classes for better data structuring
  - ...
