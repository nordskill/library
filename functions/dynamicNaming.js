const tokens = require('../data/tokens.js');

/**
 * Generates a name based on a provided naming rule, replacing placeholders with corresponding values from a predefined tokens object.
 *
 * @function
 * @param {string} namingRule - The naming rule that contains placeholders in the format `{placeholder}`.
 * @returns {string|undefined} - The generated name with placeholders replaced by their corresponding values, or `undefined` if an error occurs.
 */

function generateName(namingRule) {
    if (!namingRule) {
        console.error('Please, provide a naming rule.');
        return;
    }

    const matches = namingRule.match(/{(.*?)}/g);
    let output = namingRule;

    if (!matches) {
        return output;
    }

    const extractedTokens = matches.map(match => match.replace(/[{}]/g, ''));

    for(const token of extractedTokens) {
        if (!tokens[token]) {
            console.error(`Couldn't find a token in the object.`)
            return;
        }

        output = output.replace(new RegExp(`{${token}}`, 'g'), tokens[token].value || '')
    }

    return output;
}

module.exports = generateName;