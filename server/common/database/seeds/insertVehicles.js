'use strict';

const fs = require('fs');
const path = require('path');

const TABLE_NAME = 'vehicle';

module.exports.up = async qi => {
  const seedPath = path.join(__dirname, 'vehicles.json');
  const vehicles = await loadJson(seedPath);
  return qi.bulkInsert(TABLE_NAME, processItems(vehicles), {});
};

module.exports.down = qi => qi.bulkDelete(TABLE_NAME, null, {});

const processItems = items => items.map(({ make, model, year }) => {
  const now = new Date();
  const dates = { created_at: now, updated_at: now };
  return { make, model, year, ...dates };
});

function loadJson(path) {
  return new Promise((resolve, reject) => {
    return fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
}
