// require syntax
const Unsplash = require('js/node_modules/unsplash-js').default;

import Unsplash, { toJson } from "js/node_modules/unsplash-js";

const unsplash = new Unsplash({ accessKey: "{CnVXt1LKlgsQ1d8Cb4T8KXu9UNqwLgCjiVZMpm7UW8s}" });

function getPhoto() { unsplash.photos.getRandomPhoto()
                      .then(toJson)
                      .then(console.log(this))
                      .then(json => {
                        // Your code
  }); }

  