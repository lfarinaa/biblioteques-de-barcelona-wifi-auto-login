document.addEventListener("DOMContentLoaded", async () => {
  const { bibliotequesCreds } = await browser.storage.local.get("bibliotequesCreds");
  if (bibliotequesCreds) {
    document.getElementById("username").value = bibliotequesCreds.username || "";
    document.getElementById("pin").value = bibliotequesCreds.pin || "";
  }
});

document.getElementById("save").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const pin = document.getElementById("pin").value.trim();

  await browser.storage.local.set({
    bibliotequesCreds: { username, pin }
  });

  const status = document.getElementById("status");
  status.textContent = "Saved.";
  setTimeout(() => { status.textContent = ""; }, 2000);
});
