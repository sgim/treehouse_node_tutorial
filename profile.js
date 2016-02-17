// cached variables for use in module
var https = require("https"),
    http = require("http"),
    print = require("./print"),
    perror = print.error,
    pmessage = print.message,
    body, profile;

// module to export
module.exports.get = function (username) {
  https.get("https://teamtreehouse.com/" + username + ".json", function (response) {
    body = "";
    response.on("data", function (chunk) {
      body += chunk;
    })
    .on("end", function () {
      if(response.statusCode === 200) {
        try {
        profile = JSON.parse(body);
	pmessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          perror(error);
	}
      } else {
        perror({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  })
  .on("error", perror);
}

