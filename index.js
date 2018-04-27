const convertToJson = require('./csv2json');
const utils = require('./utils');

const destination = process.argv[3] || 'csv';

if (destination !== 'csv' && destination !== 'db') {
  console.error('Destination not supported');
  return process.exit(1);
}

convertToJson(process.argv[2], false, (error, parsedData) => {
  if (error) {
    return console.error(error);
  }

  const processedData = {};

  const parsed = JSON.parse(parsedData);

  const keyNames = [];
  for (const key in parsed[0]) {
    keyNames.push(key);
  }

  parsed.forEach(data => {
    const keys = data[keyNames[0]].replace(/\'/g, '').split('\n').map(item => item.trim()).filter(item => item !== '');
    const values = data[keyNames[1]].replace(/\'/g, '').split('\n').map(item => item.trim()).filter(item => item !== '');
    keys.forEach(key => {
      if (!processedData[key]) {
        processedData[key] = [];
      }

      values.forEach(value => {
        processedData[key] = [...processedData[key], value];
      });
    });
  });

  switch (destination) {
    case 'csv':
    console.log('Saving to a csv file');
      utils.toCsv(processedData, 'mx_diag_nopos.csv', ['cod_empresa','cod_generico','cod_diagnostico','estado_nopos']);
      break;
    case 'db':
      console.log('TODO');
      // utils.toDb(processedData, 'dbname', 'connectionData');
      break;
    default:
      console.log('Unknown Destination');
      break;
  }
});
