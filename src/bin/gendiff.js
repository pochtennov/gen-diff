#!/usr/bin/env node
import program from 'commander';
import showDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.6')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(showDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
