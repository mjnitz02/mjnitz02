/*
  Panel switcher for mattnitzken.com
  Dependency-free rewrite of the original Pixelarity "Indivisible" behavior
  (previously jQuery + skel.js + util.js). Shows one panel at a time and
  flips between them; degrades to a plain scrolling stack when JS is off
  (see noscript.css).
*/
(function () {
  "use strict";

  var body = document.body;
  var footer = document.getElementById("footer");
  var panels = Array.prototype.slice.call(
    document.querySelectorAll("#wrapper .panel"),
  );
  var locked = true;

  // Hide every panel except the first.
  panels.forEach(function (panel, i) {
    if (i > 0) {
      panel.classList.add("inactive");
      panel.hidden = true;
    }
  });

  // Play the intro fade, then hand off to the snappier swap transitions.
  window.addEventListener("load", function () {
    setTimeout(function () {
      body.classList.remove("is-loading-0");
      setTimeout(function () {
        body.classList.remove("is-loading-1");
      }, 1500);
    }, 100);
  });

  // Unlock interaction once the intro has settled.
  setTimeout(function () {
    locked = false;
  }, 1250);

  // Swap panels on any in-page anchor (nav buttons + "Back" links).
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var target = document.querySelector(link.getAttribute("href"));
      if (locked || !target) {
        return;
      }
      locked = true;
      link.classList.add("active");

      // Fade the current panel + footer out.
      panels.forEach(function (panel) {
        panel.classList.add("inactive");
      });
      footer.classList.add("inactive");

      setTimeout(function () {
        // Swap which panel is in the DOM flow, then reset scroll.
        panels.forEach(function (panel) {
          panel.hidden = true;
        });
        target.hidden = false;
        window.scrollTo(0, 0);

        // Next tick: fade the new panel in.
        setTimeout(function () {
          target.classList.remove("inactive");
          link.classList.remove("active");
          locked = false;
          setTimeout(function () {
            footer.classList.remove("inactive");
          }, 250);
        }, 100);
      }, 350);
    });
  });
})();
