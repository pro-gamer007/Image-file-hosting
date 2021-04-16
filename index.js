const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');

const Files = fs.readdirSync('./Images/');
for (const file of Files) {
  const filename = file.split('.')[0];
  app.get(`/${filename}`, function(req, res) {
    res.render("Base", {
      file: file
    })
});
}

app.listen(8080);
console.log('Server is now ready!');