/* ═══════════════════════════════════════════════════════════
   our little garden — interactions
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroVisual = document.getElementById("heroVisual");
  const gardenGrid = document.getElementById("gardenGrid");
  const rebloom = document.getElementById("rebloom");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCount = document.getElementById("lbCount");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  const allFlowers = [];
  let lightboxIndex = 0;
  let lastFocused = null;

  const STEM_SVG = `
    <svg viewBox="0 0 120 220" aria-hidden="true" focusable="false">
      <path class="stem-line" d="M60 220 C74 170 46 120 60 0" />
      <path class="leaf" d="M60 160 C42 152 32 137 28 120 C44 126 55 139 60 160Z" />
      <path class="leaf" d="M60 112 C78 104 88 89 92 73 C76 79 65 92 60 112Z" />
    </svg>
  `;

  const makeFlower = (group, { isHero = false, flowerIndex = 0 } = {}) => {
    const flower = document.createElement("article");
    flower.className = "flower" + (isHero ? " hero-flower" : "");
    flower.style.setProperty("--sway", (-flowerIndex * 1.15).toFixed(2) + "s");

    const bloom = document.createElement("div");
    bloom.className = "bloom";

    group.forEach((item, petalIndex) => {
      const petal = document.createElement("button");
      petal.type = "button";
      petal.className = "petal";
      petal.style.setProperty("--a", (petalIndex * (360 / group.length)).toFixed(2) + "deg");
      petal.style.setProperty("--i", String(petalIndex));
      petal.setAttribute("aria-label", item.photo.alt || "Open photo");
      petal.setAttribute("aria-haspopup", "dialog");

      const img = document.createElement("img");
      img.src = item.photo.src;
      img.alt = item.photo.alt || "";
      img.width = item.photo.w || 1200;
      img.height = item.photo.h || 1600;
      img.decoding = "async";
      img.loading = isHero ? "eager" : "lazy";

      petal.appendChild(img);
      petal.addEventListener("click", () => openLightbox(item.index));
      bloom.appendChild(petal);
    });

    const center = document.createElement("span");
    center.className = "flower-center";
    center.setAttribute("aria-hidden", "true");
    center.textContent = "♡";
    bloom.appendChild(center);

    const stem = document.createElement("div");
    stem.className = "stem";
    stem.setAttribute("aria-hidden", "true");
    stem.innerHTML = STEM_SVG;

    flower.append(bloom, stem);
    return flower;
  };

  if (typeof PHOTOS !== "undefined" && PHOTOS.length && heroVisual && gardenGrid) {
    const groups = [];
    for (let g = 0; g < 7; g++) {
      groups.push(
        PHOTOS.slice(g * 7, g * 7 + 7).map((photo, i) => ({
          photo,
          index: g * 7 + i
        }))
      );
    }

    const heroGroup = groups[0];
    const gardenGroups = groups.slice(1);

    if (heroGroup.length) {
      const heroFlower = makeFlower(heroGroup, { isHero: true });
      heroVisual.appendChild(heroFlower);
      allFlowers.push(heroFlower);

      const bloomHero = () => heroFlower.classList.add("is-bloomed");
      if (reduceMotion) {
        bloomHero();
      } else {
        window.setTimeout(bloomHero, 350);
      }
    }

    const gardenFlowers = [];
    gardenGroups.forEach((group, index) => {
      if (!group.length) return;
      const flower = makeFlower(group, { flowerIndex: index + 1 });
      gardenGrid.appendChild(flower);
      gardenFlowers.push(flower);
      allFlowers.push(flower);
    });

    if (reduceMotion) {
      gardenFlowers.forEach((flower) => flower.classList.add("is-bloomed"));
    } else if ("IntersectionObserver" in window) {
      const bloomObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-bloomed");
          bloomObserver.unobserve(entry.target);
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -30px 0px" });

      gardenFlowers.forEach((flower) => bloomObserver.observe(flower));
    } else {
      gardenFlowers.forEach((flower) => flower.classList.add("is-bloomed"));
    }
  }

  /* ── bloom again ────────────────────────────────────── */
  if (rebloom) {
    rebloom.addEventListener("click", () => {
      allFlowers.forEach((flower) => flower.classList.remove("is-bloomed"));
      // force the petals and stems back to their closed state
      void document.body.offsetWidth;
      window.setTimeout(() => {
        allFlowers.forEach((flower, index) => {
          window.setTimeout(() => flower.classList.add("is-bloomed"), index * 110);
        });
      }, 90);
    });
  }

  /* ── petal lightbox ─────────────────────────────────── */
  const renderLightbox = () => {
    const photo = PHOTOS[lightboxIndex];
    if (!photo || !lbImg) return;
    lbImg.src = photo.src;
    lbImg.alt = photo.alt || "";
    if (lbCount) lbCount.textContent = (lightboxIndex + 1) + " / " + PHOTOS.length;
  };

  function openLightbox(index) {
    if (!lightbox || typeof PHOTOS === "undefined") return;
    lightboxIndex = (index + PHOTOS.length) % PHOTOS.length;
    renderLightbox();
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    if (lbClose) lbClose.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus({ preventScroll: true });
    }
  }

  const stepLightbox = (direction) => {
    lightboxIndex = (lightboxIndex + direction + PHOTOS.length) % PHOTOS.length;
    renderLightbox();
  };

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

  /* ── nav shadow ─────────────────────────────────────── */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── floating petals ────────────────────────────────── */
  const petalLayer = document.getElementById("gardenPetals");
  if (petalLayer && !reduceMotion) {
    const count = window.innerWidth < 620 ? 8 : 14;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = "float-petal";
      petal.style.left = Math.random() * 100 + "%";
      petal.style.setProperty("--s", (7 + Math.random() * 8).toFixed(1) + "px");
      petal.style.setProperty("--d", (15 + Math.random() * 12).toFixed(1) + "s");
      petal.style.setProperty("--delay", (-Math.random() * 24).toFixed(1) + "s");
      petal.style.setProperty("--drift", (Math.random() * 110 - 55).toFixed(0) + "px");
      petal.style.setProperty("--o", (0.18 + Math.random() * 0.24).toFixed(2));
      petalLayer.appendChild(petal);
    }
  }
})();
