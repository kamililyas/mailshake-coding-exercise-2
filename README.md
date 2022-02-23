# mailshake-coding-exercise
Coding exercise from Mailshake


To run please follow these steps:

1. `git clone <repo_url>`
2. `cd mailshake-coding-exercise-2`
3. Make a copy of the `.env-example` file with the name `.env` and enter desired settings for DB
4. Create a DB by the name entered in the `.env` file previously and use the file `schema.sql` to get the structure for this DB initiated
5. Create empty output directory by running `mkdir output`
6. run `npm install` to install dependencies
7. run `npm run lint` to make sure code is properly formatted(Google format applied)
8. run `npm run test` to run available tests
9. run `npm start` to execute the program as a terminal process which will get data for movies and characters from the Star Wars API

Note: This app runs with the latest LTS release of node versioned `16.13.2` using TS and ES6
