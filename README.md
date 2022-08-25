# Tic Tac Toe (In space) 

A simple Tic Tac Toe game built using Create React App.

<img src="https://github.com/rndware/tic-tac-toe/blob/master/media/playing.gif" width="65%"/>

## Highlights

- Written in React/Redux/Typescript
- Use of functional components where possible
- Optimised table rending using `React.memo`
- Unit tested with BDD where possible
- Styled using Sass modules with BEM syntax
- Used Material UI for icons / inputs and buttons
- Decoupled board from game logic
- Partially responsive

## TO-DO

- Remove all 'any' types remaining
- Unit test all remaining modules
- Add in `classnames` for class toggling
- Reduce number of dispatch calls in `"game/playMove"` Thunk
- Make game service no longer global in module
- Use i18n and make fully translatable
- Create util for toggling element modifier e.g. `--highlight`
- Add storybook component explorer to project
- ~~Create settings page to change player difficulty~~
- Create player form to input player details: name, age, colour etc.

## Setup 

Run `npm i` to install packages

Run `npm test` to run unit tests

Run `npm start` to run locally on [http://localhost:3000](http://localhost:3000)