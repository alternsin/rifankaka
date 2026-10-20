# Phone Peeking — Interactive iPhone Mockup

A static HTML/CSS/JavaScript demo designed to be uploaded directly to GitHub and published with GitHub Pages.

## Files
- `index.html` — phone structure, lock screen, keypad, home screen, app screens
- `style.css` — iPhone frame, wallpaper, lock screen, icons and responsive styling
- `app.js` — passcode validation and interactions
- `wallpaper.jpg` — the supplied photo, used on the lock screen, home screen and Instagram demo

## Run locally
Open `index.html` in a browser. No build tools or dependencies are required.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload **all four files** (`index.html`, `style.css`, `app.js`, `wallpaper.jpg`) to the repository root.
3. Open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for the published URL to appear in the Pages section.

## Demo passcode
`1809`

The phone starts locked. Entering the correct passcode opens the home screen; any other four-digit code is rejected. Tap the Instagram icon to open the local Instagram-style mock screen.

## Note
This is a front-end visual demo, not device security. Anyone who can inspect or modify the JavaScript can discover the demo passcode. It does not connect to Instagram or provide real account access.
