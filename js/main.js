/* Minimal foundation JS (kept language-agnostic) */
(() => {
  // Smooth scroll for on-page anchors (optional; safe to keep)
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const el = document.querySelector(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector(".welcome__carousel.splide");
    if (!el) return;

    new Splide(el, {
      type: "loop",
      perPage: 3,
      perMove: 1,
      gap: "0px",
      autoplay: true,
      interval: 3500,
      speed: 700,
      arrows: false,
      pagination: false,
      drag: true,

      // mobile-first: keep 3 unless screen is too narrow
      breakpoints: {
        420: { perPage: 2 },
        320: { perPage: 1 },
      },
    }).mount();
  });

  const isTelegram = /Telegram/i.test(navigator.userAgent);

  if (isTelegram) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[target="_blank"][href]');
      if (!a) return;

      // ignore hash links (your smooth-scroll handler owns those)
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();
      // open in same webview instead of Telegram’s “new tab”
      window.location.assign(a.href);
    });
  }
})();
