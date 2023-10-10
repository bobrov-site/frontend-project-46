#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../src/index.js";

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<file1path1> <filepath2>')
program.parse()