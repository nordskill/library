/**
 * Removes all HTML tags from a given string and returns only the text content.
 *
 * @function
 * @param {string} html - The string containing HTML that needs to be stripped of tags.
 * @returns {string} - The plain text content without any HTML tags.
 */

function stripHtml(html) {
    let temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
}

module.exports = stripHtml;
