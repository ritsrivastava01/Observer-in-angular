# FrontMan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code Structure

Used below component:
1. Header component: User to show the header which contains 
    a. Login Button (Login the application)
    b. Logout button (if User already loggedIn)
    c. Jokes button (to redirect to jokes page)

2. Joke List Used to show the Jokes list and Favourite list
    a. Jokes List : Show the today's jokes inlist form
    b. Favourite : Show the favourite jokes list
    c. Joke card: Used to sheo the joke as card

3. Services:
    a. Validate-login.service: USed to validate the password
            -must contains 'abc', ced', 'xyz' etc
            - must contacins 2 same charecter next to eachother eg aa,bb,cc
    b. manage-fav.sservice: Used to save/remove the favourite joke
    c. get-jokes.service: Used to get jokes from server
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Yet to come!!!

