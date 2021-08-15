const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload({
	safeFileNames: true,
	preserveExtension: true,
}));

// eslint-disable-next-line no-unused-vars
const reload = setInterval(function() { main(); }, 2000);

function main() {
	const Files = fs.readdirSync('./public/Images/');
	console.log('Reloaded');
	for (const file of Files) {
		let filetype = 'img';
		const filename = file.split('.')[0];
		const fileending = file.split('.')[1];
		if (fileending == 'mp4' || fileending == 'mov') {
			filetype = 'vid';
		}
		app.get(`/${filename}`, function(req, res) {
			res.render(`Base${filetype}`, {
				file: file,
				ending: fileending,
			});
		});
	}
}

app.post('/upload', function(req, res) {
	const rkey = process.env.key;
	const key = req.query.key;
	if (!key == rkey) {
		res.status(401);
		return res.send('Give a valid key bruh.');
	}
	const file = req.files.file;
	const filename = file.name;
	const url = filename.split('.')[0];
	file.mv(`public/Images/${filename}`);
	return res.send(url);
});

app.listen(80);
console.log('Server is now ready!');
