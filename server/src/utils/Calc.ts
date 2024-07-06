/**
 * Class representing basic arithmetic operations.
 */
class Calc {
  /**
   * Performs addition of two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The result of the addition.
   */
  static addition (a: number, b: number): number {
    return a + b
  }

  /**
   * Performs subtraction of two numbers.
   * @param {number} a - The first number (minuend).
   * @param {number} b - The second number (subtrahend).
   * @returns {number} The result of the subtraction.
   */
  static subtraction (a: number, b: number): number {
    return a - b
  }

  /**
   * Performs multiplication of two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The result of the multiplication.
   */
  static multiplication (a: number, b: number): number {
    return a * b
  }

  /**
   * Calculates the remainder of division of two numbers.
   * @param {number} a - The dividend.
   * @param {number} b - The divisor.
   * @returns {number} The remainder of the division.
   */
  static remainder (a: number, b: number): number {
    return a % b
  }

  /**
   * Performs division of two numbers.
   * @param {number} a - The dividend.
   * @param {number} b - The divisor (cannot be zero).
   * @throws {Error} Division by zero error if divisor is zero.
   * @returns {number} The result of the division.
   */
  static division (a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero')
    }
    return a / b
  }
}

export default Calc
