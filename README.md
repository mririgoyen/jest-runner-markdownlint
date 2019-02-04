<div align="center">
  <img width="150" src="https://cdn.worldvectorlogo.com/logos/markdown.svg">
  <a href="https://facebook.github.io/jest/">
    <img height="100" vspace="" hspace="25" src="https://cdn.worldvectorlogo.com/logos/jest-0.svg">
  </a>
  <h1>jest-runner-markdownlint</h1>
  <p>Markdown Lint runner for Jest</p>
</div>

# Usage

## Install

Install `jest` _(Jest 21+)_ and `jest-runner-markdownlint`

```bash
yarn add --dev jest jest-runner-markdownlint
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "runner": "jest-runner-markdownlint",
    "displayName": "Markdown Lint",
    "testMatch": ["<rootDir>/src/**/*.md"],
    "moduleFileExtensions": ["md"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: 'jest-runner-markdownlint',
  displayName: 'Markdown Lint',
  testMatch: ['<rootDir>/src/**/*.md'],
  moduleFileExtensions: ['md']
}
```

### Run Jest

```bash
yarn jest
```
