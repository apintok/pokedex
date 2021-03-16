**v 1.0.0** :hammer:

**live at** _https://pokefindex.herokuapp.com_

---

## Introduction :open_book:

This small App goal is to access the data available when calling [PokéAPI](https://pokeapi.co) and display it for easy reading on the browser - kind of like a small Pokédex. I'm watching a couple of courses on [Udemy](https://www.udemy.com) and taking advantage of this idea to apply my knowledge and also learn Web Development as I go.

---

## Requirements :file_folder:

**This App current version requires the following dependencies:**

- NodeJS
- Express
- EJS
- Axios

---

## Installation :pen:

It should be a standard installation using `npm install` after downloading the code.

**_Important to note_** that most of the JS code is frontend. It has different files on the _public/js_ directory. Everything is bundled together using Parcel :package:. I'm guessing that if changes are made to JS the code, then it will need to be bundled together again.

---

## Current Funcionality :heavy_check_mark:

Type the Pokémon name/id you want to search for. The button 'GO!' will return a Pokémon image, name, id, type(s), generation, height and weight of that Pokémon. The Random button will return a random Pokémon with the same information.
Then by clicking catch it's possible to be build a collection of Pokémons.

---

## Next Steps / Working on :construction:

- UI
  - Add functionality to the 'More Info' button; :heavy_check_mark:
  - Change the button 'Catch' positioning; :heavy_check_mark:
  - Implement responsiveness; :heavy_check_mark:
  - Need to make away of _**greying**_ out the button when no back image available;
  - ...
- JS Code
  - Apply a better DRY principle;
  - Use JS Classes for better data structuring;
  - User input error handling; :heavy_check_mark:
  - Add Axios and async/await for new Promise calls; :heavy_check_mark:
  - Structure the findPokemon() function; :heavy_check_mark:
  - Constant code improvements;
  - Create a function to round the pokemon height and weight; :heavy_check_mark:
  - Structure the findPokemon function;
  - Error handling using trycatch;
  - ...
- Problems
  - If the selected _view_ of the Pokemon is **back** on clicking catch the pokemon will be saved with that img;
  - PokeAPI Gen VI Pokemon don't have back images available, so I am working on how to prevent the user from changing the image to those Pokemon.
  - ...

---

## Errors :no_entry:

After installing axios I was prompt with an error in the browser stating that _regenerationRuntime is not defined_. I had to install the npm module regeneration-runtime as a dependency in order to fix the problem.

Issues when searching for **tornadus**, **thundurus** and **landorus** as PokeApi accepts these only with ending **-incarnate**. Although using the IDs it works. Which are 641, 642 and 645 respectively.
