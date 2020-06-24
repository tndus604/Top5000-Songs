var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hyomi1338",
    database: "top_songsDB"
  });

connection.connect(function(err) {
    if(err) throw err;
    runSearch();
})

function runSearch() {
    inquirer.prompt({
        name: "searchOption",
        type: "list",
        message: "How would you like to search by?",
        choices: ["Find songs by artist", "Find songs by title", "Find songs by year", "Find songs within a specific range", "Find all artists who appear more than once", "exit"]
    }).then(function(answer) {
        switch(answer.searchOption) {
        case "Find songs by artist":
            artistSearch();
            break;
        
        case "Find songs by title":
            titleSearch();
            break;

        case "Find songs by year":
            yearSearch();
            break;

        case "Find songs within a specific range":
            rangeSearch();
            break;
        
        case "Find all artists who appear more than once":
            allartistsSearch();
            break;

        case "exit":
            connection.end();
            break;
        }
    })
}

function artistSearch() {
    inquirer.prompt(
    {
        name: "artist",
        type: "input",
        message: "What artist would you like to search?"
    }
    ).then (function(answer) {
        connection.query("SELECT position, song, year FROM top5000 WHERE ?",
        { artist: answer.artist }, 
        function(err, res) {
            if(err) throw err;
            console.log(`Here is the result of songs by ${answer.artist}`);
            console.table(res);
            runSearch();
        })
    })
}

function titleSearch() {
    inquirer.prompt(
        {
            name: "title",
            type: "input",
            message: "What is the title of the song you would like to search?"
        }
    ).then ( function(answer) {
        connection.query ("SELECT position, artist, song, year FROM top5000 WHERE ?", 
        { song: answer.title }, 
        function(err, res) {
            if (err) throw err;
            console.log(`Here is the result by title ${answer.title}`)
            console.table(res);
            runSearch();
        })
    })
}