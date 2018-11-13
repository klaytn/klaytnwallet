/* eslint-disable */

import { checkValidPassword } from '../../src/utils/crypto'

describe('check valid password', () => {
    test('it requires more than 7 characters', () => {
        const shortPassword = "123!@#$"

        expect(checkValidPassword(shortPassword)).toBeFalsy()
    })

    test('special character must be included', () => {
        const noSpecialCha = "1234abcd"
        
        expect(checkValidPassword(noSpecialCha)).toBeFalsy()
    })

    test('At least one number must be included', () => {
        const noNum = "abcd!@#$"
        const validPassword = "1234!@#$"

        expect(checkValidPassword(noNum)).toBeFalsy()
        expect(checkValidPassword(validPassword)).toBeTruthy()
    })
  }
)



   