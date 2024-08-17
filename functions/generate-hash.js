const fs = require('fs');
const crypto = require('crypto');

/**
 * Asynchronously generates a SHA-256 hash for a file at the given path.
 *
 * @async
 * @function
 * @param {string} path - The file path for which the hash should be generated.
 * @returns {Promise<string>} - A promise that resolves to the SHA-256 hash of the file in hexadecimal format.
 */

async function generateHash(path){
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(path);

        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', err => reject(err));
      });
}

module.exports = generateHash;