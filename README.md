# Biblioteques WiFi Auto-Login (unofficial)

Firefox extension that auto-fills and submits the login form for the
Barcelona metro-area public libraries (Xarxa de Biblioteques) WiFi
captive portal at `xsf-biblioteques.diba.cat`.

**Not affiliated with, endorsed by, or supported by the Diputació de
Barcelona.** Fields and selectors were reverse-engineered from the portal's
HTML and may break if the library system updates its login page.

## Status

Confirmed working against the portal form as served at one branch
(`b827-bcncentelles-AP04`). The form's builder-generated element IDs
(e.g. `form28b7ff5e_guest_register`) are assumed to be shared across all
branches since the portal appears centrally templated, but this hasn't
been verified at other locations yet. **If you test this at a different
branch and it doesn't work, please open an issue with the page source** —
this is the main thing that needs community verification before a wider
release.

## How it works

- A content script runs on the portal login page, reads saved credentials
  from `browser.storage.local`, fills the carnet/DNI and PIN fields,
  checks the terms checkbox, and submits.
- If the same login page reappears within 20 seconds of a submit attempt,
  the script assumes the login failed (wrong PIN, or a portal-side
  rejection) and shows an on-page banner instead of resubmitting in a
  loop.
- Credentials never leave your browser except in the POST request to the
  portal's own login endpoint — same as typing them in manually. Nothing
  is sent to any third party or to the extension developer.

## Installing (unsigned / development)

1. Clone this repo (`git clone https://github.com/lfarinaa/biblioteques-wifi-autologin`).
2. In Firefox, go to `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on" and select `manifest.json`.
4. Open the extension's preferences (`about:addons` → this extension →
   Preferences) and enter your carnet/DNI and PIN.

Temporary add-ons are removed when Firefox restarts. For a persistent
install, see the AMO release (once published) or self-sign via
`web-ext sign`.

## Contributing

- Testing at other library branches and confirming (or fixing) the form
  selectors is the most useful contribution right now.
- Please don't commit real credentials, test data, or `.env` files —
  there's nothing in this repo that should ever contain personal data.

## Minimum Firefox version

155.0 (set in `manifest.json` under `browser_specific_settings`).

## License

MIT — see [LICENSE](LICENSE). Privacy: see [PRIVACY.md](PRIVACY.md).
