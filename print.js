var message = function (username, badgeCount, points) {
  console.log(username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript");
};

var error = function (error) {
  console.error(error.message);
};

module.exports.message = message;
module.exports.error = error;
