import { isValidPrivateKey } from '../../src/utils/crypto'
import { onit } from '../../src/klaytn/onit'

describe('checks if the possible privatekey is valid or not', () => {
    test(`should start with the prefix "0x"`, () => {
        const wrongPrefix = "0a"  
        const privateKeyCandidate = wrongPrefix + "0".repeat(64)

        expect(isValidPrivateKey(privateKeyCandidate)).toBeFalsy()
    })

    test('should be hexadecimal string', () => {
        const rightPrefix = "0x"
        const privateKeyCandidate = rightPrefix + "g" + "0".repeat(63)

        expect(isValidPrivateKey(privateKeyCandidate)).toBeFalsy()
    })

    test('length should be 66', () => {
        const rightPrefix = "0x"
        const privateKeyCandidate1 = rightPrefix + "0".repeat(63)
        const privateKeyCandidate2 = rightPrefix + "0".repeat(64)

        expect(isValidPrivateKey(privateKeyCandidate1)).toBeFalsy()
        expect(isValidPrivateKey(privateKeyCandidate2)).toBeTruthy()
    })
})


test('checks if it holds the right address for the account', () => {
    const { privateKey, address } = onit.klay.accounts.create()
    const wallet = onit.klay.accounts.wallet.add(privateKey) 

    expect(wallet.address).toEqual(address)    
})



