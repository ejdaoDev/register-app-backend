"use strict";

var _require = require('multer'),
    diskStorage = _require.diskStorage;

var multer = require('multer');

var path = require('path');

var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, path.join(__dirname, 'public/images'));
  },
  filename: function filename(req, file, callback) {
    var mimetype = file.mimetype;
    var extension = mimetype.replace("image/", "");
    callback(null, "".concat(file.fieldname, "_").concat(Date.now(), ".") + extension);
  }
});
module.exports = storage;