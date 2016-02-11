var renderer = require("./renderer").view;
var Profile = require("./Profile");
var commonHeader = {"Content-Type": "text/html"};
var parse = require("querystring").parse;
var user, url;
function load(request, response) {
  url = request.url;
  if(url === "/") {
    if(request.method.toLowerCase() === "get") {
      response.writeHead(200, commonHeader);
      renderer("header", {}, response);
      renderer("search", {}, response);
      renderer("footer", {}, response);
      response.end();
    } else {
      request.on("data", function (postBody) {
	// http header 303 redirects new GET request
	response.writeHead(303, {
	  "Location": "/" + parse(postBody.toString()).username
	});
	response.end();
      });
    }
  } else if ((user = url.replace("/","")).length) {
    response.writeHead(200, commonHeader);
    renderer("header", {}, response);
    new Profile(user).on("end", function(json) {
      renderer("profile", {
        avatarUrl: json.gravatar_url,
	username: json.profile_name,
	badges: json.badges.length,
	javascriptPoints: json.points.JavaScript
      }, response);
      renderer("footer", {}, response);
      response.end();
    }).on("error", function(error) {
      renderer("error", {errorMessage: error.message}, response);
      renderer("search", {}, response);
      renderer("footer", {}, response);
      response.end();
    });
  }
}
module.exports.load = load;
