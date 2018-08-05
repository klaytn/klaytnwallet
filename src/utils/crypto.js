import randombytes from 'randombytes'

export const getRandomBytes = () => randombytes(32)
  .reduce((acc, cur) => {
    return acc += (cur.toString(16).length == 2)
      ? cur.toString(16)
      : '0' + cur.toString(16)
    }, '')
