"use strict";

//Before resources are unloaded make sure user is on top of the page
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// Website Loader
var mainContent;

if (window.innerWidth > 1024) {
  mainContent = document.querySelector('header');
} else {
  mainContent = document.querySelector('main');
}

//Add class depending on which screen size
mainContent.classList.add('main-content--load');

function onLoad() {
  document.body.classList.add('loader--init');
  mainContent.addEventListener('transitionend', function () {
    var loader = document.querySelector('.loader'),
      menuButton = document.getElementById('menu__button');

    loader.style.display = "none";
    mainContent.classList.remove('main-content--load');
    menuButton.classList.add('menu__mobile--show');
  });
}

//When page has fully loaded all resources/files
window.onload = onLoad;

// Elements for projectClick and reset button
var projectCard = Array.prototype.slice.call(document.querySelectorAll('div[data-ptarget]')),
  resetButton = Array.prototype.slice.call(document.querySelectorAll('.main-btn'));

//Project click
var projectCardClick = function (e) {
  //If active element exist upon click if not null
  var prevElement = document.querySelector('.featured-proj__overflow--expand') || null;

  //If the current target has a class of active remove class
  if (this.classList.contains('featured-proj__overflow--expand')) {
    this.classList.remove('featured-proj__overflow--expand');
  } else {
    //If the current element doesn't have the class of featured-proj__overflow--expand add class
    this.classList.add('featured-proj__overflow--expand');
    if (prevElement !== null) {
      prevElement.classList.remove('featured-proj__overflow--expand');
    }
  }
}

var projectCardClickReset = function (e) {
  var inc = 0,
    parentPrevSibling = this.parentElement.parentElement.previousElementSibling,
    that = this;
  //Prevent from opening link
  e.preventDefault();
  //Binding the parent sibling element in order to use this
  if (parentPrevSibling.hasAttribute('data-ptarget')) {
    parentPrevSibling.classList.remove('featured-proj__overflow--expand');
  }
  var parentCardTransitionOnEnd = function () {
    inc++;
    if (inc >= 6) {
      inc = 0;
      window.open(that.getAttribute('href'), '_blank');
      parentPrevSibling.removeEventListener('transitionend', parentCardTransitionOnEnd);
    }
  }

  // When animation is over open page
  parentPrevSibling.addEventListener('transitionend', parentCardTransitionOnEnd);
}

// Add event listener
projectCard.forEach(function (el, index) {
  el.addEventListener('click', projectCardClick, false);
  resetButton[index].addEventListener('click', projectCardClickReset, false);
});
//End of Project Card

// Hamburger Menu 
var menuButton = document.getElementById('menu__button'),
  menuMain = document.getElementById('menu__main'),
  menuLinks = Array.prototype.slice.call(document.querySelectorAll('.menu__items')),
  body = document.body,
  menuButtonClick, menuLinksClicked;

//Fire when button is clicked
menuButtonClick = function (e) {
  //Prevent the default behavior of the link
  e.preventDefault();

  //Display menu when clicked
  if (menuMain.classList.contains('menu--init') || this.classList.contains('menu__mobile--init')) {
    body.classList.remove('menu--init');
    menuMain.classList.remove('menu--init');
    this.classList.remove('menu__mobile--init');
  } else {
    body.classList.add('menu--init');
    menuMain.classList.add('menu--init');
    this.classList.add('menu__mobile--init');
  }
}

//When menuLinks are clicked remove the init class
menuLinksClicked = function () {
    if (menuMain.classList.contains('menu--init') || menuButton.classList.contains('menu__mobile--init')) {
      menuMain.classList.remove('menu--init');
      menuButton.classList.remove('menu__mobile--init');
    } else {
      menuMain.classList.add('menu--init');
      menuButton.classList.add('menu__mobile--init');
    }
  }
  //End of Hamburger Menu imrpove structure?

