const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const args = require('./config');

const getQuery = (query) => {
  let result = query.text;
  if (query.values) {
    query.values.map((value, index) => {
      result = result.replace(`$${index+1}`, value)
    });
  }

  return result;
};

const checkDbArgs = (config) => Object.values(config).some(arg => arg === null);

exports.toCsv = (data, filename = path.join(__dirname, 'data.csv'), headers = []) => {
  fs.writeFileSync(filename,`${headers.join(',')}\n`);
  for (const key in data) {
    data[key].forEach(d => {
      fs.appendFileSync(filename, `5,${key},${d},S\n`);
    });
  }
};

exports.toDb = (data) => {

  const {user, host, database, password, port} = args;

  if (checkDbArgs({
    user,
    host,
    database,
    password,
    port,
  })) {
    return console.log('Please check input parameters for db connection') && process.exit(1);
  }

  const queryObj = {
    text: "INSERT INTO vademecum_generico_nopos_condicionado(cod_empresa,cod_generico,cod_diagnostico,estado_nopos)"
          + " VALUES ($1,$2,$3,$4)",
    values: []
  };

  for (const key in data) {
    data[key].forEach(d => {
      queryObj.values = [5,`'${key}'`,`'${d}'`,"'S'"];
      if (args.dry_run) {
        console.log(getQuery(queryObj) + ";");
      } else {
        const client = new Client({
          user,
          host,
          database,
          password,
          port,
        });

        client.connect();

        client.query(queryObj, (err, res) => {
          if (err) {
            console.error(err.detail);
            //console.error(err.stack);
          }

          client.end();
        });
      }
    });
  }
  console.log('Data inserted');
};
