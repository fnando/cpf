/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in PT-BR).
 *
 * You can learn more about the algorithm on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers a string with only numbers.
 * @returns {number} the verifier digit.
 */
export declare function verifierDigit(numbers: string): number;
/**
 * Transform the input into a pretty CPF format.
 *
 * Example:
 * ```
 * format('12345678901');
 * // Result: '123.456.789-01'
 * ```
 *
 * @export
 * @param {string} cpf the CPF.
 * @returns {string} the formatted CPF.
 */
export declare function format(cpf: string): string;
/**
 * Remove some characters from the `number` input.
 *
 * Example:
 * ```
 * strip('29537995593'); // Result: '29537995593'
 * strip('295.379.955-93'); // Result: '29537995593'
 * strip('295a379b9c5d59e3'); // Result: '29537995593'
 * strip('295a379b9c5d59e3', true); // Result: '295a379b9c5d59e3' - Attention!
 * ```
 *
 * @export
 * @param {string} cpf the CPF text.
 * @param {boolean} [isStrict] if `true`, it will remove only `.` and `-` characters.
 *                             Otherwise, it will remove all non-digit (`[^\d]`) characters. Optional.
 * @returns {string} the stripped CPF.
 */
export declare function strip(cpf: string, isStrict?: boolean): string;
/**
 * Validate the CPF.
 *
 * @export
 * @param {string} cpf the CPF number.
 * @param {boolean} [isStrict] if `true`, it will accept only `digits`, `.` and `-` characters. Optional.
 * @returns {boolean} `true` if CPF is valid. Otherwise, `false`.
 */
export declare function isValid(cpf: string, isStrict?: boolean): boolean;
/**
 * Generate a random CPF.
 *
 * @export
 * @param {boolean} [useFormat] if `true`, it will format using `.` and `-`. Optional.
 * @returns {string} the CPF.
 */
export declare function generate(useFormat?: boolean): string;