//Wrap nav in spans to animate
function wrapMenuLinks(el, i) {
  var thisChild = el.children[0],
    thisChildText = thisChild.innerText,
    span;

  //Add event listeners for hover effects
  el.addEventListener('mouseover', hoverMenu);
  el.addEventListener('mouseout', hoverOffMenu);

  //Iterate each items text and append span then append the text
  for (var i = 0; i < thisChildText.length; i++) {
    span = document.createElement('span');
    span.classList.add('menu__items--show');
    thisChild.appendChild(span);
    span.append(thisChildText[i]);
  }

  //Remove the original text node
  thisChild.childNodes[0].remove();
}
// End of wrap

// Menu hover - IMPROVE?
var menuItems = Array.prototype.slice.call(document.querySelectorAll('.menu__items'));

function hoverMenu(e) {
  if (this.classList.contains('menu__items-1')) {
    this.style.transform = "scale(1.2) translateX(2.1vw)";
    this.nextElementSibling.style.transform = "scale(1) translateX(5.5vw)";
    this.nextElementSibling.nextElementSibling.style.transform = "scale(1) translateX(5.5vw)";
  } else if (this.classList.contains('menu__items-2')) {
    this.style.transform = "scale(1.2) translateX(0)";
    this.previousElementSibling.style.transform = "scale(1) translateX(-3vw)";
    this.nextElementSibling.style.transform = "scale(1) translateX(3vw)";
  } else if (this.classList.contains('menu__items-3')) {
    this.style.transform = "scale(1.2) translateX(-2.1vw)";
    this.previousElementSibling.style.transform = "scale(1) translateX(-5.5vw)";
    this.previousElementSibling.previousElementSibling.style.transform = "scale(1) translateX(-5.5vw)";
  }

}
// When you mouseout / hover off
function hoverOffMenu() {
  menuItems.forEach(function (el) {
    el.style.transform = "scale(1) translateX(0)";
  });
}
// End of Menu hover

/*
  When user scrolls fix elements according to their position in the viewport
  windowHeight variable is inherited from previous function
*/
var layout = Array.prototype.slice.call(document.getElementsByClassName('layout')),
  windowHeight = window.innerHeight;

//Set position fixed when element is in view
var fixedSectionOnScroll = throttle(function () {
  layout.forEach(function (el, i) {
    var top = el.getBoundingClientRect().top,
      bottom = el.getBoundingClientRect().bottom,
      title = el.children[0];

    //Above El
    if (top >= 0) {
      if (title.classList.contains('layout__inner--fixed')) {
        title.classList.remove('layout__inner--fixed');
      }
    }
    //If you're on the element
    else if ((top <= 0 && bottom >= windowHeight)) {
      if (!title.classList.contains('layout__inner--fixed')) {
        title.classList.add('layout__inner--fixed');
      }
      if (title.classList.contains('layout__inner--static')) {
        title.classList.remove('layout__inner--static');
      }
    }
    // Below el
    else {
      if (!title.classList.contains('layout__inner--static')) {
        title.classList.add('layout__inner--static');
      }
      if (title.classList.contains('layout__inner--fixed')) {
        title.classList.remove('layout__inner--fixed');
      }
    }
  });
}, 0);
// End of scroll

//Anchor Tags have smooth scroll 
var anchorTags = Array.prototype.slice.call(document.querySelectorAll(('a[href*="#"]:not([href="#"])')));

