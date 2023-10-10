#!/usr/bin/env node

import { Command } from "commander";
import genDiff from "./src/index.js";

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .version('0.8.0');
program.parse()