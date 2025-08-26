/**
 * Displays a result in a specified element.
 * @param {HTMLElement} element - The HTML element to display the result in.
 * @param {string} text - The text to display.
 */
export function showResult(element, text) {
    element.textContent = text;
    element.style.display = 'block';
}
