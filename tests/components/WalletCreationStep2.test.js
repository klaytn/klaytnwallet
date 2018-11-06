import { onit } from '../../src/klaytn/onit';

//To test a function that generates keystore by checking the forms of the data from it
test('generates valid data for keystore', () => {
    const { privateKey } = onit.klay.accounts.create();
    const password = "1234!@#$";
    const keystore = onit.klay.accounts.encrypt(privateKey, password); 
    /*
        expected keystore structure is like below:
        { version: 3,
        id: '69657dab-ac06-4163-a350-e5046d1af0d4',
        address: '89f9c1a3120f698792f925a571a794a36c8ef5d7',
        crypto: 
        { ciphertext: '89d1f06dacb913dda2ba7850a708fd548c7ab4759cc8b272543688f6414cfee4',
            cipherparams: { iv: '4f741cdeaf326881d344143797eed528' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: 
            { dklen: 32,
                salt: 'b86a4e45ffaf8e35330a5431ec2da0984cb93c399ca3b4fe3e1b23248f4b5231',
                n: 4096,
                r: 8,
                p: 1 },
            mac: 'e74612315f391a4d0ff187ed95f55591c048e3e0df5f24546a2954b865ef3053' } }
        */

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