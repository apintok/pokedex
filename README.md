**v 1.0.1** :hammer:

**live at** _https://pokefindex.herokuapp.com_

---

## Introduction :open_book:

This small App goal is to access the data available when calling [PokéAPI](https://pokeapi.co) and display it for easy reading on the browser - kind of like a small Pokédex. I'm taking a couple of courses on [Udemy](https://www.udemy.com) and taking advantage of this idea to apply my knowledge and also learn Web Development as I go.

---

## Requirements :file_folder:

**This App current version requires the following dependencies:**

- Express
- EJS
- Regenerator-runtime

**Please refer to package.json**

---

## Installation :pen:

It should be a standard installation using `npm install` after downloading the code.

**_Important to note_** that most of the JS code is frontend. It has different files on the _public/js_ directory. Everything is bundled together using Parcel :package:. I'm guessing that if changes are made to JS the code, then it will need to be bundled together again.

---

## Current Funcionality :heavy_check_mark:

Type the Pokémon name/id you want to search for. The button 'Catch' will return a image, name, id, type(s), generation, height and weight of that Pokémon. The Random button will return Pokémon with the same information randomly.
I removed the option to catch/collect Pokemons in a different container. The goal is only to display Pokemon info.

---

## Next Steps / Working on :construction:

- UI
  - This version includes a new design;
  - It uses SASS in order to structure the CSS;
  - The Pokemon Card will change color depending on its type;
  - Implement responsiveness;
  - Trying to add a spinner while waiting to fetch the Pokemon;
  - Spinner for image load too;
  - ...
- JS Code
  - Apply a better DRY principle;
  - Use JS Classes for better data structuring;
  - Create a function to round the pokemon height and weight;
  - Error handling using trycatch;
  - Constant code improvements...
- Problems
  - There are several I bet. Work in progress...

---

## Errors :no_entry:

Issues when searching for **tornadus**, **thundurus** and **landorus** as PokeApi accepts these only with ending **-incarnate**. Although using the IDs it works. Which are 641, 642 and 645 respectively.
