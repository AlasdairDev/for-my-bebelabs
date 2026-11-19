# two years of us ♡

A little anniversary site for Shane, built from the four older love sites
(`ilovemygfsomuch-valentines`, `para-sa-aking-gf`, `14thmonthsary`, `ilovemygf`)
but with a brand new scrapbook design.

It is a plain static site. No build tools, no frameworks, no server needed.

**Live site:** https://alasdairdev.github.io/for-my-bebelabs/

---

## Open it

Just double-click `index.html`.

If you want to preview it like a real site:

```bash
cd this-folder
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

## Add more photos

### Option 1, the quick way

The wall is textless on purpose. All 42 photos from `my loves` are already in
it, plus the favorite photos from the older sites.

Drop your new photo into the `images` folder, then open `js/photos.js` and copy
one of the blocks. Change the values. The gallery and the lightbox update on
their own.

```js
{
  src: "images/your-photo.webp",
  w: 1200, h: 1600,
  alt: "a short description of the photo",
  tape: "rose"
}
```

To add a caption under one photo, add a `caption: "your text",` line. Leave it
out to keep the wall as pure photos.

`tape` can be `butter`, `rose`, `sage`, or `sky`. The order in the array is the
order the photos appear in the wall.

### Option 2, the automatic way

If you have ImageMagick installed, this resizes the photo, saves it as a webp,
and prints a ready-to-paste block:

```bash
./tools/add-photo.sh "/path/to/photo.jpg"
```

You can pass a caption and tape color if you want them:

```bash
./tools/add-photo.sh "/path/to/photo.jpg" "our new favorite photo" rose
```

Then paste the printed block inside `PHOTOS` in `js/photos.js`.

Keep photos around 1400px on the long side so the site stays fast on phones.
Phone photos are often 4000px wide and can be 5MB each, which is too heavy.

---

## Change the words

| What | Where |
| --- | --- |
| photo order and optional captions | `js/photos.js` |
| the letter | `index.html`, search for `letter-paper` |
| the 10 reasons | `js/main.js`, search for `REASONS` |
| the hidden note | `js/main.js`, search for `secretInput` |
| the anniversary date | `js/main.js`, search for `START` |
| the little rituals receipt | `index.html`, search for `receipt` |
| footer and headings | `index.html` |

The hidden note has its own passcode. Change the check and the message in
`js/main.js` if you ever want a different one.

---

## Colors and fonts

Everything lives at the top of `css/style.css` in `:root`. The palette is a
mid-tone dusty mauve with soft cream text, berry, rose, butter, sage, and dusty
blue. It sits between light and dark, so it is easy on the eyes without feeling
like a black screen. If you want it lighter or darker, change `--cream`,
`--paper`, `--berry`, and `--rose` there and the rest of the site follows.

Fonts are Fraunces (headlines), Caveat (handwriting), and DM Sans (body), loaded
from Google Fonts. The site still works offline, it just falls back to system
fonts.

---

## Security

This is a static site. There is no backend, database, login, analytics, or
server-side code, so there are no secrets or private credentials in the repo.

The tiny secret passcode is a game, not a security control. It is intentionally
discoverable on the page. Do not reuse it anywhere that matters. All photos were
resized and stripped of metadata before publishing, but remember that this repo
and the live site are public.

See `SECURITY.md` for the short version.

---

## Deploying updates

Everything is already set up for GitHub Pages.

1. Edit the site locally.
2. Commit and push to `main`.
3. `.github/workflows/pages.yml` builds and deploys automatically.

First-time setup only: in the GitHub repo, go to **Settings > Pages** and set
**Source** to **GitHub Actions**.

The live URL is:

```
https://alasdairdev.github.io/for-my-bebelabs/
```

If you ever add a custom domain, update the canonical URL, Open Graph URL,
`sitemap.xml`, and `robots.txt` too.

---

Made with love and a lot of code. For Shane, always. ♡
