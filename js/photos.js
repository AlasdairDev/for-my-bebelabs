/* ═══════════════════════════════════════════════════════════
   OUR PHOTOS
   ───────────────────────────────────────────────────────────
   A textless wall of us. Every photo from the "my loves"
   folder is here, plus the favorite photos from the older sites.

   To add more:
   1. Drop the image inside /images.
   2. Copy one block below and change src, w, h, and alt.
   3. Keep the order you want them to appear in.

   Captions are optional. This wall has none, so it stays
   a pure photo wall. To add text under one photo, add a
   line like: caption: "our little caption",
   ═══════════════════════════════════════════════════════════ */

const PHOTOS = [
  {
    src: "images/us-hug.webp",
    w: 1200, h: 1600,
    alt: "Alasdair and Shane cheek to cheek, smiling",
    tape: "rose"
  },
  {
    src: "images/wall-05.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-32.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/us-selfie.webp",
    w: 1600, h: 1200,
    alt: "A selfie of Shane and Alasdair dressed up together",
    tape: "sky"
  },
  {
    src: "images/wall-42.webp",
    w: 400, h: 1200,
    alt: "A photobooth strip from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-09.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-20.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/us-pinky.webp",
    w: 900, h: 1200,
    alt: "Their pinkies linked together",
    tape: "sky"
  },
  {
    src: "images/wall-27.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-37.webp",
    w: 678, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-02.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-14.webp",
    w: 900, h: 1200,
    alt: "A collage of their dog in a cap beside Shane",
    tape: "sky"
  },
  {
    src: "images/wall-29.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-40.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-11.webp",
    w: 1200, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/us-sleep.webp",
    w: 1000, h: 1000,
    alt: "Alasdair asleep in bed under a blanket",
    tape: "sky"
  },
  {
    src: "images/wall-35.webp",
    w: 903, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-30.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-18.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-03.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-12.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/her.webp",
    w: 900, h: 1600,
    alt: "A close-up selfie of Shane",
    tape: "butter"
  },
  {
    src: "images/wall-07.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-23.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-19.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-36.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-06.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-25.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-39.webp",
    w: 681, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-01.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-21.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-33.webp",
    w: 1200, h: 675,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-10.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-28.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-38.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-04.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-16.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-24.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-31.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-08.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-34.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-41.webp",
    w: 400, h: 1200,
    alt: "A photobooth strip from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-15.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/wall-26.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: "images/wall-13.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: "images/wall-17.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: "images/wall-22.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: "images/hero-photobooth.webp",
    w: 900, h: 1350,
    alt: "A photobooth strip of them with cat stickers",
    tape: "sky"
  },
  {
    src: "images/him-bouquet.webp",
    w: 900, h: 1125,
    alt: "A bouquet of flowers made of photos of Alasdair's face",
    tape: "rose"
  },
];
