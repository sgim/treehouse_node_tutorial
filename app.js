var profile = require("./profile");
var users = process.argv.slice(2);

users.length ? users.forEach(profile.get):
  console.log("Please provide usernames to search");

