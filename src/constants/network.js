
// is http or https
const protocol = window ? window.location.protocol : 'http';
const port = process.env.API_PORT ? `:${process.env.API_PORT}` : '';

const APIEntry = `${protocol}//${process.env.API_HOST}${port}`

export default APIEntry
