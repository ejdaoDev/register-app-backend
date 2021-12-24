const { diskStorage } = require('multer');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'public/images'))
    },
    filename: (req, file, callback) => {
        let mimetype = file.mimetype;
        let extension = mimetype.replace("image/", "");
        callback(null, `${file.fieldname}_${Date.now()}.` + extension)
    }
});

module.exports = storage;