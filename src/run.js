const { fail, pass } = require('create-jest-runner');
const lint = require('markdownlint');
const chalk = require('chalk');
const table = require('text-table');
const stripAnsi = require('strip-ansi');
const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG_FILES = ['.markdownlint.json', '.markdownlint.yaml'];

module.exports = ({ config, testPath }) => {
  const start = Date.now();
  const { displayName, rootDir } = config;
  const options = {
    files: [ testPath ]
  };

  DEFAULT_CONFIG_FILES.forEach(file => {
    if (fs.existsSync(`${rootDir}/${file}`)) {
      options.config = require(`${rootDir}/${file}`);
    }
  });

  const results = lint.sync(options);

  if (!(testPath in results)) {
    return fail({
      start,
      end: Date.now(),
      test: {
        errorMessage: 'Unable to lint file',
        path: testPath,
        title: displayName
      }
    });
  }

  const result = results[testPath];

  if (result.length > 0) {
    let output = '\n';
    output += `${chalk.underline(testPath)}\n`;

    output += `${table(
      result.map(message => {
        return [
          '',
          Array.isArray(message.errorRange) ? message.errorRange[0] : 0,
          Array.isArray(message.errorRange) ? message.errorRange[1] : 0,
          chalk.red('error'),
          message.ruleDescription || '',
          chalk.dim(Array.isArray(message.ruleNames) ? message.ruleNames[1] : '')
        ];
      }),
      {
        align: ['', 'r', 'l'],
        stringLength (str) {
          return stripAnsi(str).length;
        }
      }
    ).split('\n').map(el => el.replace(/(\d+)\s+(\d+)/, (m, p1, p2) => chalk.dim(`${p1}:${p2}`))).join('\n')}\n\n`;

    return fail({
      start,
      end: Date.now(),
      test: {
        errorMessage: output,
        path: testPath,
        title: displayName
      }
    });
  }

  return pass({
    start,
    end: Date.now(),
    test: { path: testPath, title: displayName }
  });
};