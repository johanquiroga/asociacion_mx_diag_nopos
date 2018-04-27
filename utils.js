const fs = require('fs');
const path = require('path');

exports.toCsv = (data, filename = path.join(__dirname, 'data.csv'), headers = []) => {
  fs.writeFileSync(filename,`${headers.join(',')}\n`);
  for (const key in data) {
    data[key].forEach(d => {
      fs.appendFileSync(filename, `5,${key},${d},S\n`);
    });
  }
};
