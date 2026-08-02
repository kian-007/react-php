/*const protocol = window.location.protocol;
const domain = window.location.hostname;
const port = window.location.port;


const PROJECT_URL = `${protocol}//${domain}:${port? port : ""}`

export { PROJECT_URL }
*/

const PROJECT_URL = process.env.PUBLIC_URL;

export { PROJECT_URL };
