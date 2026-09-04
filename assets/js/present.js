/* ==========================================================================
   AISA Parent Hub — present mode
   Turns a resource page into a slide deck without duplicating the content:
   each <section class="slide"> is a section of the document when reading and
   a full-screen slide when presenting. One source of truth, two modes.

   Progressive enhancement: with JavaScript off the page is simply the
   document, and the Present button is hidden.
   ========================================================================== */
(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  var body = document.body;
  var startBtn = document.getElementById('present-start');
  var bar = document.getElementById('present-bar');
  var progress = document.getElementById('present-progress');
  var counter = document.getElementById('present-count');
  var prevBtn = document.getElementById('present-prev');
  var nextBtn = document.getElementById('present-next');
  var notesBtn = document.getElementById('present-notes');
  var exitBtn = document.getElementById('present-exit');

  var index = 0;
  var presenting = false;

  /* The Present button is useless without this script, so it ships hidden
     in the HTML and is revealed here. */
  if (startBtn) startBtn.hidden = false;

  function render() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === index);
      /* Keep off-screen slides out of the accessibility tree while
         presenting, so a screen reader follows the presenter. */
      if (presenting) {
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      } else {
        slide.removeAttribute('aria-hidden');
      }
    });

    if (counter) counter.textContent = (index + 1) + ' / ' + slides.length;
    if (progress) progress.style.width = ((index + 1) / slides.length * 100) + '%';
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;

    if (presenting) {
      var active = slides[index];
      active.scrollTop = 0;
      active.focus({ preventScroll: true });
    }
  }

  function go(to) {
    index = Math.max(0, Math.min(slides.length - 1, to));
    render();
  }

  function start(from) {
    presenting = true;
    body.classList.add('is-presenting');
    slides.forEach(function (s) { s.setAttribute('tabindex', '-1'); });
    index = typeof from === 'number' ? from : 0;
    render();
    if (bar) bar.hidden = false;
    history.replaceState(null, '', '#present');
  }

  function stop() {
    presenting = false;
    body.classList.remove('is-presenting');
    slides.forEach(function (s) {
      s.removeAttribute('aria-hidden');
      s.removeAttribute('tabindex');
      s.classList.remove('is-active');
    });
    if (bar) bar.hidden = true;
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
    history.replaceState(null, '', window.location.pathname);
    if (startBtn) startBtn.focus();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
  }

  /* ------------------------------------------------------------------ */
  /* Controls                                                            */
  /* ------------------------------------------------------------------ */
  if (startBtn) startBtn.addEventListener('click', function () { start(0); });
  if (exitBtn) exitBtn.addEventListener('click', stop);
  if (prevBtn) prevBtn.addEventListener('click', function () { go(index - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(index + 1); });
  if (notesBtn) {
    notesBtn.addEventListener('click', function () {
      var hidden = body.classList.toggle('hide-notes');
      notesBtn.setAttribute('aria-pressed', String(!hidden));
      notesBtn.setAttribute('aria-label', hidden ? 'Show speaker notes' : 'Hide speaker notes');
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!presenting) return;
    /* Never hijack typing in a field. */
    var el = document.activeElement;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        event.preventDefault(); go(index + 1); break;
      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault(); go(index - 1); break;
      case 'Home':
        event.preventDefault(); go(0); break;
      case 'End':
        event.preventDefault(); go(slides.length - 1); break;
      case 'Escape':
        event.preventDefault(); stop(); break;
      case 'f':
      case 'F':
        event.preventDefault(); toggleFullscreen(); break;
      default:
        break;
    }
  });

  /* Swipe, for presenting from a tablet. */
  var touchX = null;
  document.addEventListener('touchstart', function (e) {
    if (presenting && e.changedTouches.length === 1) touchX = e.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (!presenting || touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) go(dx < 0 ? index + 1 : index - 1);
    touchX = null;
  }, { passive: true });

  /* Someone can open the page straight into the deck with #present — either
     as a fresh load, or by following a #present link from within the page
     (which is a same-document navigation and would not re-run this script). */
  function syncFromHash() {
    if (window.location.hash === '#present') {
      if (!presenting) start(0);
    } else if (presenting) {
      stop();
    }
  }

  window.addEventListener('hashchange', syncFromHash);
  syncFromHash();
})();
