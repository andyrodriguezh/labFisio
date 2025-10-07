/**
 * Checks if any of the provided values are missing (null, undefined, 0, '').
 * @param {Array<any>} values - An array of values to check.
 * @param {string} message - The message to alert if validation fails.
 * @returns {boolean} - True if validation passes, false otherwise.
 */
export function areValuesPresent(values, message) {
    if (values.some(v => !v)) {
        alert(message);
        return false;
    }
    return true;
}

/**
 * Validates if a value is within a given range.
 * @param {number} value - The value to check.
 * @param {number} min - The minimum allowed value.
 * @param {number} max - The maximum allowed value.
 * @param {string} message - The message to alert if validation fails.
 * @returns {boolean} - True if validation passes, false otherwise.
 */
export function isValueInRange(value, min, max, message) {
    if (value < min || value > max) {
        alert(message);
        return false;
    }
    return true;
}

/**
 * Validates if a value is a positive number.
 * @param {number} value - The value to check.
 * @param {string} message - The message to alert if validation fails.
 * @returns {boolean} - True if validation passes, false otherwise.
 */
export function isPositive(value, message) {
    if (value <= 0) {
        alert(message);
        return false;
    }
    return true;
}

/**
 * Validates if a value is not negative.
 * @param {number} value - The value to check.
 * @param {string} message - The message to alert if validation fails.
 * @returns {boolean} - True if validation passes, false otherwise.
 */
export function isNotNegative(value, message) {
    if (value < 0) {
        alert(message);
        return false;
    }
    return true;
}

/**
 * Validates if a value is a valid percentage (0-100).
 * @param {number} value - The value to check.
 * @param {string} message - The message to alert if validation fails.
 * @returns {boolean} - True if validation passes, false otherwise.
 */
export function isPercentage(value, message) {
    if (value < 0 || value > 100) {
        alert(message);
        return false;
    }
    return true;
}
