#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const buildProgram = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const opts = program.opts();
      console.log(gendiff(filepath1, filepath2, opts.format));
    });

  return program;
};

if (process.argv[1] === new URL(import.meta.url).pathname) {
  buildProgram().parse(process.argv);
}
