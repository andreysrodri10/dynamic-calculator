import Functions from '../src/utils/Functions'

describe('Validating HMAC token', () => {
  it('should correctly create HMAC token', async () => {
    const result = Functions.generateHmacToken('98SADF9843', 'tasks-dashboard')

    expect(result).toEqual('oEDMp+G7QoUepjnGE+IL5PNgTLl/yQ3uUrVyF/r28UU=')
  })

  it('should correctly validate HMAC token', async () => {
    const token = 'oEDMp+G7QoUepjnGE+IL5PNgTLl/yQ3uUrVyF/r28UU='
    const result = Functions.isValidHmacToken(token, '98SADF9843', 'tasks-dashboard')

    expect(result).toEqual(true)
  })
})
