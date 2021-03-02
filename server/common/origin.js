'use strict';

const port = resolvePort();
const origin = resolveOrigin();

module.exports = {
  port,
  origin
};

function resolveOrigin(hostname = 'localhost', protocol = 'http') {
  return `${protocol}://${hostname}${resolveOriginPort(hostname)}`;
}

function resolvePort() {
  const { SERVER_PORT } = process.env;
  return SERVER_PORT || 5000;
}

function resolveOriginPort() {
  const { REVERSE_PROXY_PORT } = process.env;
  if (!REVERSE_PROXY_PORT) return `:${port}`;
  if (REVERSE_PROXY_PORT === '80' || REVERSE_PROXY_PORT === '443') return '';
  return `:${REVERSE_PROXY_PORT}`;
}
