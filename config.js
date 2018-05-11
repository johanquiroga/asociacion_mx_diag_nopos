const ArgumentParser = require('argparse').ArgumentParser;
const version = require('./package.json').version;

const parser = new ArgumentParser({
  version: version,
  addHelp: true,
  description: 'Sript to process and format desorganized csv data'
});


parser.addArgument(
  [ '-f', '--input' ],
  {
    help: 'path to input file. It must be csv file.',
    required: true,
  }
);

parser.addArgument(
  [ '-o', '--output' ],
  {
    help: 'Type of output for the resulting data: to a csv file or directly to database',
    required: true,
    choices: ['csv', 'db']
  }
);

parser.addArgument(
  [ '-H', '--host' ],
  {
    help: 'Database host address',
  }
);

parser.addArgument(
  [ '-p', '--port' ],
  {
    help: 'Database port',
  }
);

parser.addArgument(
  [ '-d', '--database' ],
  {
    help: 'Database name',
  }
);

parser.addArgument(
  [ '-u', '--user' ],
  {
    help: 'Database user',
  }
);

parser.addArgument(
  [ '-P', '--password' ],
  {
    help: 'Database user password',
  }
);

parser.addArgument(
  [ '-N', '--dry-run' ],
  {
    help: 'Don’t actually add the record, just show what information will be inserted.',
    action: 'storeTrue'
  }
);

const args = parser.parseArgs();

module.exports = args;
