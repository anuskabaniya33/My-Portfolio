(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav__toggle");
  var navLinks = document.querySelector(".nav__links");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function smoothScrollTo(hash) {
    if (!hash || hash === "#") return;
    var target = document.querySelector(hash);
    if (!target) return;
    var headerOffset = header ? header.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      smoothScrollTo(href);
      if (navToggle && navLinks) {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navLinks.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });
  }

  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var animated = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window && animated.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