anchorTags.forEach(function (el) {
  el.addEventListener('click', function () {
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// End of anchor tag smooth scroll

// Copy Email to clipboard
var copyEl = document.getElementById('copy');
copyEl.addEventListener('click', function (e) {
  e.preventDefault();
  var tmpEl = document.createElement('textarea'),
    body = document.body;

  // Styles
  tmpEl.style.position = "absolute";
  tmpEl.style.left = "-1000%";

  // Append text to element
  tmpEl.append("andrewsphotography30@yahoo.com");

  // Append tmp element to the body
  body.appendChild(tmpEl);

  // Select the text within the element
  tmpEl.select();

  // If broswer supports the copy method
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    tmpEl.blur();
  }

  // Delete Textarea
  tmpEl.remove();

});
// End of Copy email to clipboard

// JS Events that have to run for mobile/desktop
if (window.innerWidth > 1024) {
  // Add scroll to window
  window.addEventListener('scroll', fixedSectionOnScroll);
  menuLinks.forEach(wrapMenuLinks);
} else {
  //Add click eventlistern to elements
  menuButton.addEventListener('click', menuButtonClick, false);
  menuLinks.forEach(function (el) {
    el.addEventListener('click', menuLinksClicked, false);
  });
}


// External Scripts
/*
  Throttle function written by Remy Sharp
  https://remysharp.com/
*/
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 15);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


/* 
Smooth Scroll by Dustan Kasten
http://iamdustan.com/smoothscroll/
*/
! function (a, b, c) {
  "use strict";

  function d() {
    function d(a, b) {
      this.scrollLeft = a, this.scrollTop = b
    }

    function e(a) {
      return .5 * (1 - Math.cos(Math.PI * a))
    }

    function f(a) {
      if ("object" != typeof a || null === a || a.behavior === c || "auto" === a.behavior || "instant" === a.behavior) return !0;
      if ("object" == typeof a && "smooth" === a.behavior) return !1;
      throw new TypeError("behavior not valid")
    }

    function g(c) {
      var d, e, f;
      do c = c.parentNode, d = c === b.body, e = c.clientHeight < c.scrollHeight || c.clientWidth < c.scrollWidth, f = "visible" === a.getComputedStyle(c, null).overflow; while (!d && (!e || f));
      return d = e = f = null, c
    }

    function h(b) {
      b.frame = a.requestAnimationFrame(h.bind(a, b));
      var c, d, f, g = m(),
        i = (g - b.startTime) / k;
      if (i = i > 1 ? 1 : i, c = e(i), d = b.startX + (b.x - b.startX) * c, f = b.startY + (b.y - b.startY) * c, b.method.call(b.scrollable, d, f), d === b.x && f === b.y) return void a.cancelAnimationFrame(b.frame)
    }

    function i(c, e, f) {
      var g, i, j, k, n, o = m();
      c === b.body ? (g = a, i = a.scrollX || a.pageXOffset, j = a.scrollY || a.pageYOffset, k = l.scroll) : (g = c, i = c.scrollLeft, j = c.scrollTop, k = d), n && a.cancelAnimationFrame(n), h({
        scrollable: g,
        method: k,
        startTime: o,
        startX: i,
        startY: j,
        x: e,
        y: f,
        frame: n
      })
    }
    if (!("scrollBehavior" in b.documentElement.style)) {
      var j = a.HTMLElement || a.Element,
        k = 468,
        l = {
          scroll: a.scroll || a.scrollTo,
          scrollBy: a.scrollBy,
          scrollIntoView: j.prototype.scrollIntoView
        },
        m = a.performance && a.performance.now ? a.performance.now.bind(a.performance) : Date.now;
      a.scroll = a.scrollTo = function () {
        return f(arguments[0]) ? void l.scroll.call(a, arguments[0].left || arguments[0], arguments[0].top || arguments[1]) : void i.call(a, b.body, ~~arguments[0].left, ~~arguments[0].top)
      }, a.scrollBy = function () {
        return f(arguments[0]) ? void l.scrollBy.call(a, arguments[0].left || arguments[0], arguments[0].top || arguments[1]) : void i.call(a, b.body, ~~arguments[0].left + (a.scrollX || a.pageXOffset), ~~arguments[0].top + (a.scrollY || a.pageYOffset))
      }, j.prototype.scrollIntoView = function () {
        if (f(arguments[0])) return void l.scrollIntoView.call(this, arguments[0] || !0);
        var c = g(this),
          d = c.getBoundingClientRect(),
          e = this.getBoundingClientRect();
        c !== b.body ? (i.call(this, c, c.scrollLeft + e.left - d.left, c.scrollTop + e.top - d.top), a.scrollBy({
          left: d.left,
          top: d.top,
          behavior: "smooth"
        })) : a.scrollBy({
          left: e.left,
          top: e.top,
          behavior: "smooth"
        })
      }
    }
  }
  "object" == typeof exports ? module.exports = {
    polyfill: d
  } : d()
}(window, document);