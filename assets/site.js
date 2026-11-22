(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.rv');
  function countUp(root) {
    root.querySelectorAll('[data-to]').forEach(function (el) {
      var to = +el.dataset.to, pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = performance.now();
      function step(t) {
        var x = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - x, 3);
        el.textContent = pre + Math.round(to * e) + suf;
        if (x < 1) requestAnimationFrame(step);
      }
      el.textContent = pre + '0' + suf; requestAnimationFrame(step);
    });
  }
  function show(el) { el.classList.add('on'); if (el.dataset.count && !reduce) countUp(el); }
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
