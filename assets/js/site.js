/* ==========================================================================
   AISA Parent Training Hub — site behaviour
   Progressive enhancement only: with JavaScript off the page still renders,
   every collection stays visible and every anchor link still works.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                   */
  /* ------------------------------------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close after following a link on small screens.
    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Toast                                                               */
  /* ------------------------------------------------------------------ */
  var toastEl = document.getElementById('toast');
  var toastTimer;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 2600);
  }

  /* ------------------------------------------------------------------ */
  /* Copy a deep link to a single collection                             */
  /* ------------------------------------------------------------------ */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for pages served over http:// or opened from disk.
    return new Promise(function (resolve, reject) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand('copy') ? resolve() : reject();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(field);
      }
    });
  }

  document.querySelectorAll('.copy-link').forEach(function (button) {
    button.addEventListener('click', function () {
      var url = window.location.origin + window.location.pathname + '#' + button.dataset.anchor;
      copyText(url).then(
        function () { toast('Link copied — ready to share'); },
        function () { window.prompt('Copy this link:', url); }
      );
    });
  });

  /* ------------------------------------------------------------------ */
  /* Collection badges — driven by data-count so cards stay in sync      */
  /* ------------------------------------------------------------------ */
  var collections = Array.prototype.slice.call(document.querySelectorAll('.collection'));

  collections.forEach(function (card) {
    var count = parseInt(card.dataset.count, 10) || 0;
    var badge = card.querySelector('.badge');
    var counter = card.querySelector('.collection__count');

    if (counter) {
      counter.textContent = count === 1 ? '1 resource' : count + ' resources';
    }
    if (badge && count > 0) {
      badge.textContent = 'Available';
      badge.classList.remove('badge--soon');
      badge.classList.add('badge--live');
    }
  });

  /* ------------------------------------------------------------------ */
  /* Search + category filtering                                         */
  /* ------------------------------------------------------------------ */
  var searchInput = document.getElementById('library-search');
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var resultCount = document.getElementById('result-count');
  var emptyState = document.getElementById('empty-state');
  var activeFilter = 'all';

  function haystack(card) {
    return (
      card.querySelector('h3').textContent + ' ' +
      card.querySelector('.collection__desc').textContent + ' ' +
      (card.dataset.keywords || '')
    ).toLowerCase();
  }

  function applyFilters() {
    var query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    var visible = 0;

    collections.forEach(function (card) {
      var matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      var matchesQuery = query === '' || haystack(card).indexOf(query) !== -1;
      var show = matchesCategory && matchesQuery;

      card.hidden = !show;
      if (show) visible += 1;
    });

    if (resultCount) {
      if (query === '' && activeFilter === 'all') {
        resultCount.textContent = 'Showing all ' + collections.length + ' collections.';
      } else {
        resultCount.textContent =
          'Showing ' + visible + ' of ' + collections.length + ' collections.';
      }
    }
    if (emptyState) {
      emptyState.classList.toggle('is-visible', visible === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });
      applyFilters();
    });
  });

  applyFilters();

  /* ------------------------------------------------------------------ */
  /* Arriving on a deep link: clear filters so the target is visible     */
  /* ------------------------------------------------------------------ */
  function revealTarget() {
    var id = window.location.hash.slice(1);
    if (!id) return;

    var target = document.getElementById(id);
    if (!target || !target.classList.contains('collection')) return;

    if (target.hidden) {
      if (searchInput) searchInput.value = '';
      activeFilter = 'all';
      filterButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.filter === 'all'));
      });
      applyFilters();
    }
    target.scrollIntoView({ block: 'center' });
  }

  window.addEventListener('hashchange', revealTarget);
  revealTarget();
})();
