const dynamicNaming = require('./functions/dynamicNaming.js');
const getUniqueName = require('./functions/getUniqueName.js');

getUniqueName('./tests', 'getUniqueName.test.js').then(val => console.log(val));

module.exports = {
    dynamicNaming,
    getUniqueName
}