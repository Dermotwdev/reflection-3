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

(function( $, window, document, undefined ){

    "use strict";

    $.shyheader = function(el, options){

        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data('shyheader',base);

        var IS_SCROLLING = false;
        var SCROLL = 0;
        var OLD_OFFSET = 0;
        var CURRENT_OFFSET = 0;
        var DELTA = 5;
        var HEADER_HEIGHT = 0;
        var BODY = "";
        var page = document.getElementById('page-content');

        base.initialize = function(){
            base.options = $.extend({},$.shyheader.defaultOptions, options);

            HEADER_HEIGHT = base.$el.outerHeight(true);
            if( base.options.container !== "undefined" ){
               // BODY = $('.'+base.options.container);
                //BODY.css("padding-top", HEADER_HEIGHT+"px");
                base.options.offsetContentFlag = true;
            }

            page.addEventListener("scroll", base.triggerScroll, false);

        };

        base.triggerScroll = function(){
            IS_SCROLLING = true;
            SCROLL = page.scrollTop //|| page.pageYOffset;
            base.checkScrollPosition();
        };

        base.checkScrollPosition = function(){
            // if container exists to stop header disappearing 
            if( base.options.offsetContentFlag ){
                // Remove overlaying header when reaching the top of the page
                if (page.scrollTop === 0 && document.getElementsByClassName('sticky-header').length !== 0) {
                    document.getElementById('page-content').removeChild(document.querySelector('header:last-child'));
                    }
                    // If scroll position is beneath the header, call function
              if( SCROLL >= HEADER_HEIGHT ){
                base.watch();
              }
            }else{
                base.watch();
            }
        };

        base.watch = function(){
            if( IS_SCROLLING ) {
                base.getDirection();
                IS_SCROLLING = false;
            }
        };

        base.getDirection = function() {

            CURRENT_OFFSET = SCROLL;

            if( Math.abs(OLD_OFFSET - CURRENT_OFFSET) <= DELTA ){
                console.log('returned');
                return;
            }
            // scrolling down
            if( CURRENT_OFFSET > OLD_OFFSET ){
                //console.log('scroll down');
                //base.$el.addClass(base.options.classname);
                if (document.getElementsByClassName('sticky-header').length !== 0) {
                    document.getElementById('page-content').removeChild(document.querySelector('header:last-child'));
                }
                // if (page.scrollTop > 169) {
                //     document.getElementsByClassName('shy-header')[0].style.position = 'fixed';
                // }
            }else{
                // scrolling up
                if( CURRENT_OFFSET //+ $(window).height() < $(document).height() 
                < OLD_OFFSET) {
                    //console.log('scroll up');
                   // base.$el.removeClass(base.options.classname);
                   if (document.getElementsByClassName('sticky-header').length === 0) {
                    let stickyHeader = document.createElement('header');
                    stickyHeader.innerHTML = headerHTML;
                    stickyHeader.classList.add('sticky-header');
                    document.getElementById('page-content').appendChild(stickyHeader);
                    console.log(`${page.scrollTop}`);
                    console.log(`${CURRENT_OFFSET} is < ${OLD_OFFSET}`)
                   }
                }
            }

            OLD_OFFSET = CURRENT_OFFSET;
        };



        base.initialize();

    };


    $.shyheader.defaultOptions = {
        classname : "is-watching",
        container : 'shy-container',
        offsetContentFlag : false
    };

    $.fn.shyheader = function(options){

        return this.each(function(){
            var shyheader = new $.shyheader(this,options);
        });
    };

   var headerHTML = `
    <div class="header-top-container">
        <div class="header-row">
            <a href="index.html">
                <div class="logo"><img src="img/header-img/f-logo.png" alt="Netmatters main logo" class="logo">
                </div>
            </a>
            <a id="header-phone" class="hide-med hide-lg show-sm" href="tel:01603704020"><svg class="header-phone hide-med" height="30px" viewBox="0 0 1792 1792" width="30px"><path d="M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-52.5-3.5t-57.5-12.5-47.5-14.5-55.5-20.5-49-18q-98-35-175-83-128-79-264.5-215.5t-215.5-264.5q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47.5-12.5-57.5-3.5-52.5q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z"/>
            </svg></a>
            <div class="hide-sm hide-lg hide-xl search-inline search-2">
                <form class="inline-search-bar">
                    <input class="search-inline" placeholder="Search&hellip;">
                <a href="#" class="btn search-btn hide-sm hide-med hide-xl"><svg class="bi bi-search" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg></a>
                </form>
            </div>
            <div class="hidden-header-content-lg hide-sm hide-med">
                    <a href="#" class="btn support btn-header header-btn">
                        <div>
                            <svg height="24" viewBox="0 0 48 48" width="23"><path d="M0 0h48v48h-48z" fill="none"/><path d="M26 2.14v15.86h14c0-8.16-6.11-14.88-14-15.86zm-18 27.86c0 8.84 7.16 16 16 16s16-7.16 16-16v-8h-32v8zm14-27.86c-7.89.98-14 7.7-14 15.86h14v-15.86z"/></svg>
                        </div>
                        <div class="header-btn-text">Support</div>    
                    </a>
                    <a href="#" id="hmbrgr" class="btn contact header-btn">
                        <div><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 32 32" height="24" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="23"><path d="M31.543,0.16C31.377,0.053,31.188,0,31,0c-0.193,0-0.387,0.055-0.555,0.168l-30,20  c-0.309,0.205-0.479,0.566-0.439,0.936c0.038,0.369,0.278,0.688,0.623,0.824l7.824,3.131l3.679,6.438  c0.176,0.309,0.503,0.5,0.857,0.504c0.004,0,0.007,0,0.011,0c0.351,0,0.677-0.186,0.857-0.486l2.077-3.463l9.695,3.877  C25.748,31.977,25.873,32,26,32c0.17,0,0.338-0.043,0.49-0.129c0.264-0.148,0.445-0.408,0.496-0.707l5-30  C32.051,0.771,31.877,0.377,31.543,0.16z M3.136,20.777L26.311,5.326L9.461,23.363c-0.089-0.053-0.168-0.123-0.266-0.162  L3.136,20.777z M10.189,24.066c-0.002-0.004-0.005-0.006-0.007-0.01L29.125,3.781L12.976,28.943L10.189,24.066z M25.217,29.609  l-8.541-3.416c-0.203-0.08-0.414-0.107-0.623-0.119L29.205,5.686L25.217,29.609z" id="paperplane"/>
                        </svg></div>
                        <div class="header-btn-text">Contact</div>
                    </a>
                <div class="search-3 hide-xl">
                    <button class="btn search-btn-3 hide-sm hide-med hide-xl"><svg class="bi bi-search" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </button>
                </div>
                <div class="search-container search-4 hide-lg">
                    <form class="inline-search-bar">
                        <input class="search-inline" placeholder="Search&hellip;">
                    <button class="btn search-btn hide-sm hide-med hide-xl"><svg class="bi bi-search" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg></button>
                    </form>
                </div>
            </div>
                <span class="ham nav-toggle">
                <!-- hamburger sidebar menu -->
                <div class="nav-toggle-bar"></div>
                <h5>Menu</h5>
                </span>
        </div>
    <form class="bottom-search-bar hide-med hide-lg hide-xl search-1">
        <input class="search" placeholder="Search&hellip;">
        <button class="mag-button"><svg class="bi bi-search" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg></button>
    </form>
    <nav>
        <div class="nav-container">
            <div class="nav-bar-grid hide-sm">
                <ul class="nav-bar-ul">
                <li class="design design-nav main-nav main-nav-1">
                    <a class="design-nav main-nav" href="#">
                        <svg class="bi bi-code-slash" viewBox="0 0 16 16" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/>
                        </svg>
                        <h5>Web</h5><h4>Design</h4>
                    </a>
                    <div class="design-sub hide-nav hide-nav-1">
                        <div class="sub-nav-content">
                            <ul>
                                <li><a href="#">Stylish Websites</a></li>
                                <li><a href="#">Ecommerce Stores</a></li>
                                <li><a href="#">Branding</a></li>
                                <li><a href="#">Mobile Apps</a></li>
                                <li><a href="#">Web Hosting</a></li>
                                <li><a href="#">Pay Monthly Websites</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="it main-nav main-nav-2">
                    <a class="it-nav main-nav" href="#">
                        <svg class="bi bi-tv" viewBox="0 0 16 16" fill="currentColor">
                            <path fill-rule="evenodd" d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/>
                        </svg>
                        <h5>IT</h5><h4>Support</h4>
                    </a>
                    <div class="it-sub hide-nav hide-nav-2">
                        <div class="sub-nav-content">
                            <ul>
                                <li><a href="#">Managed IT Support</a></li>
                                <li><a href="#">Business IT Support</a></li>
                                <li><a href="#">Office 365</a></li>
                                <li><a href="#">Consultancy</a></li>
                                <li><a href="#">Cloud Provider</a></li>
                                <li><a href="#">Data Backup</a></li>
                            </ul>
                        </div>
                    </div>
                </li> 
                <li class="telecoms main-nav main-nav-3">
                    <a class="telecoms-nav main-nav" href="#">
                        <svg  class="bi" viewBox="0 0 1792 1792"><path d="M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-52.5-3.5t-57.5-12.5-47.5-14.5-55.5-20.5-49-18q-98-35-175-83-128-79-264.5-215.5t-215.5-264.5q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47.5-12.5-57.5-3.5-52.5q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z"/></svg>
                        <h5>Telecoms</h5><h4>Services</h4>   
                    </a>
                    <div class="telecoms-sub hide-nav hide-nav-3">
                        <div class="sub-nav-content">
                            <ul>
                                <li><a href="#">Gigabit Voucher</a></li>
                                <li><a href="#">Hosted VOIP</a></li>
                                <li><a href="#">Business VOIP</a></li>
                                <li><a href="#">Business Broadband</a></li>
                                <li><a href="#">Leased Line</a></li>
                                <li><a href="#">3CX Systems</a></li>
                            </ul>
                        </div>
                    </div>
                </li>   
                <li class="software main-nav main-nav-4">
                    <a class="software-nav main-nav" href="#">
                        <svg class="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                        </svg>
                        <h5>Bespoke</h5><h4>Software</h4>
                    </a>
                    <div class="software-sub hide-nav hide-nav-4">
                        <div class="sub-nav-content">
                            <ul>
                                <li><a href="#">Workflow solutions</a></li>
                                <li><a href="#">Automation</a></li>
                                <li><a href="#">System Integration</a></li>
                                <li><a href="#">Database Management</a></li>
                                <li><a href="#">Sharepoint</a></li>
                                <li><a href="#">ERP</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="marketing main-nav main-nav-5">
                    <a class="marketing-nav main-nav" href="#">
                        <svg class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                            <rect width="4" height="5" x="1" y="10" rx="1"/>
                            <rect width="4" height="9" x="6" y="6" rx="1"/>
                            <rect width="4" height="14" x="11" y="1" rx="1"/>
                        </svg>
                        <h5>Digital</h5><h4>Marketing</h4>
                    </a>
                    <div class="marketing-sub hide-nav hide-nav-5">
                        <div class="sub-nav-content">
                        <ul>
                            <li><a href="#">SEO</a></li>
                            <li><a href="#">PPC</a></li>
                            <li><a href="#">CRO</a></li>
                            <li><a href="#">Email</a></li>
                            <li><a href="#">Social</a></li>
                            <li><a href="#">Content</a></li>
                        </ul>
                        </div>
                    </div>
                </li>
                <li class="security main-nav main-nav-6">
                    <a href="#" class="security-nav main-nav">
                        <svg class="bi bi-shield-shaded" viewBox="0 0 16 16" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z"/>
                            <path d="M8 2.25c.909 0 3.188.685 4.254 1.022a.94.94 0 0 1 .656.773c.814 6.424-4.13 9.452-4.91 9.452V2.25z"/>
                        </svg>
                        <h5>Cyber</h5><h4>Security</h4>         
                    </a>
                    <div class="security-sub hide-nav hide-nav-6">
                        <div class="sub-nav-content">
                            <ul>
                                <li><a href="#">Assessment</a></li>
                                <li><a href="#">Management</a></li>
                                <li><a href="#">Penetration Testing</a></li>
                                <li><a href="#">Cyber Essentials</a></li>
                                <li><a href="#">PCI/DSS</a></li>
                                <li><a href="#">Hacker Prevention</a></li>
                            </ul>
                        </div>
                    </div>
                </li>      
                </ul>
            </div>
        </div>
    </nav>`

}( jQuery, window, document ));