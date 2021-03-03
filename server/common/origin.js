'use strict';

const { hostname, port: PORT, reverseProxyPort } = require('../config');

const port = PORT || 5000;
const origin = resolveOrigin();

module.exports = {
  port,
  origin
};

function resolveOrigin(protocol = 'http') {
  return `${protocol}://${hostname || 'localhost'}${resolveOriginPort(hostname)}`;
}

function resolveOriginPort() {
  if (!reverseProxyPort) return `:${port}`;
  if (reverseProxyPort === '80' || reverseProxyPort === '443') return '';
  return `:${reverseProxyPort}`;
}
