var https = require("https"),
    http = require("http");

var printMessage = function (username, badgeCount, points) {
  console.log(username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript");
};

var printError = function (error) {
  console.error(error.message);
};


module.exports.get = function (username) {

  https.get("https://teamtreehouse.com/" + username + ".json",
    function (response) {
      var body = "";
      response.on("data", function (chunk) {
        body += chunk;
      });
      response.on("end", function () {
        if(response.statusCode === 200) {
          try {
          var profile = JSON.parse(body);
  	  printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch(error) {
            printError(error);
	  }
	} else {
          printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
	}
      });
    })
    .on("error", printError);
}

