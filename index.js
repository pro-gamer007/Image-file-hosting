const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const reload = setInterval(function(){ main() }, 2000);

function main() {
  const Files = fs.readdirSync('./public/Images/');
  console.log('Reloaded')
  for (const file of Files) {
  const filename = file.split('.')[0];
  app.get(`/${filename}`, function(req, res) {
    res.render("Base", {
      file: file
    })
});
}
}

app.listen(8080);
console.log('Server is now ready!');