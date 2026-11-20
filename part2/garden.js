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
      <path class="leaf" d="M60 82 C42 74 32 59 28 42 C44 48 55 61 60 82Z" />
      <path class="leaf" d="M60 42 C78 34 88 19 92 3 C76 9 65 22 60 42Z" />
    </svg>
  `;

  const makeFlower = (group, { isHero = false, flowerIndex = 0 } = {}) => {
    const flower = document.createElement("article");
    flower.className = "flower" + (isHero ? " bouquet-flower" : "");
    flower.style.setProperty("--sway", (-flowerIndex * 1.15).toFixed(2) + "s");

    const bloom = document.createElement("div");
    bloom.className = "bloom";

    // a fuller ring behind the photo petals, so each flower reads as a flower
    for (let i = 0; i < group.length; i++) {
      const back = document.createElement("span");
      back.className = "back-petal";
      back.style.setProperty("--a", ((i * (360 / group.length)) + (180 / group.length)).toFixed(2) + "deg");
      back.style.setProperty("--i", String(i));
      back.setAttribute("aria-hidden", "true");
      bloom.appendChild(back);
    }

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

    const heroGroups = groups.slice(0, 3);
    const gardenGroups = groups.slice(3);
    let bouquetEl = null;
    const heroFlowers = [];

    if (heroGroups.some((group) => group.length)) {
      bouquetEl = document.createElement("div");
      bouquetEl.className = "bouquet";

      const positions = ["bouquet-left", "bouquet-center", "bouquet-right"];
      heroGroups.forEach((group, index) => {
        if (!group.length) return;
        const flower = makeFlower(group, { isHero: true, flowerIndex: index });
        flower.classList.add("bouquet-flower", positions[index]);
        bouquetEl.appendChild(flower);
        heroFlowers.push(flower);
        allFlowers.push(flower);
      });

      const wrap = document.createElement("div");
      wrap.className = "bouquet-wrap";
      wrap.innerHTML = `
        <span class="ribbon-band" aria-hidden="true"></span>
        <span class="ribbon" aria-hidden="true">
          <svg viewBox="0 0 120 80" focusable="false">
            <path d="M60 42C42 24 14 12 10 30c-4 20 22 30 50 16 26 14 54 6 50-16-4-18-32-6-50 12Z" fill="#a84e61"/>
            <path d="M56 48 38 78l14-3 6-22Z" fill="#8e3a4d"/>
            <path d="M64 48 82 78l-14-3-6-22Z" fill="#8e3a4d"/>
            <circle cx="60" cy="43" r="11" fill="#7e3547"/>
          </svg>
        </span>
      `;
      bouquetEl.appendChild(wrap);

      const leaves = document.createElement("div");
      leaves.className = "bouquet-leaves";
      leaves.setAttribute("aria-hidden", "true");
      leaves.innerHTML = "<span></span><span></span><span></span>";
      bouquetEl.appendChild(leaves);

      const stemLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      stemLayer.setAttribute("class", "bouquet-stems");
      stemLayer.setAttribute("aria-hidden", "true");
      bouquetEl.insertBefore(stemLayer, bouquetEl.firstChild);

      const drawBouquetStems = () => {
        const box = bouquetEl.getBoundingClientRect();
        if (!box.width || !box.height) return;
        const neckY = wrap.offsetTop + 6;
        const gather = [-26, 0, 26];
        const paths = heroFlowers.map((flower, index) => {
          const bloom = flower.querySelector(".bloom");
          if (!bloom) return "";
          const rect = bloom.getBoundingClientRect();
          const x1 = rect.left + rect.width / 2 - box.left;
          const y1 = rect.bottom - box.top;
          const x2 = box.width / 2 + (gather[index] || 0);
          const y2 = neckY + 46;
          const cx = x1 + (x2 - x1) * 0.4;
          const cy = y1 + (y2 - y1) * 0.55;
          return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
        }).filter(Boolean);

        stemLayer.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
        stemLayer.innerHTML = paths
          .map((d) => `<path class="stem-under" d="${d}" /><path class="stem-over" d="${d}" />`)
          .join("");
      };

      window.requestAnimationFrame(drawBouquetStems);
      window.addEventListener("resize", drawBouquetStems);

      heroVisual.appendChild(bouquetEl);

      const bloomBouquet = () => {
        bouquetEl.classList.add("is-bloomed");
        heroFlowers.forEach((flower, index) => {
          window.setTimeout(() => flower.classList.add("is-bloomed"), index * 140);
        });
      };

      if (reduceMotion) {
        heroFlowers.forEach((flower) => flower.classList.add("is-bloomed"));
        bouquetEl.classList.add("is-bloomed");
      } else {
        window.setTimeout(bloomBouquet, 350);
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
      const bouquet = document.querySelector(".bouquet");
      if (bouquet) bouquet.classList.remove("is-bloomed");
      // force the petals and stems back to their closed state
      void document.body.offsetWidth;
      window.setTimeout(() => {
        if (bouquet) bouquet.classList.add("is-bloomed");
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
