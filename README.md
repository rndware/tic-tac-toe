# Tic Tac Toe (In space) 

A simple Tic Tac Toe game built using Create React App

![alt text](https://github.com/rndware/tic-tac-toe/blob/master/media/playing.gif)

Highlights:

- Written in React/Redux/Typescript
- Use of functional components where possible
- Optimised table rending using `React.memo`
- Unit tested with BDD
- Styled using Sass modules with BEM syntax
- Used Material UI for icons / inputs and buttons
- Decoupled board from game logic
- Responsive

TO-DO:

- Remove all 'any' times remaining
- Unit test all modules
- Add in `classnames` for class name toggling
- Reduce number of dispatch calls in `"game/playMove"` Thunk
- Make game service no longer global in module
- Use i18n and make fully translatable
- Create util for toggling element modifier e.g. `--highlight`
- ~~Create settings page to change player difficulty~~
- Create player form to input player details: name, age, colour etc.

## Setup 

Run `npm i` to install packages

Run `npm test` to run unit tests

Run `npm start` to run locally on [http://localhost:3000](http://localhost:3000)