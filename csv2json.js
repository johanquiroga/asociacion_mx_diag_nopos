const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const converter = csv();

const convertToJson = (csvPath = path.join(__dirname, 'data.csv'), saveFile = true, cb = null) => {
  console.log('Converting', csvPath);

  let jsonData = {};
  const jsonFile = csvPath.substr(0, csvPath.lastIndexOf(".")) + ".json";

  converter.fromFile(csvPath)
  .on('end_parsed', (jsonObj) => {
    jsonData = JSON.stringify(jsonObj, null, 2);
  })
  .on('done', (error) => {
    if (error) {
      console.error(error);
      if (cb) {
        cb(error, null);
      }

      return Promise.reject(error);
    }

    if (saveFile) {
      fs.writeFileSync(jsonFile, jsonData);
      console.log('conversion done in', jsonFile);
      if (cb) {
        return cb(null, jsonFile);
      } else {
        return Promise.resolve(jsonFile);
      }
    } else {
      if (cb) {
        return cb(null, jsonData);
      } else {
        return Promise.resolve(jsonData);
      }
    }
  }).on('error', (error) => {
    console.error(error);
    if (cb) {
      return cb(error, null);
    } else {
      return Promise.reject(error);
    }
  });
};

module.exports = convertToJson;
