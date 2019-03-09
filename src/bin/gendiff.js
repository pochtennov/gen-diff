#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.6')
  .option('-f, --format [type]', 'Output format', 'object')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
