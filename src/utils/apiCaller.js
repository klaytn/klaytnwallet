import { APIEntry } from 'constants/network'

export const callAPI = (endpoint, body, optionalHeaders = {}) =>
  fetch(`${APIEntry}${endpoint}`, {
    method: 'POST',
    headers: Object.assign({
      'Content-Type': 'application/json',
    }, optionalHeaders),
    body: typeof body === 'object' ? JSON.stringify(body) : body,
  })
    .then(res => res.json())
    .then(json => {
      // if (json.status === 'FAIL' && errorTemplates[json.code]) {
      //   ui.showModal(errorTemplates[json.code])
      // }
      return json
    })
    .catch(err => console.log(`Error catch: ${err}`))

export default callAPI
