// Sandbox-only validation helper: the autonomous profile cannot read /etc/hosts.
const dns = require('node:dns');

const originalLookup = dns.lookup;
dns.lookup = function lookup(hostname, options, callback) {
  if (hostname !== 'localhost') return originalLookup.apply(this, arguments);

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (options?.all) {
    return process.nextTick(callback, null, [{ address: '127.0.0.1', family: 4 }]);
  }
  return process.nextTick(callback, null, '127.0.0.1', 4);
};

const originalPromiseLookup = dns.promises.lookup;
dns.promises.lookup = async function lookup(hostname, options) {
  if (hostname !== 'localhost') return originalPromiseLookup.call(this, hostname, options);
  if (options?.all) return [{ address: '127.0.0.1', family: 4 }];
  return { address: '127.0.0.1', family: 4 };
};
