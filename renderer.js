var readFileSync = require("fs").readFileSync;
var key;
function mergeValues(values, content) {
   for(key in values) {
     content = content.replace("{{"+key+"}}", values[key]);
   }
   return content;
}

function view(templateName, values, response) {
  response.write(mergeValues(values, readFileSync("./views/" + templateName + ".html", {encoding:"utf8"})));
}

module.exports.view = view;
