import fs from 'node:fs';
import path from 'node:path';

/**
 * Asynchronously generates a unique name for a file or directory within a given folder.
 * If the provided name already exists in the folder, a suffix is appended to create a unique name.
 *
 * @async
 * @function
 * @param {string} folderPath - The path to the folder where the name should be unique.
 * @param {string} name - The desired name for the file or directory.
 * @returns {Promise<string|undefined>} - A promise that resolves to a unique name, or `undefined` if the folder does not exist.
 */

async function getUniqueName(folderPath, name) {
    try {
        if (! await directoryExists(folderPath)) {
            throw new Error(`${folderPath} directory doesn't exist.`);
        };

        const fullPath = path.join(folderPath, name);
        if (! await directoryExists(fullPath)) {
            return name;
        }

        const type = await getType(fullPath) // file or directory
        if (!type) return;

        if (type == 'directory') {
            return await appendSuffix(folderPath, name);
        } else {
            const extension = path.extname(fullPath);
            const fileName = path.basename(fullPath, extension);

            return await appendSuffix(folderPath, fileName, extension) + extension;
        }
    } catch (error) {
        throw error;
    }
}

async function appendSuffix(folderPath, name, extension = '') {
    let uniqueName = name;

    do{
        const parts = uniqueName.split('_');
        const suffix = parts.at(-1);
        const index = Number.isInteger(Number(suffix)) ? parseInt(suffix) : NaN;

        if (!isNaN(index)) {
            parts[parts.length - 1] = (index + 1).toString();
            uniqueName = parts.join('_');
        } else {
            uniqueName += '_1';
        }

    } while(await directoryExists(path.join(folderPath, uniqueName + extension)));

    return uniqueName;
}


async function getType(path) {
    try {
        const stats = await fs.stat(path);

        if (stats.isFile()) {
            return 'file';
        } else if (stats.isDirectory()) {
            return 'directory';
        }
    } catch (error) {
        throw new Error(`Failed to determine the type of the path '${path}': ${error.message}`);
    }
}

async function directoryExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

export default getUniqueName;