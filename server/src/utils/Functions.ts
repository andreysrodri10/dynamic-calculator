import * as CryptoJS from 'crypto-js'

/**
 * Utility functions collection.
 */
class Functions {
  /**
   * Asynchronously pauses execution for a specified duration.
   * @param {number} ms - The number of milliseconds to sleep.
   * @returns {Promise<void>} - A Promise that resolves after the sleep duration.
   */
  static sleep (ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Validates an HMAC token against a key and message.
   * @param {string | undefined} token - The HMAC token to validate.
   * @param {string} key - The secret key used for HMAC generation.
   * @param {string} message - The message used for HMAC generation.
   * @returns {boolean} - True if the token is valid, otherwise false.
   */
  static isValidHmacToken (token: string | undefined, key: string, message: string): boolean {
    if (!token) {
      return false
    }
    return token === this.generateHmacToken(key, message)
  }

  /**
   * Generates an HMAC token using a key and message.
   * @param {string} key - The secret key used for HMAC generation.
   * @param {string} message - The message to be hashed.
   * @returns {string} - The HMAC token in Base64 format.
   */
  static generateHmacToken (key: string, message: string): string {
    const hmac = CryptoJS.HmacSHA256(message, key)
    return CryptoJS.enc.Base64.stringify(hmac)
  }
}

export default Functions
