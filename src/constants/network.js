
// is http or https
const protocol = window ? window.location.protocol : 'http';
const port = process.env.API_PORT ? `:${process.env.API_PORT}` : '';
const ORIGIN = process.env.API_HOST ? process.env.API_HOST : window.location.hostname

const API_ENTRY = `${protocol}//${ORIGIN}${port}`;

export default API_ENTRY;
