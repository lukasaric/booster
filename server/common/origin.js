'use strict';

const { hostname, port, reverseProxyPort } = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  origin: resolveOrigin()
};

function resolveOrigin(protocol = 'https') {
  const host = !isProduction
    ? `${hostname || 'localhost'}${resolveOriginPort()}`
    : hostname;
  return `${protocol}://${host}`;
}

function resolveOriginPort() {
  if (!reverseProxyPort) return `:${port}`;
  if (reverseProxyPort === '80' || reverseProxyPort === '443') return '';
  return `:${reverseProxyPort}`;
}
