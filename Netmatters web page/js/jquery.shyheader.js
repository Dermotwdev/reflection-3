// **** My edited plugin code
/*
 * BASED ON THE ORIGINAL IDEA OF Marius Craciunoiu
 * https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c#.wc32ja29i
 *
 *
 * jQuery.shyheader v0.1.0
 * https://github.com/alejandromur/shyheader
 * Copyright 2016, alejandro@mamutlove.es
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

// (function( $, window, document, undefined ){

//     "use strict";

//     $.shyheader = function(el, options){

//         var base = this;

//         base.$el = $(el);
//         base.el = el;

//         base.$el.data('shyheader',base);
//         var counter = 0;
//         var IS_SCROLLING = false;
//         var SCROLL = 0;
//         var OLD_OFFSET = 0;
//         var CURRENT_OFFSET = 0;
//         var DELTA = 3;
//         var HEADER_HEIGHT = 0;
//         var BODY = "";
//         var page = document.getElementById('page-content');

//         base.initialize = function(){
//             base.options = $.extend({},$.shyheader.defaultOptions, options);

//             HEADER_HEIGHT = base.$el.outerHeight(true);
//             if( base.options.container !== "undefined" ){
//                // BODY = $('.'+base.options.container);
//                 //BODY.css("padding-top", HEADER_HEIGHT+"px");
//                 base.options.offsetContentFlag = true;
//             }

//             page.addEventListener("scroll", base.triggerScroll, false);

//         };

//         base.triggerScroll = function(){
//             IS_SCROLLING = true;
//             SCROLL = page.scrollTop //|| page.pageYOffset;
//             base.checkScrollPosition();
//         };

//         base.checkScrollPosition = function(){
//             // if container exists to stop header disappearing 
//             //if( base.options.offsetContentFlag ){
//                 // Remove overlaying header when reaching the top of the page
//                 if (page.scrollTop === 0 && document.getElementsByClassName('sticky-header').length !== 0) {
//                     document.getElementsByClassName('sticky-header')[0].style.display = "none";
//                         console.log(`RESET Current offset: ${CURRENT_OFFSET}, old Offset: ${OLD_OFFSET}`);
//                         CURRENT_OFFSET = 0;
//                         OLD_OFFSET = 0;
//                     }
//                 // If scroll position is beneath the header, call function
//               if( SCROLL >= HEADER_HEIGHT ){
//                 base.watch();
//               }
//             //  else{
//             //     base.watch();
//             // }
//         };

//         base.watch = function(){
//             if( IS_SCROLLING ) {
//                 base.getDirection();
//                 IS_SCROLLING = false;
//             }
//         };

//         base.getDirection = function() {

//             CURRENT_OFFSET = SCROLL;

//             if( Math.abs(OLD_OFFSET - CURRENT_OFFSET) <= DELTA ){
//                 return;
//             }
//             // scrolling down
//             if( CURRENT_OFFSET > OLD_OFFSET ){
//                 base.$el.addClass(base.options.classname);
//                 if (document.getElementsByClassName('sticky-header').length !== 0) {
//                     $('.sticky-header').addClass('animate__slideOutUp');
//                 }
//             }else{
//                 // scrolling up
//                 if( CURRENT_OFFSET //+ $(window).height() < $(document).height() 
//                 < OLD_OFFSET) {
//                    // base.$el.removeClass(base.options.classname);
//                    $('.sticky-header').removeClass('animate__slideOutUp');
//                    document.getElementsByClassName('sticky-header')[0].style.display = "block";
//                 }
//             }

//             OLD_OFFSET = CURRENT_OFFSET;
//         };

//         base.initialize();

//     };


//     $.shyheader.defaultOptions = {
//         classname : "is-watching",
//         container : 'undefined',
//         offsetContentFlag : false
//     };

//     $.fn.shyheader = function(options){

//         return this.each(function(){
//             var shyheader = new $.shyheader(this,options);
//         });
//     };

// }( jQuery, window, document ));


// *** Code put through Babel

"use strict";

(function ($, window, document, undefined) {
  "use strict";

  $.shyheader = function (el, options) {
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data('shyheader', base);
    var counter = 0;
    var IS_SCROLLING = false;
    var SCROLL = 0;
    var OLD_OFFSET = 0;
    var CURRENT_OFFSET = 0;
    var DELTA = 3;
    var HEADER_HEIGHT = 0;
    var BODY = "";
    var page = document.getElementById('page-content');

    base.initialize = function () {
      base.options = $.extend({}, $.shyheader.defaultOptions, options);
      HEADER_HEIGHT = base.$el.outerHeight(true);

      if (base.options.container !== "undefined") {
        // BODY = $('.'+base.options.container);
        //BODY.css("padding-top", HEADER_HEIGHT+"px");
        base.options.offsetContentFlag = true;
      }

      page.addEventListener("scroll", base.triggerScroll, false);
    };

    base.triggerScroll = function () {
      IS_SCROLLING = true;
      SCROLL = page.scrollTop; //|| page.pageYOffset;

      base.checkScrollPosition();
    };

    base.checkScrollPosition = function () {
      // if container exists to stop header disappearing 
      //if( base.options.offsetContentFlag ){
      // Remove overlaying header when reaching the top of the page
      if (page.scrollTop === 0 && document.getElementsByClassName('sticky-header').length !== 0) {
        document.getElementsByClassName('sticky-header')[0].style.display = "none";
        console.log("RESET Current offset: ".concat(CURRENT_OFFSET, ", old Offset: ").concat(OLD_OFFSET));
        CURRENT_OFFSET = 0;
        OLD_OFFSET = 0;
      } // If scroll position is beneath the header, call function


      if (SCROLL >= HEADER_HEIGHT) {
        base.watch();
      } //  else{
      //     base.watch();
      // }

    };

    base.watch = function () {
      if (IS_SCROLLING) {
        base.getDirection();
        IS_SCROLLING = false;
      }
    };

    base.getDirection = function () {
      CURRENT_OFFSET = SCROLL;

      if (Math.abs(OLD_OFFSET - CURRENT_OFFSET) <= DELTA) {
        return;
      } // scrolling down


      if (CURRENT_OFFSET > OLD_OFFSET) {
        base.$el.addClass(base.options.classname);

        if (document.getElementsByClassName('sticky-header').length !== 0) {
          $('.sticky-header').addClass('animate__slideOutUp');
        }
      } else {
        // scrolling up
        if (CURRENT_OFFSET //+ $(window).height() < $(document).height() 
        < OLD_OFFSET) {
          // base.$el.removeClass(base.options.classname);
          $('.sticky-header').removeClass('animate__slideOutUp');
          document.getElementsByClassName('sticky-header')[0].style.display = "block";
        }
      }

      OLD_OFFSET = CURRENT_OFFSET;
    };

    base.initialize();
  };

  $.shyheader.defaultOptions = {
    classname: "is-watching",
    container: 'undefined',
    offsetContentFlag: false
  };

  $.fn.shyheader = function (options) {
    return this.each(function () {
      var shyheader = new $.shyheader(this, options);
    });
  };
})(jQuery, window, document);


// // ******* JUST IN CASE IT IS BROKEN, MY OLD CODE
// (function () {
//     let hamburger = {
//             nav: document.querySelector('#nav'),
//             navToggle: document.querySelector('.nav-toggle'),
//             blocker: document.querySelector('#blocker'),
//         contact: document.querySelector('.contact'),
//         body: document.querySelector('body'),
    
//             initialize() {
//           this.navToggle.addEventListener('click', () => { this.toggle(); });
//             },
    
//             toggle() {
//           console.log('toggled')
//           // Set page style to expanded
//           this.navToggle.classList.toggle('expanded');
//                 this.nav.classList.toggle('expanded');
//           this.body.classList.toggle('expanded');
//           this.blocker.classList.toggle('expanded');
//           // Set rest of page to not scroll
//           this.body.classList.toggle('noScroll');
//           // Allow clicking anywhere on 
//           if(this.blocker.classList.contains('expanded')) {
//             this.blocker.addEventListener('click', togglEvent);
//           } else {
//             this.removeEvent();
//           }
//         },
//         removeEvent() {
//           console.log('Event removed')
//           this.blocker.removeEventListener('click', togglEvent);
//         }
//         };
    
//       hamburger.initialize();
    
//       const togglEvent = function toggleEvent() {
//         hamburger.toggle();
//       }
//     })();