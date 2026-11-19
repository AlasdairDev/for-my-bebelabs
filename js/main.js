/* ═══════════════════════════════════════════════════════════
   two years of us — interactions
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const pad2 = (n) => String(n).padStart(2, "0");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setScrollLock = (locked) => {
    document.documentElement.classList.toggle("no-scroll", locked);
    document.body.classList.toggle("no-scroll", locked);
  };

  /* ── intro envelope ──────────────────────────────────── */
  const intro = $("#intro");
  const introEnvelope = $("#introEnvelope");
  const html = document.documentElement;
  let introOpened = false;

  if (intro) {
    if (html.classList.contains("intro-seen")) {
      intro.hidden = true;
    } else {
      setScrollLock(true);
    }

    const openIntro = (event) => {
      if (introOpened) return;
      introOpened = true;
      intro.classList.add("is-opening");

      const x = event && event.clientX ? event.clientX : window.innerWidth / 2;
      const y = event && event.clientY ? event.clientY : window.innerHeight * 0.5;
      burstAt(x, y, 16);

      try { sessionStorage.setItem("introSeen", "1"); } catch (e) {}

      window.setTimeout(() => {
        intro.classList.add("is-hidden");
        setScrollLock(false);
        window.setTimeout(() => { intro.hidden = true; }, 760);
      }, 480);
    };

    intro.addEventListener("click", openIntro);
    intro.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openIntro(event);
      }
    });
    if (introEnvelope) introEnvelope.focus({ preventScroll: true });
  }

  /* ── nav + scroll progress ───────────────────────────── */
  const nav = $("#nav");
  const progressBar = $("#progressBar");

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);
    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── nav landing positions ───────────────────────────── */
  const scrollToSection = (target) => {
    if (!target) return;
    const behavior = reduceMotion ? "auto" : "smooth";
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const viewport = window.innerHeight;
    const available = viewport - navHeight;
    const rect = target.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const height = target.offsetHeight;
    let top;

    if (height + 48 < available) {
      // Short sections sit in the middle of the space under the nav.
      top = absoluteTop - navHeight - (available - height) / 2;
    } else {
      // Tall sections land with the heading in a calm, balanced spot.
      const head = target.querySelector(".section-head") || target;
      const headTop = window.scrollY + head.getBoundingClientRect().top;
      top = headTop - navHeight - available * 0.16;
    }

    const maxScroll = document.documentElement.scrollHeight - viewport;
    top = Math.max(0, Math.min(top, maxScroll));
    window.scrollTo({ top, behavior });
  };

  $$('.nav-links a[href^="#"], .brand[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      if (href === "#top") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        history.pushState(null, "", href);
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      scrollToSection(target);
      history.pushState(null, "", href);
    });
  });

  /* ── live counter ────────────────────────────────────── */
  // 20 November 2024, 00:00 Philippine time
  const START = Date.UTC(2024, 10, 19, 16, 0, 0);
  const daysEl = $("#days");
  const hoursEl = $("#hours");
  const minsEl = $("#mins");
  const secsEl = $("#secs");

  const tick = () => {
    let diff = Math.max(0, Date.now() - START);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000);
    diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = pad2(hours);
    if (minsEl) minsEl.textContent = pad2(mins);
    if (secsEl) secsEl.textContent = pad2(secs);
  };
  tick();
  window.setInterval(tick, 1000);

  /* ── reveal on scroll ────────────────────────────────── */
  const revealItems = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach((el) => {
      if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  /* ── photo wall + lightbox ───────────────────────────── */
  const wall = $("#photoWall");
  const lightbox = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  const lbCount = $("#lbCount");
  const lbClose = $("#lbClose");
  const lbPrev = $("#lbPrev");
  const lbNext = $("#lbNext");

  const rotations = [-2.4, 1.6, -1.2, 2.3, -1.8, 1.1, -2.7, 1.9, -1.4, 2.1, -1.9, 1.3, -2.2, 1.7, -1.1, 2.5, -1.6, 1.9];
  let lightboxIndex = 0;
  let lastFocused = null;

  if (wall && typeof PHOTOS !== "undefined" && PHOTOS.length) {
    const fragment = document.createDocumentFragment();

    PHOTOS.forEach((photo, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "polaroid tape-" + (photo.tape || "butter");
      button.style.setProperty("--rot", rotations[index % rotations.length] + "deg");
      button.setAttribute("aria-label", photo.caption ? "Open photo: " + photo.caption : "Open photo " + (index + 1));
      button.setAttribute("aria-haspopup", "dialog");

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt || photo.caption;
      img.width = photo.w || 1200;
      img.height = photo.h || 1600;
      img.loading = "lazy";
      img.decoding = "async";

      button.append(img);
      if (photo.caption) {
        const cap = document.createElement("span");
        cap.className = "cap";
        cap.textContent = photo.caption;
        button.appendChild(cap);
      }
      button.addEventListener("click", () => openLightbox(index));
      fragment.appendChild(button);
    });

    wall.appendChild(fragment);
  }

  function renderLightbox() {
    const photo = PHOTOS[lightboxIndex];
    if (!photo || !lbImg) return;
    lbImg.src = photo.src;
    lbImg.alt = photo.alt || photo.caption;
    if (lbCap) {
      if (photo.caption) {
        lbCap.textContent = photo.caption;
        lbCap.hidden = false;
      } else {
        lbCap.textContent = "";
        lbCap.hidden = true;
      }
    }
    if (lbCount) lbCount.textContent = (lightboxIndex + 1) + " / " + PHOTOS.length;
  }

  function openLightbox(index) {
    if (!lightbox) return;
    lightboxIndex = (index + PHOTOS.length) % PHOTOS.length;
    renderLightbox();
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    setScrollLock(true);
    if (lbClose) lbClose.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    setScrollLock(false);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus({ preventScroll: true });
    }
  }

  function stepLightbox(direction) {
    lightboxIndex = (lightboxIndex + direction + PHOTOS.length) % PHOTOS.length;
    renderLightbox();
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", () => stepLightbox(-1));
    if (lbNext) lbNext.addEventListener("click", () => stepLightbox(1));

    let touchStartX = 0;
    lightbox.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", (event) => {
      const diff = touchStartX - event.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) stepLightbox(diff > 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") stepLightbox(1);
      if (event.key === "ArrowLeft") stepLightbox(-1);
    });
  }

  /* ── reasons deck ────────────────────────────────────── */
  const REASONS = [
    "because you make the distance feel smaller. hindi mo ginagawang madali, pero ginagawa mong worth it.",
    "because you listen to my rants, even the paulit-ulit ones. you never make me feel like I'm too much.",
    "because you maximize every hour we get together. kahit sandali lang, you make it count.",
    "because you remember the small things. yung mga sinabi ko once, nababalikan mo pa. hindi ko alam paano mo nagagawa 'yon.",
    "because you never made me feel bad for being soft. you let me feel things, then you stay.",
    "because your laugh through the phone still fixes my whole mood. isang tawa mo lang, okay na ako.",
    "because you support the things I care about, even the silly ones. lalo na yung mga laptop dreams ko.",
    "because you're my favorite teammate, in game and in real life. kahit matalo tayo, ikaw pa rin ang gusto kong kasama.",
    "because you make me feel safe enough to be myself, even the parts I don't like. and you never make me feel weird for it.",
    "because after two years, you're still the person I want to tell everything to first. good news, bad days, random thoughts. ikaw agad."
  ];

  const reasonCard = $("#reasonCard");
  const reasonText = $("#reasonText");
  const reasonNo = $("#reasonNo");
  const reasonCount = $("#reasonCount");
  const nextReason = $("#nextReason");

  let order = [];
  let position = 0;
  let lastShown = -1;

  const shuffle = (list) => {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const freshOrder = () => {
    const next = shuffle(REASONS.map((_, i) => i));
    if (next.length > 1 && next[0] === lastShown) {
      [next[0], next[1]] = [next[1], next[0]];
    }
    return next;
  };

  const renderReason = () => {
    const realIndex = order[position];
    lastShown = realIndex;
    if (reasonText) reasonText.textContent = REASONS[realIndex];
    if (reasonNo) reasonNo.textContent = "no. " + pad2(realIndex + 1);
    if (reasonCount) reasonCount.textContent = pad2(realIndex + 1);
  };

  const drawReason = () => {
    if (!reasonCard) return;
    reasonCard.classList.add("is-swapping");

    window.setTimeout(() => {
      position += 1;
      if (position >= order.length) {
        order = freshOrder();
        position = 0;
      }
      renderReason();
      reasonCard.classList.remove("is-swapping");
      reasonCard.classList.add("is-in");
      window.setTimeout(() => reasonCard.classList.remove("is-in"), 440);
    }, reduceMotion ? 0 : 190);
  };

  if (reasonCard) {
    order = freshOrder();
    renderReason();

    reasonCard.addEventListener("click", drawReason);
    reasonCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        drawReason();
      }
    });
    if (nextReason) nextReason.addEventListener("click", drawReason);
  }

  /* ── the letter ──────────────────────────────────────── */
  const envelopeBig = $("#envelopeBig");
  const letterPaper = $("#letterPaper");
  const closeLetter = $("#closeLetter");
  const envelopeTap = $(".envelope-tap");
  let letterBusy = false;

  const openLetter = () => {
    if (!envelopeBig || !letterPaper || letterBusy) return;
    letterBusy = true;
    envelopeBig.classList.add("is-opening");
    burstFrom(envelopeBig, 14);

    window.setTimeout(() => {
      envelopeBig.hidden = true;
      envelopeBig.classList.remove("is-opening");
      if (envelopeTap) envelopeTap.hidden = true;
      letterPaper.hidden = false;
      letterPaper.focus({ preventScroll: true });
      window.setTimeout(() => {
        letterPaper.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }, 80);
      letterBusy = false;
    }, reduceMotion ? 40 : 430);
  };

  const closeLetterView = () => {
    if (!envelopeBig || !letterPaper) return;
    letterPaper.hidden = true;
    envelopeBig.hidden = false;
    envelopeBig.classList.remove("is-opening");
    if (envelopeTap) envelopeTap.hidden = false;
    envelopeBig.focus({ preventScroll: true });
    envelopeBig.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  if (envelopeBig) {
    envelopeBig.addEventListener("click", openLetter);
    envelopeBig.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLetter();
      }
    });
  }
  if (closeLetter) closeLetter.addEventListener("click", closeLetterView);

  /* ── tiny secret ─────────────────────────────────────── */
  const secretForm = $("#secretForm");
  const secretInput = $("#secretInput");
  const secretMsg = $("#secretMsg");
  const secretCard = $("#secretCard");
  const secretButton = secretForm ? secretForm.querySelector("button") : null;

  if (secretInput) {
    secretInput.addEventListener("input", () => {
      const clean = secretInput.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24);
      if (secretInput.value !== clean) secretInput.value = clean;
    });
  }

  if (secretForm) {
    secretForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!secretInput || !secretMsg) return;

      const entered = secretInput.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      if (entered === "clarity1120") {
        secretMsg.textContent = "you remembered. you're still my favorite person, my pahinga, my home. i love you, shane. happy 2nd anniversary. ♡";
        secretMsg.classList.add("is-good");
        secretInput.disabled = true;
        if (secretButton) secretButton.disabled = true;
        if (secretCard) secretCard.classList.add("is-unlocked");
        if (secretForm) secretForm.style.display = "none";
        burstAt(window.innerWidth / 2, secretMsg.getBoundingClientRect().top + 20, 22);
      } else {
        secretMsg.textContent = "hmm, not that one. try again, love ♡";
        secretMsg.classList.remove("is-good");
        secretInput.classList.add("is-wrong");
        secretInput.select();
        window.setTimeout(() => secretInput.classList.remove("is-wrong"), 500);
      }
    });
  }

  /* ── heart bursts ────────────────────────────────────── */
  function burstAt(x, y, amount) {
    if (reduceMotion) return;
    const count = amount || 12;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "burst-heart";
      heart.textContent = Math.random() > 0.35 ? "♡" : "♥";
      heart.style.left = x + "px";
      heart.style.top = y + "px";
      heart.style.color = Math.random() > 0.5 ? "var(--berry)" : "var(--rose)";
      heart.style.fontSize = (10 + Math.random() * 12) + "px";

      const angle = Math.random() * Math.PI * 2;
      const distance = 35 + Math.random() * 130;
      heart.style.setProperty("--tx", Math.cos(angle) * distance + "px");
      heart.style.setProperty("--ty", Math.sin(angle) * distance - 45 + "px");
      heart.style.setProperty("--r", (Math.random() * 180 - 90) + "deg");
      heart.style.setProperty("--s", (0.5 + Math.random() * 0.9).toFixed(2));

      document.body.appendChild(heart);
      window.setTimeout(() => heart.remove(), 1100);
    }
  }

  const burstFrom = (element, amount) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, amount);
  };

  const loveBtn = $("#loveBtn");
  const heartBtn = $("#heartBtn");

  if (loveBtn) loveBtn.addEventListener("click", () => burstFrom(loveBtn, 16));
  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      burstFrom(heartBtn, 24);
      heartBtn.style.transform = "scale(1.16) rotate(-10deg)";
      window.setTimeout(() => { heartBtn.style.transform = ""; }, 260);
    });
  }

  /* ── ambient petals ──────────────────────────────────── */
  const petalLayer = $("#petals");
  if (petalLayer && !reduceMotion) {
    const count = window.innerWidth < 620 ? 8 : 14;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "%";
      petal.style.setProperty("--s", (7 + Math.random() * 9).toFixed(1) + "px");
      petal.style.setProperty("--d", (15 + Math.random() * 14).toFixed(1) + "s");
      petal.style.setProperty("--delay", (-Math.random() * 26).toFixed(1) + "s");
      petal.style.setProperty("--drift", (Math.random() * 130 - 65).toFixed(0) + "px");
      petal.style.setProperty("--o", (0.12 + Math.random() * 0.22).toFixed(2));
      petalLayer.appendChild(petal);
    }
  }

  /* ── a tiny console note ─────────────────────────────── */
  console.log("%c♡ for shane ♡", "color:#b23a55;font-size:22px;font-weight:bold;");
  console.log("%cthe little secret is waiting.", "color:#8a6f6a;font-style:italic;font-size:13px;");
})();
