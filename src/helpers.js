/**
 * Convert a given variable to the right type ('1' will be 1, 'true' will be true etc.)
 *
 * @param   {mixed} variable
 * @returns {mixed}
 */
export function convert_to_right_type(variable) {
    let value;

    // Convert to the right type. '1' will be 1, 'true' will be true etc. If eval fails it's a regular string.
    try {
        value = eval(variable);
    } catch (e) {
        value = variable;
    }

    return value;
}
