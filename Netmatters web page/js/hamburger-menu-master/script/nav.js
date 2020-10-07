// **** Code written by me ****
(function () {
let hamburger = {
	nav: document.querySelector('#nav'),
	navToggle: document.querySelector('.nav-toggle'),
	blocker: document.querySelector('#blocker'),
   contact: document.querySelector('.contact'),
   page: document.querySelector('#page-content'),

		initialize() {
		//this.navToggle.addEventListener('click', () => { this.toggle(); });
		for (i=0; i<2; i++) {
			document.querySelectorAll('.nav-toggle')[i].addEventListener('click', () => {this.toggle();})
			}
		},

		toggle() {
      console.log('toggled')
		// Set page style to expanded
		for (i=0; i<2; i++) {
			document.querySelectorAll('.nav-toggle')[i].classList.toggle('expanded');
		}
		this.nav.classList.toggle('expanded');
      this.page.classList.toggle('expanded');
      this.blocker.classList.toggle('expanded');
      // Allow clicking anywhere on 
      if(this.blocker.classList.contains('expanded')) {
        this.blocker.addEventListener('click', togglEvent);
      } else {
        this.removeEvent();
      }
    },
    removeEvent() {
      console.log('Event removed')
      this.blocker.removeEventListener('click', togglEvent);
    }
	};

  hamburger.initialize();

  const togglEvent = function toggleEvent() {
    hamburger.toggle();
  }
})();


// **** Babel Code ****



// "use strict";

// (function () {
//   var hamburger = {
//     nav: document.querySelector('#nav'),
//     navToggle: document.querySelector('.nav-toggle'),
//     blocker: document.querySelector('#blocker'),
//     contact: document.querySelector('.contact'),
//     body: document.querySelector('body'),
//     initialize: function initialize() {
//       var _this = this;

//       this.navToggle.addEventListener('click', function () {
//         _this.toggle();
//       });
//     },
//     toggle: function toggle() {
//       console.log('toggled'); // Set page style to expanded

//       this.navToggle.classList.toggle('expanded');
//       this.nav.classList.toggle('expanded');
//       this.body.classList.toggle('expanded');
//       this.blocker.classList.toggle('expanded'); // Set rest of page to not scroll

//       this.body.classList.toggle('noScroll'); // Allow clicking anywhere on 

//       if (this.blocker.classList.contains('expanded')) {
//         this.blocker.addEventListener('click', togglEvent);
//       } else {
//         this.removeEvent();
//       }
//     },
//     removeEvent: function removeEvent() {
//       console.log('Event removed');
//       this.blocker.removeEventListener('click', togglEvent);
//     }
//   };
//   hamburger.initialize();

//   var togglEvent = function toggleEvent() {
//     hamburger.toggle();
//   };
// })();