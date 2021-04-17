const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload({
	safeFileNames: true,
	preserveExtension: true
}));

const reload = setInterval(function () { main() }, 2000);

function main() {
	let Filetype = 'img';
	const Files = fs.readdirSync('./public/Images/pro');
	for (const file of Files) {
		const filename = file.split('.')[0];
		app.get(`/${filename}`, function (req, res) {
			res.render(`pro${Filetype}`, {
				file: file
			})
		});
	}
	let filetype = 'img';
	const otherFiles = fs.readdirSync('./public/Images/nuha');
	for (const file of otherFiles) {
		const filename = file.split('.')[0];
		const fileending = file.split('.')[1];
		if (fileending == 'mp4' || fileending == 'mov') {
			filetype = 'vid'
		}
		app.get(`/${filename}`, function (req, res) {
			res.render(`nuha${filetype}`, {
				file: file

			})
		});
	}
	console.log('Reloaded')
}

app.post('/upload', function (req, res) {
	const prokey = process.env.prokey;
	const nuhakey = req.query.nuhakey
	const key = req.query.key;
	let who;
	let path;
	if (key == prokey) {
		who = 'pro';
		path = 'public/Images/pro'
	}
	if (key == nuhakey) {
		who = 'nuha'
		path = 'public/Images/nuha' 
	}
	if (!key || !key == nuhakey || !key == prokey) {
		res.status(401);
		return res.send('Give a valid key bruh.');
	}
	const file = req.files.file;
	const filename = file.name;
	const url = filename.split('.')[0];
	file.mv(`${path}/${filename}`);
	return res.send(url);
});

app.listen(8080);
console.log('Server is now ready!');