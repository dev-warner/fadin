# Fadin

[![npm version](https://badge.fury.io/js/fadin.svg)](https://badge.fury.io/js/fadin)
[![Build Status](https://travis-ci.org/dev-warner/fadin.svg?branch=master)](https://travis-ci.org/dev-warner/fadin)
[![Coverage Status](https://coveralls.io/repos/github/dev-warner/fadin/badge.svg)](https://coveralls.io/github/dev-warner/fadin)
<a href="#badge">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/prettier">
<img alt="npm version" src="https://img.shields.io/npm/v/fadin.svg?style=flat-square"></a>
<a><img alt="MIT" src="http://img.shields.io/badge/license-MIT-blue.svg?style=flat"></a>

Extremely light onload fadin animation library.

# Getting Started

docs: http://fadin-docs.surge.sh/

run in your terminal

```sh
$ npm install fadin
```

and in your js file

```javascript
const fadin = require('fadin')

document.addEventListener('DOMContentLoaded', () => {
  fadin('.my-class', { delay: 200 })
})
```

```html
<div class="my-class"></div>
<div class="my-class" data-delay="0.4s"></div>
<div class="my-class"></div>
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

**Free Software, Hell Yeah!**
