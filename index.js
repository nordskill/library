const copyFiles = require('./functions/copy-files.js');
const ensureFolderExists = require('./functions/ensure-folder-exists.js');
const formatDate = require('./functions/format-date.js');
const generateHash = require('./functions/generate-hash.js');
const getUniqueName = require('./functions/get-unique-name.js');
const imageResizer = require('./functions/image-resizer.js');
const processNameTemplate = require('./functions/process-name-template.js');
const slugify = require('./functions/slugify.js');
const stripHtml = require('./functions/strip-html.js');

module.exports = {
    copyFiles,
    ensureFolderExists,
    formatDate,
    generateHash,
    getUniqueName,
    imageResizer,
    processNameTemplate,
    slugify,
    stripHtml
}