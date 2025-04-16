import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import json from '../src/parse.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');

program.parse();

const filepath1 = program.args[0];
// const filepath2 = program.args[1];
// const option = program.opts().format;

console.log(json(readFileSync(filepath1)));
