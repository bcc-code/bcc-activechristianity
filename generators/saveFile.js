const fs = require('fs');
const stringify = require(`json-stringify-safe`);
const path = require('path');
function saveFile(folder, name, extension, data) {
	const filename = path.resolve(`${folder}/${name}.${extension}`);
	try {
		fs.writeFileSync(filename, stringify(data, null, 2));
	} catch (err) {
		console.error(
			`AC Translations could not save the file. Please make sure the folder structure is already in place.`,
			err
		);
	}

	console.log(`File ${filename} – saved`);
}

module.exports = saveFile;
