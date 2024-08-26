/**
 * Converts a given string into a URL-friendly "slug" by normalizing Unicode characters,
 * converting to lowercase, replacing spaces and underscores with hyphens,
 * and removing non-alphanumeric characters.
 *
 * @function
 * @param {string} input - The string to be slugified.
 * @returns {string} - The slugified version of the input string.
 */

function slugify(input) {
    return String(input)
        .normalize('NFKD')  // Normalize Unicode characters
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')  // Replace spaces and underscores with hyphens
        .replace(/[^\p{L}\p{N}-]+/gu, '')  // Remove all non-alphanumeric characters except hyphens
        .replace(/-+/g, '-')  // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');  // Remove leading and trailing hyphens
}

module.exports = slugify;