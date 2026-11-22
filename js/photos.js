/*
   OUR PHOTOS
   A textless wall of us. Every photo from the "my loves"
   folder is here, plus the favorite photos from the older sites.

   To add more:
   1. Drop the image inside /images.
   2. Copy one block below and change src, w, h, and alt.
   3. Keep the order you want them to appear in.

   Captions are optional. This wall has none, so it stays
   a pure photo wall. To add text under one photo, add a
   line like: caption: "our little caption",
   */

const PHOTO_BASE = window.PHOTO_BASE || "images/";

const PHOTOS = [
  {
    src: PHOTO_BASE + "us-hug.webp",
    w: 1200, h: 1600,
    alt: "Alasdair and Shane cheek to cheek, smiling",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-05.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-32.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "us-selfie.webp",
    w: 1600, h: 1200,
    alt: "A selfie of Shane and Alasdair dressed up together",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-42.webp",
    w: 400, h: 1200,
    alt: "A photobooth strip from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-09.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-20.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "us-pinky.webp",
    w: 900, h: 1200,
    alt: "Their pinkies linked together",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-27.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-37.webp",
    w: 678, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-02.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-14.webp",
    w: 900, h: 1200,
    alt: "A collage of their dog in a cap beside Shane",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-29.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-40.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-11.webp",
    w: 1200, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "us-sleep.webp",
    w: 1000, h: 1000,
    alt: "Alasdair asleep in bed under a blanket",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-35.webp",
    w: 903, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-30.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-18.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-03.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-12.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "her.webp",
    w: 900, h: 1600,
    alt: "A close-up selfie of Shane",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-07.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-23.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-19.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-36.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-06.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-25.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-39.webp",
    w: 681, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-01.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-21.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-33.webp",
    w: 1200, h: 675,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-10.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-28.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-38.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-04.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-16.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-24.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-31.webp",
    w: 1200, h: 900,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-08.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-34.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-41.webp",
    w: 400, h: 1200,
    alt: "A photobooth strip from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-15.webp",
    w: 900, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "wall-26.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "wall-13.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "rose"
  },
  {
    src: PHOTO_BASE + "wall-17.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "butter"
  },
  {
    src: PHOTO_BASE + "wall-22.webp",
    w: 675, h: 1200,
    alt: "A memory from our second year",
    tape: "sage"
  },
  {
    src: PHOTO_BASE + "hero-photobooth.webp",
    w: 900, h: 1350,
    alt: "A photobooth strip of them with cat stickers",
    tape: "sky"
  },
  {
    src: PHOTO_BASE + "him-bouquet.webp",
    w: 900, h: 1125,
    alt: "A bouquet of flowers made of photos of Alasdair's face",
    tape: "rose"
  },
];
