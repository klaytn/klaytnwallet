import { onit } from '../../src/klaytn/onit';

//To test a function that generates keystore by checking the forms of the data from it
test('generates valid data for keystore', () => {
    const { privateKey } = onit.klay.accounts.create();
    const password = "1234!@#$";
    const keystore = onit.klay.accounts.encrypt(privateKey, password); 

   expect(keystore).toEqual(
       expect.objectContaining({
            version: 3,
            id: expect.any(String),
            address: expect.any(String),
            crypto: expect.objectContaining({
                ciphertext: expect.any(String),
                cipherparams: expect.objectContaining({
                    iv: expect.any(String)
                }),
                cipher: expect.any(String),
                kdf: "scrypt",
                kdfparams: expect.objectContaining({
                    dklen: expect.any(Number),
                    salt: expect.any(String),
                    n: expect.any(Number),
                    r: expect.any(Number),
                    p: expect.any(Number)
                }),
                mac: expect.any(String)
            })
       })
   )
});