# Get Jokes Randomly

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Topic Cover

This application is able to demonstrate the below feature:
1. Login in the application with following pattern:
    1. password must include one increasing straight of at least three letters, like  `abc`, `cde`, `fgh` and so on, up to `xyz` . They cannot skip letters; `acd` doesn't count.
    2. Password may not contain the letters `i, O, or l`.
    3. Passwords must contain at least two non-overlapping pairs of letters, like `aa, bb, or cc`.
    4. Sample Password are: `abcaabb`,`qqwwxyz`,`pqrwwee` etc.
    
2. Fetch the record from service by Observer pattern and used subjects
3. User can save the record as favourite record
4. Turn On/Off to button to fetch the record randomly till 10
5. Demonstrate the use of modular application using:
    * Login Module => contains login logic
    * Joke view ==> Used to modularize the joke view, Favourite view


## Code Structure

Used below component:
1. Header component: User to show the header which contains 
    * Login Button (Login the application)
    * Logout button (if User already loggedIn)
    * Jokes button (to redirect to jokes page)

2. Joke List Used to show the Jokes list and Favourite list
    * Jokes List : Show the today's jokes in list form (Card Layout)
    * Favourite : Show the favourite jokes list
    * Joke card: Used to show the joke as card

3. Services:
    * Validate-login.service: USed to validate the password
    * manage-fav.service: Used to save/remove the favourite joke
    * get-jokes.service: Used to get jokes from server

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Yet to come!!!
## URL
[Observable In Angular](https://ritsrivastava01.github.io/Observer-in-angular/ )

