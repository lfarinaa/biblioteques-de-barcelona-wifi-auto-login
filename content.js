(function () {
  const ATTEMPT_KEY = "bibliotequesAutoLoginAttempted";
  const BANNER_ID = "biblioteques-autologin-banner";

  function showBanner(message, color) {
    if (document.getElementById(BANNER_ID)) return;
    const banner = document.createElement("div");
    banner.id = BANNER_ID;
    banner.textContent = message;
    banner.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; z-index: 999999;
      background: ${color}; color: #fff; font-family: sans-serif;
      font-size: 14px; text-align: center; padding: 10px;
    `;
    document.body.prepend(banner);
  }

  function fillAndSubmit(creds) {
    const form = document.getElementById("form28b7ff5e_guest_register");
    const userField = document.getElementById("ID_form28b7ff5e_guest_register_username");
    const pinField = document.getElementById("ID_form28b7ff5e_guest_register_pass_serial_number");
    const termsBox = document.getElementById("ID_form28b7ff5e_guest_register_creator_accept_terms");
    const submitBtn = document.getElementById("ID_form28b7ff5e_guest_register_submit");

    if (!form || !userField || !pinField || !submitBtn) {
      return false;
    }

    userField.value = creds.username;
    pinField.value = creds.pin;
    if (termsBox && !termsBox.checked) {
      termsBox.checked = true;
    }

    // Mark that we're about to attempt a login, so if we land back on this
    // same form again, we know it failed instead of resubmitting forever.
    sessionStorage.setItem(ATTEMPT_KEY, Date.now().toString());
    submitBtn.click();
    return true;
  }

  browser.storage.local.get("bibliotequesCreds").then(({ bibliotequesCreds }) => {
    if (!bibliotequesCreds || !bibliotequesCreds.username || !bibliotequesCreds.pin) {
      return; // nothing saved yet, don't touch the page
    }

    const lastAttempt = sessionStorage.getItem(ATTEMPT_KEY);
    const recentAttempt = lastAttempt && (Date.now() - parseInt(lastAttempt, 10)) < 20000;

    if (recentAttempt) {
      // We already tried once and ended up back on the login form within
      // the last 20s — that means the credentials or the portal rejected
      // the attempt. Stop and surface it instead of looping.
      sessionStorage.removeItem(ATTEMPT_KEY);
      showBanner(
        "Auto-login failed — check your saved carnet/PIN in the extension settings, or log in manually below.",
        "#a71b2e"
      );
      return;
    }

    fillAndSubmit(bibliotequesCreds);
  });
})();
