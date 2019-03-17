# Fadin

[![npm version](https://badge.fury.io/js/fadin.svg)](https://badge.fury.io/js/fadin)
[![Build Status](https://travis-ci.org/dev-warner/fadin.svg?branch=master)](https://travis-ci.org/dev-warner/fadin)
[![Coverage Status](https://coveralls.io/repos/github/dev-warner/fadin/badge.svg?branch=master)](https://coveralls.io/github/dev-warner/fadin?branch=master)


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

document.addEventListener("DOMContentLoaded", () => {
    fadin('.my-class', { delay: 200 })
});

```
```html
<div class="my-class"></div>
<div class="my-class" data-delay="0.4s"></div>
<div class="my-class"></div>
```

License
----

This project is licensed under the MIT License - see the LICENSE.md file for details

**Free Software, Hell Yeah!**

