// (function() {

// 	let hamburger = {
// 		nav: document.querySelector('#nav'),
// 		navToggle: document.querySelector('.nav-toggle'),
// 		body: document.querySelector('body'),
// 		bodyA: document.querySelector('body:after'),
// 		contact: document.querySelector('.contact'),

// 		initialize() {
// 			this.navToggle.addEventListener('click', () => { this.toggle(); });
// 		},

// 		toggle() {
// 			this.navToggle.classList.toggle('expanded');
// 			this.nav.classList.toggle('expanded');
// 			this.body.classList.toggle('expanded');
// 			this.body.classList.toggle('noScroll');
// 			this.body.classList.toggle('nav-toggle');
// 			// this.bodyA.classList.toggle('expanded');
// 		},
// 	};

// 	hamburger.initialize();

// }());

"use strict";

(function () {
  var hamburger = {
    nav: document.querySelector('#nav'),
    navToggle: document.querySelector('.nav-toggle'),
    body: document.querySelector('body'),
    bodyA: document.querySelector('body:after'),
    contact: document.querySelector('.contact'),
    initialize: function initialize() {
      var _this = this;

      this.navToggle.addEventListener('click', function () {
        _this.toggle();
      });
    },
    toggle: function toggle() {
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
      this.body.classList.toggle('expanded');
      this.body.classList.toggle('noScroll');
      this.body.classList.toggle('nav-toggle');
    }
  };
  hamburger.initialize();
})();